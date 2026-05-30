import Image from "next/image";
import type { ReactNode } from "react";
import { GlitchImageFlash } from "@/components/GlitchImageFlash";

interface QuizImageFrameProps {
  src: string;
  aspect: "square" | "wide" | "wide-alt";
  size?: "full-width" | "fit";
  crop?: boolean;
  cropZoom?: number;
  imageLayer?: "default" | "back";
  layout?: "default" | "question" | "intro" | "result";
  flashSrc?: string | null;
  priority?: boolean;
  overlay?: ReactNode;
}

const ASPECT_CLASS = {
  square: "aspect-square",
  wide: "aspect-[2816/1536]",
  "wide-alt": "aspect-[2400/1792]",
} as const;

const SIZE_CLASS = {
  "full-width": "w-full max-w-full",
  fit: "h-full max-h-full w-auto max-w-full",
} as const;

const LAYOUT_CLASS = {
  default: "",
  question: "quiz-image-frame--question mx-auto shrink-0",
  intro: "quiz-image-frame--intro mx-auto shrink-0",
  result: "quiz-image-frame--result mx-auto shrink-0",
} as const;

export function QuizImageFrame({
  src,
  aspect,
  size = "full-width",
  crop = false,
  cropZoom = 1,
  imageLayer = "default",
  layout = "default",
  flashSrc,
  priority,
  overlay,
}: QuizImageFrameProps) {
  const useCover = crop || cropZoom > 1;
  const imageZ = imageLayer === "back" ? "z-0" : "z-[1]";
  const sizeClass = layout === "default" ? SIZE_CLASS[size] : "w-full max-w-full";

  return (
    <div
      className={`quiz-image-frame pixel-border relative overflow-hidden bg-black ${ASPECT_CLASS[aspect]} ${sizeClass} ${LAYOUT_CLASS[layout]} ${imageLayer === "back" ? "isolate" : ""}`}
    >
      <div className={`absolute inset-0 overflow-hidden ${imageZ}`}>
        <Image
          src={src}
          alt=""
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 480px"
          className={`quiz-photo ${useCover ? "object-cover object-center" : "object-contain"}`}
          style={cropZoom > 1 ? { transform: `scale(${cropZoom})` } : undefined}
        />
      </div>
      {flashSrc && (
        <GlitchImageFlash
          src={flashSrc}
          cropZoom={cropZoom}
          useCover={useCover}
        />
      )}
      {overlay && (
        <div className="pointer-events-none absolute inset-0 z-[2]">{overlay}</div>
      )}
    </div>
  );
}
