import { Inter } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google'
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
      <GoogleAnalytics gaId="G-81JJ9HSB3N" />
    </html>
  );
}
