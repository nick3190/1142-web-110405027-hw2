import type { ComponentProps } from "react";
import { QuizImageFrame } from "@/components/QuizImageFrame";

type FrameSettings = Pick<
  ComponentProps<typeof QuizImageFrame>,
  "crop" | "cropZoom" | "imageLayer"
>;

export const QUESTION_IMAGE_SETTINGS: FrameSettings[] = [
  { crop: true, cropZoom: 1.22, imageLayer: "back" },
  { crop: true, cropZoom: 1.38 },
  { crop: true, cropZoom: 1.38 },
  { crop: true, cropZoom: 1.38 },
  { crop: true, cropZoom: 1.38 },
];
