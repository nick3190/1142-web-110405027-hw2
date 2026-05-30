"use client";

import { create } from "zustand";
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
  startQuiz: () => void;
  answerQuestion: (optionId: string) => void;
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
    }),

  answerQuestion: (optionId) => {
    const { currentQuestion, answers, isGlitching } = get();
    if (isGlitching) return;

    const nextAnswers = [...answers, optionId];
    set({
      answers: nextAnswers,
      isGlitching: true,
    });

    window.setTimeout(() => {
      const state = get();
      if (!state.isGlitching) return;

      if (currentQuestion >= questions.length - 1) {
        set({
          stage: "preparing",
          isGlitching: false,
          resultId: calculateResult(nextAnswers),
        });
        return;
      }

      set({
        currentQuestion: currentQuestion + 1,
        isGlitching: false,
      });
    }, 700);
  },

  finishGlitch: () => set({ isGlitching: false }),

  finishPreparing: () => set({ stage: "result" }),

  resetQuiz: () => set(initialState),
}));
