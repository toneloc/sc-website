import { SRGBColorSpace, TextureLoader, type Texture } from 'three';
import type { PhoneModel, PhoneTexturesConfig } from './types';

/**
 * Single Responsibility: Loads texture maps and assigns them to the phone screen and cover shader uniforms.
 */
export async function applyPhoneTextures(
  model: PhoneModel,
  maxAnisotropy: number,
  texturesConfig: PhoneTexturesConfig
): Promise<() => void> {
  const loader = new TextureLoader();
  const loadedTextures: Texture[] = [];

  const loadTex = async (src: string) => {
    const texture = await loader.loadAsync(src);
    texture.colorSpace = SRGBColorSpace;
    texture.anisotropy = Math.min(8, maxAnisotropy);
    loadedTextures.push(texture);
    return texture;
  };

  const [screen, cover] = await Promise.all([
    loadTex(texturesConfig.screenSrc),
    loadTex(texturesConfig.coverSrc),
  ]);

  model.screen.uniforms.screenMap.value = screen;
  model.screen.uniforms.resolution.value.set(
    screen.image.width,
    screen.image.height
  );
  model.cover.uniforms.screenMap.value = cover;
  model.cover.uniforms.resolution.value.set(
    cover.image.width,
    cover.image.height
  );

  const overlayBindings = [
    {
      src: texturesConfig.screenOverlaySrc,
      material: model.screen,
      map: 'overlayMap',
      flag: 'hasOverlay',
    },
    {
      src: texturesConfig.coverOverlaySrc,
      material: model.cover,
      map: 'overlayMap',
      flag: 'hasOverlay',
    },
    {
      src: texturesConfig.revealSrc,
      material: model.screen,
      map: 'revealMap',
      flag: 'hasReveal',
    },
  ] as const;

  await Promise.all(
    overlayBindings.map(async ({ src, material, map, flag }) => {
      if (!src) {
        material.uniforms[flag].value = 0;
        return;
      }
      const texture = await loadTex(src);
      material.uniforms[map].value = texture;
      material.uniforms[flag].value = 1;
    })
  );

  model.screen.needsUpdate = true;
  model.cover.needsUpdate = true;

  return () => {
    for (const texture of loadedTextures) {
      texture.dispose();
    }
  };
}
