"use client";

import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";  // Import ReactQueryDevtools
import { ReactNode } from "react";

// Create a client instance
const queryClient = new QueryClient();
const activeChainId = ChainId.Polygon;

export default function ThirdwebProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThirdwebProvider activeChain={activeChainId}>
        {children}
      </ThirdwebProvider>
      <ReactQueryDevtools initialIsOpen={false} />  {/* Add ReactQueryDevtools here */}
    </QueryClientProvider>
  );
}
