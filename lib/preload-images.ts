import { getQuestionImageSources } from "@/lib/quiz-images";

const loadedImages = new Set<string>();
const loadingImages = new Map<string, Promise<void>>();

export function isImageLoaded(src: string): boolean {
  return loadedImages.has(src);
}

export function areQuestionImagesReady(questionIndex: number): boolean {
  return getQuestionImageSources(questionIndex).every(isImageLoaded);
}

export function preloadImage(src: string): Promise<void> {
  if (loadedImages.has(src)) {
    return Promise.resolve();
  }

  const pending = loadingImages.get(src);
  if (pending) return pending;

  const promise = new Promise<void>((resolve, reject) => {
    const img = new window.Image();
    img.decoding = "async";

    img.onload = () => {
      loadedImages.add(src);
      loadingImages.delete(src);
      resolve();
    };

    img.onerror = () => {
      loadingImages.delete(src);
      reject(new Error(`Failed to load image: ${src}`));
    };

    img.src = src;
  });

  loadingImages.set(src, promise);
  return promise;
}

export function preloadImages(sources: string[]): Promise<void> {
  return Promise.all(sources.map(preloadImage)).then(() => undefined);
}

export async function waitForQuestionImages(questionIndex: number): Promise<void> {
  const sources = getQuestionImageSources(questionIndex);
  if (sources.length === 0) return;

  while (!areQuestionImagesReady(questionIndex)) {
    try {
      await preloadImages(sources);
    } catch {
      await new Promise((resolve) => window.setTimeout(resolve, 200));
    }
  }
}
