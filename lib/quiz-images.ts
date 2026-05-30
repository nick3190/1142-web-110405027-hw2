import { GLITCH_FLASH_IMAGES, GLITCH_FLASH_IMAGES_LIST } from "@/data/glitch";
import { questions, results } from "@/data/quiz";

export function getQuestionImageSources(questionIndex: number): string[] {
  const question = questions[questionIndex];
  if (!question) return [];

  const sources = [question.image];
  const glitchSrc = GLITCH_FLASH_IMAGES[questionIndex];
  if (glitchSrc) sources.push(glitchSrc);

  return sources;
}

export const ALL_PRELOAD_IMAGES = [
  "/pic/intro.webp",
  ...questions.map((question) => question.image),
  ...GLITCH_FLASH_IMAGES_LIST,
  ...Object.values(results).map((result) => result.image),
];
