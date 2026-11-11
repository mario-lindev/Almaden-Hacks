import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";

// Logo-inspired serif headings paired with the Luma event’s Roc Grotesk.
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
    "A student-built high school hackathon from the heart of Almaden Valley. Presented by Leland High School. June 12, 2027 at 8:00 AM Pacific, San Jose.",
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
    <html lang="en" className={serif.variable}>
      <head>
        <link rel="stylesheet" href="https://luma.com/fonts/rocgrotesk.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
