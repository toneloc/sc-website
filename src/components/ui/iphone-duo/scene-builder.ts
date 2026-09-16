import {
  ACESFilmicToneMapping,
  AmbientLight,
  DirectionalLight,
  PerspectiveCamera,
  PMREMGenerator,
  Scene,
  WebGLRenderer,
} from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import type { SceneBundle } from './types';

/**
 * Single Responsibility: Sets up and manages Three.js WebGL scene, lighting, camera, and environment.
 */
export function createPhoneScene(
  canvas: HTMLCanvasElement
): SceneBundle | null {
  const context = canvas.getContext('webgl2', {
    alpha: true,
    antialias: true,
    preserveDrawingBuffer: true,
  });

  if (!context) return null;

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const renderer = new WebGLRenderer({
    canvas,
    context,
    alpha: true,
    antialias: true,
    preserveDrawingBuffer: true,
    powerPreference: isMobile ? 'default' : 'high-performance',
  });

  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, isMobile ? 1.75 : 2)
  );
  renderer.toneMapping = ACESFilmicToneMapping;

  const scene = new Scene();
  const camera = new PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 0, 36);

  const environment = new RoomEnvironment();
  const generator = new PMREMGenerator(renderer);
  const environmentMap = generator.fromScene(environment);
  scene.environment = environmentMap.texture;
  environment.dispose();
  generator.dispose();

  scene.add(new AmbientLight(0xffffff, 1.5));
  const key = new DirectionalLight(0xffffff, 3);
  key.position.set(-8, 12, 20);
  scene.add(key);

  const dispose = () => {
    environmentMap.dispose();
    renderer.dispose();
  };

  return {
    scene,
    camera,
    renderer,
    environmentTexture: environmentMap.texture,
    dispose,
  };
}
