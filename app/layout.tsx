import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Optimizely Next.js Stater-Kit",
  description:
    "Next.js Starter Kit for Optimizely Full Stack using Optimizely react-sdk",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/logo.svg" />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
