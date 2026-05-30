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
