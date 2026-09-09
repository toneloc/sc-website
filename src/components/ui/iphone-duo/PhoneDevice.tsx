'use client';

import React, { useEffect, useEffectEvent, useRef, useState } from 'react';
import { useMotionValueEvent, useReducedMotion } from 'motion/react';
import { loadPhone } from './model';
import { foldChoreography } from './fold-choreography';
import { useFoldablePhone } from './FoldablePhone';
import { createPhoneScene } from './scene-builder';
import { applyPhoneTextures } from './texture-service';
import type { PhoneDeviceProps, PhoneModel, Surface } from './types';

export function PhoneDevice(props: PhoneDeviceProps) {
  return (
    <PhoneDeviceSurface
      key={props.modelSrc ?? '/models/iphone-duo.glb'}
      {...props}
    />
  );
}

function PhoneDeviceSurface({
  modelSrc = '/models/iphone-duo.glb',
  screenSrc = '/wallpapers/sc-wallpaper.svg',
  coverSrc = screenSrc,
  screenOverlaySrc,
  coverOverlaySrc,
  revealSrc,
  rotation = -6,
  exposure = 1.2,
  blur = 28,
  parallax = 1,
  className = '',
  ...props
}: PhoneDeviceProps) {
  const { progress, setValue, toggle } = useFoldablePhone();
  const reducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const surfaceRef = useRef<Surface | undefined>(undefined);
  interface DragState {
    startX: number;
    startY: number;
    startValue: number;
    isDragging: boolean;
    moved: boolean;
  }
  const dragRef = useRef<DragState | undefined>(undefined);
  const suppressClickRef = useRef(false);

  const [status, setStatus] = useState('Loading 3D model...');
  const [ready, setReady] = useState(false);
  const [amount, setAmount] = useState(progress.get());

  const updateChoreography = useEffectEvent(() => {
    const surface = surfaceRef.current;
    if (!surface) return;

    const p = Math.max(0, Math.min(1, progress.get()));
    const motion = foldChoreography(p);
    const { angle } = motion;

    surface.model.screen.uniforms.defocus.value = motion.innerDefocus;
    surface.model.cover.uniforms.focusEdge.value = motion.coverFocusEdge;
    surface.model.screen.uniforms.progress.value = p;
    surface.model.cover.uniforms.progress.value = p;
    surface.model.screen.uniforms.blur.value = blur;
    surface.model.cover.uniforms.blur.value = blur;
    surface.model.left.rotation.y = angle;
    surface.model.body.position.x = -4.12 * (1 - Math.max(0, Math.cos(angle)));
    surface.model.body.rotation.y = (rotation * Math.PI) / 180;
    surface.model.screen.uniforms.parallax.value = reducedMotion ? 0 : parallax;
    surface.model.cover.uniforms.parallax.value = reducedMotion ? 0 : parallax;

    surface.model.body.updateMatrixWorld(true);
    surface.model.screen.uniforms.bodyInverse.value
      .copy(surface.model.body.matrixWorld)
      .invert();
    surface.model.cover.uniforms.bodyInverse.value
      .copy(surface.model.body.matrixWorld)
      .invert();

    surface.renderer.toneMappingExposure = exposure;
    surface.draw();
  });

  useMotionValueEvent(progress, 'change', setAmount);

  useEffect(() => {
    updateChoreography();
  }, [rotation, exposure, blur, parallax, reducedMotion]);

  // Three.js Scene Lifecycle
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const sceneBundle = createPhoneScene(canvas);
    if (!sceneBundle) {
      setStatus(
        'WebGL 2 is unavailable. Enable hardware acceleration to view.'
      );
      return;
    }

    const { scene, camera, renderer, dispose: disposeScene } = sceneBundle;
    let disposed = false;
    let model: PhoneModel | undefined;

    const render = () => renderer.render(scene, camera);

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      const span = Math.max(16, 21 / camera.aspect);
      camera.fov = (2 * Math.atan(span / 72) * 180) / Math.PI;
      camera.updateProjectionMatrix();
      render();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const unsubscribeProgress = progress.on('change', () =>
      updateChoreography()
    );

    loadPhone(modelSrc)
      .then((loaded) => {
        if (disposed) {
          loaded.dispose();
          return;
        }
        model = loaded;
        scene.add(model.body);
        surfaceRef.current = { model, renderer, draw: render };
        resize();
        updateChoreography();
        setReady(true);
        setStatus('');
      })
      .catch(() => {
        if (!disposed) setStatus('The 3D model could not be loaded.');
      });

    return () => {
      disposed = true;
      unsubscribeProgress();
      observer.disconnect();
      surfaceRef.current = undefined;
      model?.dispose();
      disposeScene();
    };
  }, [modelSrc, progress]);

  // Texture Lifecycle
  useEffect(() => {
    if (!ready || !surfaceRef.current) return;
    const surface = surfaceRef.current;
    let cancelled = false;
    let cleanupTextures: (() => void) | undefined;

    applyPhoneTextures(
      surface.model,
      surface.renderer.capabilities.getMaxAnisotropy(),
      {
        screenSrc,
        coverSrc,
        screenOverlaySrc,
        coverOverlaySrc,
        revealSrc,
      }
    )
      .then((cleanup) => {
        if (cancelled) {
          cleanup();
          return;
        }
        cleanupTextures = cleanup;
        surface.draw();
        setStatus('');
      })
      .catch(() => {
        if (!cancelled) setStatus('Screen assets could not be loaded.');
      });

    return () => {
      cancelled = true;
      cleanupTextures?.();
    };
  }, [
    screenSrc,
    coverSrc,
    screenOverlaySrc,
    coverOverlaySrc,
    revealSrc,
    ready,
  ]);

  const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0) return;
    dragRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      startValue: progress.get(),
      isDragging: false,
      moved: false,
    };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    if (!drag) return;

    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;

    // Detect user intention before hijacking gestures
    if (!drag.isDragging) {
      // If movement is predominantly vertical, user is scrolling the page on mobile
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 8) {
        dragRef.current = undefined;
        return;
      }

      // If movement is predominantly horizontal, capture pointer for phone folding
      if (Math.abs(deltaX) > 8 && Math.abs(deltaX) > Math.abs(deltaY)) {
        drag.isDragging = true;
        drag.moved = true;
        try {
          event.currentTarget.setPointerCapture(event.pointerId);
        } catch {
          // Graceful fallback if pointer capture fails
        }
      }
    }

    if (drag.isDragging) {
      const clientWidth = event.currentTarget.clientWidth || 320;
      setValue(drag.startValue - deltaX / (clientWidth * 0.5));
    }
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    if (drag?.isDragging) {
      try {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }
      } catch {
        // ignore
      }
      suppressClickRef.current = true;
    } else {
      suppressClickRef.current = false;
    }
    dragRef.current = undefined;
  };

  const handlePointerCancel = () => {
    if (dragRef.current?.isDragging) {
      setValue(dragRef.current.startValue);
    }
    dragRef.current = undefined;
    suppressClickRef.current = true;
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!suppressClickRef.current) toggle(event.detail === 0);
    suppressClickRef.current = false;
  };

  return (
    <div
      {...props}
      className={`duo-device ${className}`}
      data-progress={amount.toFixed(3)}
      data-ready={ready}
    >
      <canvas ref={canvasRef} aria-hidden="true" />
      <button
        className="duo-device-target"
        type="button"
        aria-label="Fold or unfold phone"
        aria-pressed={amount >= 0.5}
        disabled={!ready}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onClick={handleClick}
      />
      {status && (
        <p className="duo-status" role="status">
          {status}
        </p>
      )}
    </div>
  );
}
