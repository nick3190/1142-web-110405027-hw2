export type GlitchVariant = "none" | "slight" | "red" | "red-error" | "crazy";

export const GLITCH_BY_QUESTION: Record<
  number,
  { variant: GlitchVariant; duration: number }
> = {
  0: { variant: "none", duration: 200 },
  1: { variant: "slight", duration: 450 },
  2: { variant: "red", duration: 550 },
  3: { variant: "red-error", duration: 700 },
  4: { variant: "crazy", duration: 1100 },
};

export const GLITCH_FLASH_IMAGES: Partial<Record<number, string>> = {
  1: "/pic/Q2_glitch.webp",
  3: "/pic/Q4_glitch.webp",
  4: "/pic/Q5_glitch.webp",
};

export const GLITCH_FLASH_IMAGES_LIST = Object.values(
  GLITCH_FLASH_IMAGES,
) as string[];
