import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Brown Waters Productions LLC",
  description:
    "Dapp for Brown Waters Productions DAO",
};

// Set the active chain (Polygon)
const activeChainId = ChainId.Polygon;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThirdwebProvider activeChain={activeChainId}>
          {children}
        </ThirdwebProvider>
      </body>
    </html>
  );
}
