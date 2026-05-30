"use client";

import { useLayoutEffect, type RefObject } from "react";

const DESKTOP_MIN_WIDTH = 640;
const MAX_OPTION_FONT_PX = 16;
const MIN_OPTION_FONT_PX = 11;
const MAX_QUESTION_FONT_PX = 18;
const MIN_QUESTION_FONT_PX = 12;

export function useFitQuestionLayout(
  sectionRef: RefObject<HTMLElement | null>,
  questionRef: RefObject<HTMLElement | null>,
  optionsRef: RefObject<HTMLElement | null>,
  resetKey: number,
) {
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const question = questionRef.current;
    const options = optionsRef.current;
    if (!section || !question || !options) return;

    const media = window.matchMedia(`(min-width: ${DESKTOP_MIN_WIDTH}px)`);

    const clearFitVars = () => {
      section.style.removeProperty("--q-fit-question-font");
      section.style.removeProperty("--q-fit-option-font");
      options.classList.remove("quiz-question-options--scroll");
    };

    const fits = () => {
      const sectionBottom = section.getBoundingClientRect().bottom;
      const optionsBottom = options.getBoundingClientRect().bottom;
      return optionsBottom <= sectionBottom + 1;
    };

    const fit = () => {
      if (!media.matches) {
        clearFitVars();
        return;
      }

      options.classList.remove("quiz-question-options--scroll");

      let questionSize = MAX_QUESTION_FONT_PX;
      let optionSize = MAX_OPTION_FONT_PX;

      const apply = () => {
        section.style.setProperty(
          "--q-fit-question-font",
          `${questionSize}px`,
        );
        section.style.setProperty("--q-fit-option-font", `${optionSize}px`);
      };

      apply();

      let guard = 0;
      while (
        !fits() &&
        (questionSize > MIN_QUESTION_FONT_PX ||
          optionSize > MIN_OPTION_FONT_PX) &&
        guard < 40
      ) {
        guard += 1;
        if (optionSize > MIN_OPTION_FONT_PX) {
          optionSize -= 0.5;
        }
        if (!fits() && questionSize > MIN_QUESTION_FONT_PX) {
          questionSize -= 0.5;
        }
        apply();
      }

      if (!fits()) {
        options.classList.add("quiz-question-options--scroll");
      }
    };

    fit();
    media.addEventListener("change", fit);
    window.addEventListener("resize", fit);

    const observer = new ResizeObserver(fit);
    observer.observe(section);

    return () => {
      media.removeEventListener("change", fit);
      window.removeEventListener("resize", fit);
      observer.disconnect();
      clearFitVars();
    };
  }, [sectionRef, questionRef, optionsRef, resetKey]);
}
