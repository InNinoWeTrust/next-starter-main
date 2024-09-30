import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThirdwebProviderWrapper from "./ThirdwebProviderWrapper"; // Client component

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Brown Waters Productions LLC",
  description: "Dapp for Brown Waters Productions DAO",
};

// No "use client" directive here
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThirdwebProviderWrapper>{children}</ThirdwebProviderWrapper>
      </body>
    </html>
  );
}
