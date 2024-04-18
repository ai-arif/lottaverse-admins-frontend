import React from "react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect, useSwitchChain } from "wagmi";

const style = {
  backgroundColor: "skyblue",
  color: "black",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  boxShadow: "0 5px #666",
  fontWeight: "bold",
  top: "20px",
  position: "absolute",
  right: "20px",
};

export default function WalletButton() {
  const { open } = useWeb3Modal();
  const { isConnected, chainId, address } = useAccount();
  const { disconnect } = useDisconnect();
  const { chains, isPending, switchChain } = useSwitchChain();

  return (
    <div style={{ display: "flex", justifyContent: "end" }}>
      {isConnected ? (
        chainId === Number(process.env.NEXT_PUBLIC_CHAINID) ? (
          <button
            className="connect-wallet"
            style={style}
            onClick={(e) => {
              e.preventDefault();
              open();
              // handleDisconnect();
            }}>
            {address
              ? `${address.substring(0, 6)}...${address.substring(
                  address.length - 4
                )}`
              : "Loading..."}
          </button>
        ) : (
          [chains].map((x) => (
            <button
              disabled={!switchChain || x[0]?.id === chainId}
              key={x.id}
              className="connect-wallet"
              style={style}
              onClick={(e) => {
                e.preventDefault();
                switchChain?.(x[0]?.id);
              }}>
              {console.log("CHAIN", x, chainId)}
              {isPending === x[0]?.id
                ? "Network (switching)"
                : `Switch ${x[0]?.name}`}
            </button>
          ))
        )
      ) : (
        <>
          <button
            className="connect-wallet"
            style={style}
            onClick={(e) => {
              e.preventDefault();
              open();
            }}>
            Connect Wallet
          </button>
        </>
      )}
    </div>
  );
}
