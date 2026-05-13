import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CurrencyProvider } from "@/components/CurrencyProvider"; // <-- Import Provider

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "A'intrade Capital",
  description: "Micro-Funding & Prop Trading Ecosystem",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Bungkus seluruh aplikasi dengan CurrencyProvider */}
        <CurrencyProvider>
          {children}
        </CurrencyProvider>
      </body>
    </html>
  );
}