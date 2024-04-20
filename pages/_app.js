"use client";

import "../styles/globals.css";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
// import { mainnet } from "viem/chains";
import {
  mainnet,
  bscTestnet,
  bsc,
  sepolia,
  optimismSepolia,
} from "wagmi/chains";
import { WagmiProvider } from "wagmi";
import WalletButton from "@/components/WalletButton";
import { http, createConfig } from "@wagmi/core";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [optimismSepolia];
export const lotteryconfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  transports: {
    [optimismSepolia.id]: http(),
  },
});

createWeb3Modal({
  wagmiConfig: lotteryconfig,
  projectId,
  enableAnalytics: true,
  enableOnramp: true,
});

// export const configs = createConfig({
//   chains: [bscTestnet],
//   transports: {
//     [bscTestnet.id]: http(),
//   },
// });

export default function App({ Component, pageProps }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);
  const queryClient = new QueryClient();

  return (
    <>
      {ready ? (
        <WagmiProvider config={lotteryconfig}>
          <QueryClientProvider client={queryClient}>
            <WalletButton />
            <Component {...pageProps} />;
          </QueryClientProvider>
        </WagmiProvider>
      ) : null}
    </>
  );
}
