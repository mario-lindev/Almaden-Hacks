import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

// Inter handles the UI, Geist Mono the countdown, and Instrument Serif
// the event identity and headings.
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://almadenhacks.com"),
  title: "Almaden Hacks",
  description:
    "A student-built high school hackathon from the heart of Almaden Valley. Presented by Leland High School. June 5, 2027 at 8:00 AM Pacific, San Jose.",
  keywords: [
    "hackathon club",
    "leland high school",
    "almaden hacks",
    "san jose hackathon",
    "high school hackathon",
    "usaai",
  ],
  openGraph: {
    title: "Almaden Hacks",
    description: "A high school hackathon for software and hardware projects in San Jose.",
    siteName: "Almaden Hacks",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Almaden Hacks",
    description: "A high school hackathon for software and hardware projects in San Jose.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${serif.variable}`}>
      <body>{children}<Script id="luma-checkout" src="https://embed.lu.ma/checkout-button.js" strategy="afterInteractive" /></body>
    </html>
  );
}
