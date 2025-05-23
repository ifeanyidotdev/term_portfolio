import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ifeanyi's Portfolio",
  description: "A developer portfolio with a terminal-like interface.",
  icons: {
    icon: "./favicon.ico",
    origin: "./favicon.ico",
    apple: "./favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning={true}>
      {/* Default to dark theme, can be changed by 'theme' command */}
      <body className={`${geistMono.variable} font-mono antialiased h-full`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
