"use client";

import { create } from "zustand";
import {
  GLITCH_BY_QUESTION,
  GLITCH_FLASH_IMAGES,
  type GlitchVariant,
} from "@/data/glitch";
import {
  areQuestionImagesReady,
  waitForQuestionImages,
} from "@/lib/preload-images";
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

async function advanceAfterGlitch(
  currentQuestion: number,
  nextAnswers: string[],
) {
  if (currentQuestion >= questions.length - 1) {
    useQuizStore.setState({
      stage: "preparing",
      isGlitching: false,
      glitchVariant: "none",
      glitchFlashImage: null,
      resultId: calculateResult(nextAnswers),
    });
    return;
  }

  const nextIndex = currentQuestion + 1;
  await waitForQuestionImages(nextIndex);

  const state = useQuizStore.getState();
  if (state.stage !== "quiz" || state.answers.length !== nextAnswers.length) {
    return;
  }

  if (!areQuestionImagesReady(nextIndex)) {
    return;
  }

  useQuizStore.setState({
    currentQuestion: nextIndex,
    isGlitching: false,
    glitchVariant: "none",
    glitchFlashImage: null,
  });
}

export const useQuizStore = create<QuizState>((set, get) => ({
  ...initialState,

  startQuiz: () => {
    void (async () => {
      await waitForQuestionImages(0);

      if (!areQuestionImagesReady(0)) return;

      set({
        stage: "quiz",
        currentQuestion: 0,
        answers: [],
        resultId: null,
        isGlitching: false,
        glitchVariant: "none",
        glitchFlashImage: null,
      });
    })();
  },

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
      void advanceAfterGlitch(currentQuestion, nextAnswers);
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
