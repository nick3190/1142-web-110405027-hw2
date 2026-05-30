"use client";

import { create } from "zustand";
import {
  GLITCH_BY_QUESTION,
  GLITCH_FLASH_IMAGES,
  type GlitchVariant,
} from "@/data/glitch";
import {
  calculateResult,
  questions,
  type QuizStage,
  type ResultId,
} from "@/data/quiz";

interface QuizState {
  stage: QuizStage;
  currentQuestion: number;
  answers: string[];
  resultId: ResultId | null;
  isGlitching: boolean;
  glitchVariant: GlitchVariant;
  glitchFlashImage: string | null;
  startQuiz: () => void;
  answerQuestion: (optionId: string) => void;
  expelForTimeout: () => void;
  finishGlitch: () => void;
  finishPreparing: () => void;
  resetQuiz: () => void;
}

const initialState = {
  stage: "start" as QuizStage,
  currentQuestion: 0,
  answers: [] as string[],
  resultId: null as ResultId | null,
  isGlitching: false,
  glitchVariant: "none" as GlitchVariant,
  glitchFlashImage: null as string | null,
};

export const useQuizStore = create<QuizState>((set, get) => ({
  ...initialState,

  startQuiz: () =>
    set({
      stage: "quiz",
      currentQuestion: 0,
      answers: [],
      resultId: null,
      isGlitching: false,
      glitchVariant: "none",
      glitchFlashImage: null,
    }),

  answerQuestion: (optionId) => {
    const { currentQuestion, answers, isGlitching, stage } = get();
    if (isGlitching || stage !== "quiz") return;

    const glitch = GLITCH_BY_QUESTION[currentQuestion] ?? {
      variant: "slight" as GlitchVariant,
      duration: 450,
    };
    const nextAnswers = [...answers, optionId];
    const flashImage = GLITCH_FLASH_IMAGES[currentQuestion] ?? null;

    set({
      answers: nextAnswers,
      isGlitching: glitch.variant !== "none",
      glitchVariant: glitch.variant,
      glitchFlashImage: flashImage,
    });

    window.setTimeout(() => {
      if (currentQuestion >= questions.length - 1) {
        set({
          stage: "preparing",
          isGlitching: false,
          glitchVariant: "none",
          glitchFlashImage: null,
          resultId: calculateResult(nextAnswers),
        });
        return;
      }

      set({
        currentQuestion: currentQuestion + 1,
        isGlitching: false,
        glitchVariant: "none",
        glitchFlashImage: null,
      });
    }, glitch.duration);
  },

  expelForTimeout: () => {
    if (get().stage !== "quiz") return;

    set({
      stage: "expelled",
      isGlitching: false,
      glitchVariant: "none",
      glitchFlashImage: null,
    });
  },

  finishGlitch: () =>
    set({ isGlitching: false, glitchVariant: "none", glitchFlashImage: null }),

  finishPreparing: () => set({ stage: "result" }),

  resetQuiz: () => set(initialState),
}));
