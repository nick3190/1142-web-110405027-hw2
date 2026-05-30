"use client";

import Image from "next/image";
import { results } from "@/data/quiz";
import { useQuizStore } from "@/store/quiz-store";

export function ResultScreen() {
  const resultId = useQuizStore((state) => state.resultId);
  const resetQuiz = useQuizStore((state) => state.resetQuiz);

  if (!resultId) return null;

  const result = results[resultId];

  return (
    <section className="fade-in flex flex-1 flex-col gap-4">
      <div className="text-center text-[10px] tracking-[0.3em] text-foreground/50 uppercase">
        辨識結果
      </div>

      <div className="pixel-border relative mx-auto aspect-square w-48 overflow-hidden bg-black sm:w-56">
        <Image
          src={result.image}
          alt=""
          fill
          className="horror-image object-cover"
        />
      </div>

      <div className="dither-bg pixel-border space-y-3 p-4 text-ink">
        <div>
          <h2 className="text-xl tracking-wide">{result.title}</h2>
          <p className="text-xs tracking-widest text-ink/60 uppercase">
            {result.titleEn}
          </p>
        </div>

        <div className="h-px w-full bg-ink/30" />

        <div className="space-y-1 text-sm leading-relaxed">
          {result.body.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <div className="h-px w-full bg-ink/30" />

        <div>
          <p className="mb-2 text-xs tracking-wider uppercase">特徵</p>
          <ul className="space-y-1 text-sm">
            {result.traits.map((trait) => (
              <li key={trait} className="flex gap-2">
                <span className="text-accent-red">*</span>
                <span>{trait}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button
        type="button"
        onClick={resetQuiz}
        className="pixel-border dither-bg w-full cursor-pointer px-4 py-3 text-sm tracking-widest text-ink uppercase transition hover:bg-paper/80 active:translate-x-0.5 active:translate-y-0.5"
      >
        ↺ 重新測驗
      </button>
    </section>
  );
}
