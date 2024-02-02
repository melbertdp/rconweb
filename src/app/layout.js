import { Inter } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import PrelineScript from "./components/PrelineScript";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Palworld Tools",
  description: "Palworld Tools",
};

export default function RootLayout({ children, }) {
  return (
    <html>
      <body className={inter.className}>{children}</body>
      <PrelineScript />
      <Analytics />
    </html>
  );
}
