import type { Metadata } from "next";
import { Outfit, Inter, Fira_Code } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shivam",
  description: "Full Stack Developer building performant, modern web applications. Systems mindset, clean UI, scalable architecture.",
  keywords: ["Full Stack Developer", "Web Developer", "React", "Next.js", "Python", "Portfolio"],
  authors: [{ name: "Shivam" }],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Shivam | Full Stack Developer",
    description: "Full Stack Developer building performant, modern web applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} ${firaCode.variable}`}
    >
      <body className="bg-[#0a0a0a] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
