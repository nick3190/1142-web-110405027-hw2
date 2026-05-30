"use client";

import { useEffect, useRef, useState } from "react";
import { getQuestionTimeLimit, questions } from "@/data/quiz";
import { useQuizStore } from "@/store/quiz-store";
import { playCrash, playFatalError } from "@/lib/audio";
import { useFitQuestionLayout } from "@/lib/use-fit-question-layout";
import { GlitchButton } from "@/components/GlitchButton";
import { QuizImageFrame } from "@/components/QuizImageFrame";
import { QUESTION_IMAGE_SETTINGS } from "@/data/question-images";

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function QuestionTimer({
  questionIndex,
  onTimeout,
}: {
  questionIndex: number;
  onTimeout: () => void;
}) {
  const [timeLeft, setTimeLeft] = useState(() =>
    getQuestionTimeLimit(questionIndex),
  );

  useEffect(() => {
    let expired = false;

    const timer = window.setInterval(() => {
      if (expired) return;
      if (useQuizStore.getState().isGlitching) return;

      setTimeLeft((prev) => {
        if (prev <= 1) {
          expired = true;
          window.clearInterval(timer);
          playFatalError();
          playCrash();
          onTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [onTimeout]);

  return (
    <span
      className={`shrink-0 ${
        timeLeft <= 10 ? "pulse-red font-bold text-accent-red" : ""
      }`}
    >
      ⏱ {formatTime(timeLeft)}
    </span>
  );
}

export function QuestionScreen() {
  const sectionRef = useRef<HTMLElement>(null);
  const questionRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  const currentQuestion = useQuizStore((state) => state.currentQuestion);
  const answerQuestion = useQuizStore((state) => state.answerQuestion);
  const expelForTimeout = useQuizStore((state) => state.expelForTimeout);
  const isGlitching = useQuizStore((state) => state.isGlitching);
  const glitchVariant = useQuizStore((state) => state.glitchVariant);
  const glitchFlashImage = useQuizStore((state) => state.glitchFlashImage);

  const question = questions[currentQuestion];

  useFitQuestionLayout(sectionRef, questionRef, optionsRef, currentQuestion);

  const shouldShake =
    isGlitching &&
    (glitchVariant === "slight" ||
      glitchVariant === "red" ||
      glitchVariant === "red-error" ||
      glitchVariant === "crazy");

  const imageSettings = QUESTION_IMAGE_SETTINGS[currentQuestion];

  return (
    <section
      ref={sectionRef}
      className={`quiz-layout-shell quiz-question-screen grid h-full min-h-0 grid-rows-[auto_auto_auto_minmax(0,1fr)] gap-2 overflow-hidden sm:gap-1.5 ${
        shouldShake ? "screen-shake" : ""
      }`}
    >
      <div className="flex min-w-0 shrink-0 items-center justify-between gap-2 text-[10px] tracking-widest text-foreground/50 uppercase sm:text-xs">
        <span className="shrink-0">問題 {question.id}</span>
        <span className="flex min-w-0 shrink items-center gap-1.5 sm:gap-2">
          <QuestionTimer
            key={currentQuestion}
            questionIndex={currentQuestion}
            onTimeout={expelForTimeout}
          />
          <span className="shrink-0">
            {currentQuestion + 1}/{questions.length}
          </span>
        </span>
      </div>

      <div className="flex min-h-0 shrink-0 justify-center">
        <QuizImageFrame
          src={question.image}
          aspect="square"
          layout="question"
          flashSrc={glitchFlashImage}
          priority
          {...imageSettings}
        />
      </div>

      <div
        ref={questionRef}
        className="dither-bg pixel-border min-w-0 shrink-0 p-2.5 text-ink sm:p-2.5"
      >
        <p className="quiz-question-text break-words text-base leading-snug sm:leading-relaxed">
          {question.text}
        </p>
      </div>

      <div
        ref={optionsRef}
        className="quiz-question-options flex min-h-0 flex-col gap-1.5 overflow-y-auto overscroll-contain sm:gap-1 sm:overflow-hidden"
      >
        {question.options.map((option) => (
          <GlitchButton
            key={option.id}
            variant="option"
            disabled={isGlitching}
            onClick={() => answerQuestion(option.id)}
            className="quiz-question-option flex w-full min-w-0 shrink-0 items-start gap-2 px-2 py-1.5 text-left normal-case tracking-normal text-ink hover:bg-white/60 sm:gap-2 sm:px-2.5 sm:py-1.5"
          >
            <span className="quiz-question-option-id shrink-0 font-bold">
              {option.id}.
            </span>
            <span className="quiz-question-option-label min-w-0 flex-1 break-words leading-snug">
              {option.label}
            </span>
          </GlitchButton>
        ))}
      </div>
    </section>
  );
}
