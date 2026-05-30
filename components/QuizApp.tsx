"use client";

import { useEffect, useRef, useState } from "react";
import { GLITCH_BY_QUESTION } from "@/data/glitch";
import { useQuizStore } from "@/store/quiz-store";
import {
  playAnswerSounds,
  stopResultBgm,
  unlockAndStartBgm,
} from "@/lib/audio";
import { preloadImages } from "@/lib/preload-images";
import { ALL_PRELOAD_IMAGES } from "@/lib/quiz-images";
import { BootGate } from "@/components/BootGate";
import { GlitchOverlay } from "@/components/GlitchOverlay";
import { IntroGlitchOverlay } from "@/components/IntroGlitchOverlay";
import { StartScreen } from "@/components/StartScreen";
import { QuestionScreen } from "@/components/QuestionScreen";
import { PreparingScreen } from "@/components/PreparingScreen";
import { ResultScreen } from "@/components/ResultScreen";
import { ExpulsionScreen } from "@/components/ExpulsionScreen";

type BootPhase = "gate" | "intro" | "active";

const INTRO_DURATION_MS = 2800;

export function QuizApp() {
  const [bootPhase, setBootPhase] = useState<BootPhase>("gate");
  const stage = useQuizStore((state) => state.stage);
  const isGlitching = useQuizStore((state) => state.isGlitching);
  const glitchVariant = useQuizStore((state) => state.glitchVariant);
  const answers = useQuizStore((state) => state.answers);
  const prevAnswersLenRef = useRef(0);

  const handleGateStart = () => {
    unlockAndStartBgm();
    void preloadImages(ALL_PRELOAD_IMAGES);
    setBootPhase("intro");
  };

  useEffect(() => {
    if (bootPhase !== "intro") return;

    const timer = window.setTimeout(() => {
      setBootPhase("active");
    }, INTRO_DURATION_MS);

    return () => window.clearTimeout(timer);
  }, [bootPhase]);

  useEffect(() => {
    if (answers.length <= prevAnswersLenRef.current) return;

    const questionIndex = answers.length - 1;
    const glitch = GLITCH_BY_QUESTION[questionIndex] ?? {
      variant: "slight",
      duration: 450,
    };
    playAnswerSounds(questionIndex, glitch.variant);
    prevAnswersLenRef.current = answers.length;
  }, [answers.length]);

  useEffect(() => {
    if (stage === "start") {
      prevAnswersLenRef.current = 0;
      stopResultBgm();
      unlockAndStartBgm();
    }
  }, [stage]);

  if (bootPhase === "gate") {
    return <BootGate onStart={handleGateStart} />;
  }

  return (
    <>
      <IntroGlitchOverlay active={bootPhase === "intro"} />

      {bootPhase === "active" && (
        <main className="intro-pure-glitch-reveal relative mx-auto flex h-dvh max-h-dvh w-full min-w-0 max-w-md flex-col overflow-hidden bg-background px-2 py-1.5 sm:max-w-lg sm:px-3 sm:py-2 md:max-w-xl">
          <header className="mb-1 shrink-0 border-b border-foreground/20 pb-1 text-[11px] tracking-widest text-foreground/60 uppercase sm:text-xs">
            SYS://ENTITY_RECOGNITION_v3.2
          </header>

          <div className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
            {stage === "start" && <StartScreen />}
            {stage === "quiz" && <QuestionScreen />}
            {stage === "preparing" && <PreparingScreen />}
            {stage === "result" && <ResultScreen />}
            {stage === "expelled" && <ExpulsionScreen />}
          </div>

          {isGlitching && <GlitchOverlay variant={glitchVariant} />}
        </main>
      )}
    </>
  );
}
