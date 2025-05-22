
import type {Metadata} from 'next';
import { Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'DevTerm Portfolio',
  description: 'A developer portfolio with a terminal-like interface.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; 
}>) {
  return (
    <html lang="en" className="dark">{/* Default to dark theme, can be changed by 'theme' command */}
      <body className={`${geistMono.variable} font-mono antialiased h-full`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
