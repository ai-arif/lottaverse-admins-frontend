import { Html, Head, Main, NextScript } from "next/document";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect, useSwitchChain } from "wagmi";
import WalletButton from "@/components/WalletButton";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
