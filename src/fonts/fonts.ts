import {
  Bricolage_Grotesque,
  Geist,
  Geist_Mono,
  Space_Mono,
} from "next/font/google";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  preload: true,
  adjustFontFallback: false,
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  preload: true,
  adjustFontFallback: false,
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-giestMono",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  preload: true,
  adjustFontFallback: false,
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-spaceMono",
  display: "swap",
  weight: ["400", "700"],
  preload: true,
  adjustFontFallback: false,
});

const fonts = {
  bricolage,
  geist,
  geistMono,
  spaceMono,
};
export default fonts;
