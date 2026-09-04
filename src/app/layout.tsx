import type { Metadata } from "next";
import { Barlow, Barlow_Semi_Condensed, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

const barlowSemiCondensed = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-barlow-semi-condensed",
  display: "swap",
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["500", "600", "700"],
  variable: "--font-noto-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "How are you finding Lavinia's session?",
  description: "A quick one-question poll for Alsama's training session.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${barlow.variable} ${barlowSemiCondensed.variable} ${notoSansArabic.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
