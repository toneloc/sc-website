import type { ComponentProps } from 'react';
import type { WebGLRenderer, PerspectiveCamera, Scene, Texture } from 'three';
import type { loadPhone } from './model';

export type PhoneModel = Awaited<ReturnType<typeof loadPhone>>;

export interface Surface {
  model: PhoneModel;
  renderer: WebGLRenderer;
  draw: () => void;
}

export interface SceneBundle {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  environmentTexture: Texture;
  dispose: () => void;
}

export interface PhoneTexturesConfig {
  screenSrc: string;
  coverSrc: string;
  screenOverlaySrc?: string;
  coverOverlaySrc?: string;
  revealSrc?: string;
}

export interface PhoneAppearanceConfig {
  rotation?: number;
  exposure?: number;
  blur?: number;
  parallax?: number;
}

export type PhoneDeviceProps = ComponentProps<'div'> &
  Partial<PhoneTexturesConfig> &
  PhoneAppearanceConfig & {
    modelSrc?: string;
  };
