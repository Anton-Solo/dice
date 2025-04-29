import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dice Game",
  description: "Play a simple dice game",
  openGraph: {
    title: "Dice Game",
    description: "Play a simple dice game",
    url: "https:/test.dice",
    siteName: "Dice Game",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        {children}
      </body>
    </html>
  );
}
