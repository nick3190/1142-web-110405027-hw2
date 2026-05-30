export function preloadImages(sources: string[]) {
  if (typeof window === "undefined") return;

  sources.forEach((src) => {
    const img = new window.Image();
    img.src = src;
  });
}
