'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface AppIconModelProps {
  className?: string;
  modelPath?: string;
}

export const AppIconModel: React.FC<AppIconModelProps> = ({
  className = 'w-full h-full min-h-[220px]',
  modelPath = '/stablechannels-app-icon.glb',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 280;
    const height = container.clientHeight || 280;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xf7931a, 2.8);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xf7931a, 2.0);
    dirLight2.position.set(-5, -3, -2);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 1.8, 10);
    pointLight.position.set(0, 2, 3);
    scene.add(pointLight);

    // Model group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    // Loader
    const loader = new GLTFLoader();
    let isMounted = true;

    loader.load(
      modelPath,
      (gltf) => {
        if (!isMounted) return;

        const model = gltf.scene;

        // Center and scale bounding box
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.4 / (maxDim || 1);
        model.scale.set(scale, scale, scale);

        model.position.x = -center.x * scale;
        model.position.y = -center.y * scale;
        model.position.z = -center.z * scale;

        modelGroup.add(model);
        setLoading(false);
      },
      undefined,
      (error) => {
        console.error('Error loading 3D model:', error);
        setLoading(false);
      }
    );

    // Resize observer
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      if (newWidth > 0 && newHeight > 0) {
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Pure autonomous animation loop (constant smooth rotation and floating bounce, unaffected by mouse)
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Continuous 360 rotation
      modelGroup.rotation.y = elapsedTime * 0.75;
      // Gentle rhythmic tilt
      modelGroup.rotation.x = Math.sin(elapsedTime * 1.2) * 0.18;
      modelGroup.rotation.z = Math.cos(elapsedTime * 0.9) * 0.08;

      // Smooth vertical floating hover
      modelGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.12;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      isMounted = false;
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);

      if (
        container &&
        renderer.domElement &&
        container.contains(renderer.domElement)
      ) {
        container.removeChild(renderer.domElement);
      }

      renderer.dispose();
      scene.clear();
    };
  }, [modelPath]);

  return (
    <div
      className={`relative flex items-center justify-center pointer-events-none select-none ${className}`}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#F7931A]/30 border-t-[#F7931A] animate-spin" />
        </div>
      )}
      <div
        ref={containerRef}
        className="w-full h-full flex items-center justify-center"
      />
    </div>
  );
};
