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
// import { LOTTERY_REFERRAL_ABI } from "@/components/constants/lotterytestingabi";
import { LOTTERY_REFERRAL_ABI } from "@/components/constants/lotteryreferralabi";

const TokenContract = process.env.NEXT_PUBLIC_TOKENADDRESS;
const Sender = process.env.NEXT_PUBLIC_SENDER;
const lotteryContract = process.env.NEXT_PUBLIC_LOTTERY;

export const submitPremiumComission = async (
  address,
  lotteryID,
  premiumAddresses,
  // premiumAmount,
  loading,
  setLoading
) => {
  try {
    console.log("LotteryID", lotteryID);
    setLoading({ ...loading, premimumComissionLoading: true });
    // const comession_addresses = premiumUsers?.map((addr) => {
    //   return addr?.address;
    // });

    //*****************UNCOMMENT NEEDED******************/
    // const lotteryStatus = await readContract(lotteryconfig, {
    //   abi: LOTTERY_REFERRAL_ABI,
    //   address: lotteryContract,
    //   functionName: "LotteryWinner",
    //   args: [1],
    // });
    // console.log(lotteryStatus);
    //*****************UNCOMMENT NEEDED******************/
    console.log("premiumAddresses", premiumAddresses);
    const premimumPercentages = await readContract(lotteryconfig, {
      abi: LOTTERY_REFERRAL_ABI,
      address: lotteryContract,
      functionName: "getPercentageAmount",
      args: [lotteryID, 1000],
    });

    console.log("This is Percentages", premimumPercentages);
    console.log(
      "This is length of the premimum addresses",
      premiumAddresses.length
    );

    const balance = await readContract(lotteryconfig, {
      abi: usdt,
      address: TokenContract,
      functionName: "balanceOf",
      args: [address],
    });
    console.log("balance of Admin Account", balance);
    const amountperuser = Number(premimumPercentages) / premiumAddresses.length;
    console.log("This is amount per Percentages", amountperuser);
    const approvalAmount = premimumPercentages;
    console.log(approvalAmount);
    // const approvalAmount = 50000000;

    if (Number(balance) >= approvalAmount) {
      const Approve = await writeContract(lotteryconfig, {
        abi: usdt,
        address: TokenContract,
        functionName: "approve",
        args: [Sender, BigInt(approvalAmount)],
      });
      console.log("Approve", Approve);

      if (!Approve) {
        throw new Error("Failed to create approve transaction.");
      }
      const approval = await waitForTransactionReceipt(lotteryconfig, {
        hash: Approve,
      });
      console.log("Approval Status", approval?.status);

      (await approval?.status) === "success"
        ? alert("Commission Approval Successfully")
        : alert("Transaction rejected for Approval");

      // const hash = await writeContract(lotteryconfig, {
      //   abi: Sender_CONTRACT_ABI,
      //   address: Sender,
      //   functionName: "sendTokensMultipleAddresses",
      //   args: [
      //     TokenContract,
      //     [
      //       "0x3b95654cA3D98278e3be48BBA3694b0c6717dd02",
      //       "0x400A39935695ab99796f7818c98Ac13E3C35910C",
      //       "0xd916B8093A34997DA5B7E59b129784017e1C58dA",
      //       "0xD7103B12527659C083Abc2bBf1f17D849EF26af9",
      //       "0x2c85014D0A0C5732f9942302677D2fD10D1764A7",
      //       "0x712AfbF14f0F17658d5286BDF768B68cAe4B07a6",
      //       "0x47CC2bd586FabB06B0f11cC0b8ea078C116F0cfd",
      //       "0x3ff2f8e90c7D1185CC7FbB0eAA313685d04E1165",
      //       "0xD7C5420b98A704F3A9D7B48e08978945A8Bcb629",
      //       "0x07bDf25Eb1Bb8dA806cc97145dFB86417AF37a5A",
      //       "0x403773658F0bA47161977f8e5EdFcA7361D3b881",
      //       "0xAc8267506eC0639Ed428f865Ad7bf5a2d77cD267",
      //       "0xB2aE67358A54da2be9f8b37684701670fF0A8BB7",
      //       "0x374D70f8409B47aaF5C68005e02a0f6BCC1BF64a",
      //       "0xA753DFDAb5a78A47C9aD7fd3eba824eF7180982D",
      //       "0xf11b83E1F0b1b530e59185e8660DeE18e94c4D25",
      //       "0x8D783D334fc8ceBaF46A704A5E92B5ae48084caE",
      //       "0xFEBC23BB526c2C12bA8a3D837dd69D4cCa615c42",
      //       "0x3A216B0838B3A96f08C91C4777FD331114B87533",
      //       "0xE7f3092155fDB48e7a08Ab8D05fB926258756Ca6",
      //       "0x26BaDaC9143069C471Ef024eeDA8994Fb549Fd3A",
      //       "0x88BAC1140570f1e2F676567D5404213ca8d1aF0b",
      //       "0x143177891b31965B4D1f1766171A2a82cb5332D1",
      //       "0x38dbf0d0F98162e35eea2B0c7BeF04a96CA3d036",
      //       "0x38368Cd55Ec29489dC711127cC10233943279900",
      //       "0xe6a8FAFaa9e8fc36E55184a557D6Db136B766AbE",
      //       "0x5f284c0c4272b0fAcdD6eEe05Fd0e57714B05577",
      //       "0x16859b35C11A09ad28ADe93a6Ba03BeE56f0a709",
      //       "0xE3cC96703C62036153cC890c9ed7FA07Ec6B2Ae2",
      //       "0x74a134D86B90C1D58769f4Ea07a8827C0A09BC29",
      //     ],
      //     1000000,
      //   ],
      // });

      const hash = await writeContract(lotteryconfig, {
        abi: Sender_CONTRACT_ABI,
        address: Sender,
        functionName: "sendTokensMultipleAddresses",
        args: [TokenContract, premiumAddresses, amountperuser],
      });
      const transactionstatus = await waitForTransactionReceipt(lotteryconfig, {
        hash,
      });
      console.log(transactionstatus);

      transactionstatus?.status === "success"
        ? alert("Send Commission Successfully")
        : alert("Transaction rejected");
    } else {
      alert("Error: Not Enough Balance to Send rewards");
    }
  } catch (error) {
    alert(error?.message?.split(".")[0]);
  } finally {
    setLoading({ ...loading, premimumComissionLoading: false });
  }
};
