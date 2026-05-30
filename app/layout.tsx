import type { Metadata, Viewport } from "next";
import { DotGothic16 } from "next/font/google";
import "./globals.css";

const dotGothic = DotGothic16({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dot-gothic",
});

export const metadata: Metadata = {
  title: "實體辨識系統 v3.2",
  description: "本系統將確認您是否為原始人類個體。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant" className={`${dotGothic.variable} h-full`}>
      <body className="scanlines noise-overlay min-h-full antialiased">
        {children}
      </body>
    </html>
  );
}
