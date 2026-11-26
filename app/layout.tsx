import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@cristal-ui/react/tokens.css";
import "@cristal-ui/react/tokens-dark.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "landing-lab",
  description: "Le labo des landing pages construites avec Cristal",
};

// Before paint: the saved theme, else the system one, so the page and CrThemeToggle agree; then save every change.
const themeScript = `try{const r=document.documentElement;r.dataset.theme=localStorage.theme||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");new MutationObserver(()=>{localStorage.theme=r.dataset.theme}).observe(r,{attributeFilter:["data-theme"]})}catch{}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
