"use client";

import { useEffect, useState } from "react";
import { getQuestionTimeLimit, questions } from "@/data/quiz";
import { useQuizStore } from "@/store/quiz-store";
import { playCrash, playFatalError } from "@/lib/audio";
import { GlitchButton } from "@/components/GlitchButton";
import { QuizImageFrame } from "@/components/QuizImageFrame";

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function QuestionScreen() {
  const currentQuestion = useQuizStore((state) => state.currentQuestion);
  const answerQuestion = useQuizStore((state) => state.answerQuestion);
  const expelForTimeout = useQuizStore((state) => state.expelForTimeout);
  const isGlitching = useQuizStore((state) => state.isGlitching);
  const glitchVariant = useQuizStore((state) => state.glitchVariant);

  const question = questions[currentQuestion];
  const [timeLeft, setTimeLeft] = useState(() =>
    getQuestionTimeLimit(currentQuestion),
  );

  const shouldShake =
    isGlitching &&
    (glitchVariant === "slight" ||
      glitchVariant === "red" ||
      glitchVariant === "red-error" ||
      glitchVariant === "crazy");

  useEffect(() => {
    setTimeLeft(getQuestionTimeLimit(currentQuestion));
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
          expelForTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [currentQuestion, expelForTimeout]);

  return (
    <section
      className={`grid h-full min-h-0 grid-rows-[auto_auto_auto_minmax(0,1fr)] gap-1.5 sm:gap-2 ${
        shouldShake ? "screen-shake" : ""
      }`}
    >
      <div className="flex shrink-0 items-center justify-between text-[11px] tracking-widest text-foreground/50 uppercase sm:text-xs">
        <span>問題 {question.id}</span>
        <span className="flex items-center gap-2">
          <span
            className={
              timeLeft <= 10 ? "pulse-red font-bold text-accent-red" : ""
            }
          >
            ⏱ {formatTime(timeLeft)}
          </span>
          <span>
            {currentQuestion + 1} / {questions.length}
          </span>
        </span>
      </div>

      <QuizImageFrame
        src={question.image}
        aspect="square"
        crop={currentQuestion !== 0}
        priority
      />

      <div className="dither-bg pixel-border shrink-0 p-2.5 text-ink sm:p-3">
        <p className="text-sm leading-snug sm:text-base">{question.text}</p>
      </div>

      <div className="flex min-h-0 flex-col justify-center gap-1 sm:gap-1.5">
        {question.options.map((option) => (
          <GlitchButton
            key={option.id}
            variant="option"
            disabled={isGlitching}
            onClick={() => answerQuestion(option.id)}
            className="flex w-full shrink-0 items-center gap-2 px-2.5 py-1.5 text-left normal-case tracking-normal text-ink hover:bg-white/60 sm:px-3 sm:py-2"
          >
            <span className="shrink-0 text-xs font-bold sm:text-sm">
              {option.id}.
            </span>
            <span className="text-xs leading-snug sm:text-sm">{option.label}</span>
          </GlitchButton>
        ))}
      </div>
    </section>
  );
}
