import { useCallback } from "react";
import { useAccount, useDisconnect, useSwitchChain } from "wagmi";
import {
  readContract,
  writeContract,
  waitForTransactionReceipt,
  simulateContract,
} from "@wagmi/core";
import { lotteryconfig } from "@/pages/_app";
import { usdt } from "@/components/constants/usdtabi";
import { Sender_CONTRACT_ABI } from "@/components/constants/Senderabi";

const TokenContract = process.env.NEXT_PUBLIC_TOKENADDRESS;
const Sender = process.env.NEXT_PUBLIC_SENDER;

export const submitwinner = async (
  winner_address,
  amount,
  second,
  setLoading,
  loading,
  address
) => {
  try {
    // setLoading(true);
    if (second == "second") {
      setLoading({ ...loading, secondComissionLoading: true });
    } else if (second == "third") {
      setLoading({ ...loading, thirdComissionLoading: true });
    }
    const balance = await readContract(lotteryconfig, {
      abi: usdt,
      address: TokenContract,
      functionName: "balanceOf",
      args: [address],
    });
    console.log("balance of Admin Account", balance);

    let hash;
    let transactionstatus;

    Number(balance) >= amount
      ? ((hash = await writeContract(lotteryconfig, {
          abi: usdt,
          address: TokenContract,
          functionName: "transfer",
          args: [winner_address, BigInt(amount)],
        })),
        (transactionstatus = await waitForTransactionReceipt(lotteryconfig, {
          hash,
        })),
        console.log(transactionstatus),
        transactionstatus?.status === "success"
          ? alert("Send prize Successfully")
          : alert("Transaction rejected"))
      : alert("Error: Not Enough Balance to Send rewards");
  } catch (error) {
    alert(
      error?.message
      // ?.split(".")[0]
    );
  } finally {
    if (second == "second") {
      setLoading({ ...loading, secondComissionLoading: false });
    } else if (second == "third") {
      setLoading({ ...loading, thirdComissionLoading: false });
    }
  }
};

