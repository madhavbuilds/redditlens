import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Providers } from "@/components/Providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "RedditLens",
  description: "AI-powered Reddit intelligence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`} suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] antialiased">
        <Providers>
          <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--background)]/70 backdrop-blur">
            <nav className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-5">
              <div className="flex items-center gap-2 text-sm font-semibold tracking-wide">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" stroke="#7c3aed" strokeWidth="2" />
                  <circle cx="9" cy="10" r="1.5" fill="#a78bfa" />
                  <circle cx="15" cy="10" r="1.5" fill="#a78bfa" />
                  <path d="M8 15c1.2 1 2.5 1.5 4 1.5s2.8-.5 4-1.5" stroke="#a78bfa" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
                <span>RedditLens</span>
              </div>
              <ThemeToggle />
            </nav>
          </header>
          {children}
        </Providers>
      </body>
    </html>
  );
}
