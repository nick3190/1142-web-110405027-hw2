"use client";

import Image from "next/image";
import { questions } from "@/data/quiz";
import { useQuizStore } from "@/store/quiz-store";

export function QuestionScreen() {
  const currentQuestion = useQuizStore((state) => state.currentQuestion);
  const answerQuestion = useQuizStore((state) => state.answerQuestion);
  const isGlitching = useQuizStore((state) => state.isGlitching);

  const question = questions[currentQuestion];

  return (
    <section
      className={`flex flex-1 flex-col gap-3 ${isGlitching ? "glitch-active" : "fade-in"}`}
    >
      <div className="flex items-center justify-between text-[10px] tracking-widest text-foreground/50 uppercase">
        <span>問題 {question.id}</span>
        <span>
          {currentQuestion + 1} / {questions.length}
        </span>
      </div>

      <div className="pixel-border relative aspect-[4/3] w-full overflow-hidden bg-black">
        <Image
          src={question.image}
          alt=""
          fill
          className="horror-image object-cover"
          priority
        />
      </div>

      <div className="dither-bg pixel-border p-3 text-ink">
        <p className="text-sm leading-relaxed">{question.text}</p>
      </div>

      <div className="flex flex-col gap-2">
        {question.options.map((option) => (
          <button
            key={option.id}
            type="button"
            disabled={isGlitching}
            onClick={() => answerQuestion(option.id)}
            className="pixel-border-thin dither-bg group flex w-full cursor-pointer items-start gap-3 px-3 py-2.5 text-left text-sm text-ink transition hover:bg-white/60 disabled:cursor-not-allowed disabled:opacity-50 active:translate-x-0.5 active:translate-y-0.5"
          >
            <span className="mt-0.5 shrink-0 font-bold tracking-wider">
              {option.id}.
            </span>
            <span className="leading-snug group-hover:underline">
              {option.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
