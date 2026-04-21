import type { Metadata } from "next";
import { Libre_Baskerville, Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Portfolio Bisma Reza",
  description: "Made With Next.js 13, Tailwind CSS, and Framer Motion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
  <body
    suppressHydrationWarning
    className={`${poppins.variable} ${libreBaskerville.variable} antialiased`}
  >
    {children}
  </body>
</html>
  );
}
