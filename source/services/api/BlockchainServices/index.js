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

export const thousandWinner = async (
  winner_addresses,
  setLoading,
  loading,
  address,
  randomUsersAmount
) => {
  try {
    setLoading({ ...loading, randomComissionLoading: true });
    // const winner_addresses = random1kAddresses.map((addr) => {
    //   return addr.address;
    // });
    const balance = await readContract(lotteryconfig, {
      abi: usdt,
      address: TokenContract,
      functionName: "balanceOf",
      args: [address],
    });
    console.log("balance of Admin Account", balance);

    const totalamount = randomUsersAmount * winner_addresses.length;
    // const totalamount = 10 * winner_addresses.length;

    let Approve;
    let hash;
    let transactionstatus;

    Number(balance) >= totalamount
      ? ((Approve = await writeContract(lotteryconfig, {
          abi: usdt,
          address: TokenContract,
          functionName: "approve",
          args: [
            "0xc0ff7eed74f5be013c4f3579be6393f9591f1ca0",
            BigInt(totalamount),
          ],
        })),
        console.log("Approve", Approve),
        (hash = await writeContract(lotteryconfig, {
          abi: Sender_CONTRACT_ABI,
          address: "0xc0ff7eed74f5be013c4f3579be6393f9591f1ca0",
          functionName: "sendTokensToMultipleAddresses",
          args: [TokenContract, winner_addresses, BigInt(randomUsersAmount)],
        })),
        (transactionstatus = await waitForTransactionReceipt(lotteryconfig, {
          hash,
        })),
        console.log(transactionstatus),
        transactionstatus?.status === "success"
          ? alert("Send Winners amount Successfully")
          : alert("Transaction rejected"))
      : alert("Error: Not Enough Balance to Send rewards");
  } catch (error) {
    alert(error?.message?.split(".")[0]);
  } finally {
    setLoading({ ...loading, randomComissionLoading: false });
  }
};

export const submitSender = async (address) => {
  try {
    // const comession_addresses = addresses.map((addr) => {
    //   return addr.address;
    // });
    const balance = await readContract(lotteryconfig, {
      abi: usdt,
      address: TokenContract,
      functionName: "balanceOf",
      args: [address],
    });
    console.log("balance of Admin Account", balance);
    // const approval_amount = 30;
    // const approval_amount = fivePercent*30;
    const amountperuser = fivePercent / 30;

    let Approve;
    let hash;
    let transactionstatus;

    Number(balance) >= approval_amount
      ? ((Approve = await writeContract(lotteryconfig, {
          abi: usdt,
          address: TokenContract,
          functionName: "approve",
          args: [
            "0x7104eb5194E9F275145B6e662C5318871287Af30",
            BigInt(fivePercent),
          ],
        })),
        console.log("Approve", Approve),
        (hash = await writeContract(lotteryconfig, {
          abi: Sender_CONTRACT_ABI,
          address: "0x7104eb5194E9F275145B6e662C5318871287Af30",
          functionName: "sendTokensMultipleAddresses",
          args: [
            TokenContract,
            [
              "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
              "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
              "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB",
              "0x617F2E2fD72FD9D5503197092aC168c91465E7f2",
              "0x17F6AD8Ef982297579C203069C1DbfFE4348c372",
              "0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678",
              "0x03C6FcED478cBbC9a4FAB34eF9f40767739D1Ff7",
              "0x1aE0EA34a72D944a8C7603FfB3eC30a6669E454C",
              "0x0A098Eda01Ce92ff4A4CCb7A4fFFb5A43EBC70DC",
              "0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c",
              "0x14723A09ACff6D2A60DcdF7aA4AFf308FDDC160C",
              "0x4B0897b0513fdC7C541B6d9D7E929C4e5364D2dB",
              "0x583031D1113aD414F02576BD6afaBfb302140225",
              "0xdD870fA1b7C4700F2BD7f44238821C26f7392148",
            ],
            1,
          ],
        })),
        (hash = await writeContract(lotteryconfig, {
          abi: Sender_CONTRACT_ABI,
          address: "0x7104eb5194E9F275145B6e662C5318871287Af30",
          functionName: "sendTokensMultipleAddresses",
          args: [TokenContract, comession_addresses, amountperuser],
        })),
        (transactionstatus = await waitForTransactionReceipt(lotteryconfig, {
          hash,
        })),
        console.log(transactionstatus),
        transactionstatus?.status === "success"
          ? alert("Send Commission Successfully")
          : alert("Transaction rejected"))
      : alert("Error: Not Enough Balance to Send rewards");
  } catch (error) {
    alert(
      error?.message
      // ?.split(".")[0]
    );
  }
};

// export const submitPremiumComission = useCallback(async () => {
//   try {
//     setLoading({ ...loading, premimumComissionLoading: true });
//     // const comession_addresses = premiumUsers?.map((addr) => {
//     //   return addr?.address;
//     // });
//     const balance = await readContract(lotteryconfig, {
//       abi: usdt,
//       address: TokenContract,
//       functionName: "balanceOf",
//       args: [address],
//     });
//     console.log("balance of Admin Account", balance);
//     // const amountperuser = premiumUsersAmount / comession_addresses.length;
//     const approvalAmount = 30;

//     if (Number(balance) >= approvalAmount) {
//       const Approve = await writeContract(lotteryconfig, {
//         abi: usdt,
//         address: TokenContract,
//         functionName: "approve",
//         args: [
//           "0x7104eb5194E9F275145B6e662C5318871287Af30",
//           BigInt(approvalAmount),
//         ],
//       });
//       console.log("Approve", Approve);
//       const hash = await writeContract(lotteryconfig, {
//         abi: Sender_CONTRACT_ABI,
//         address: "0x7104eb5194E9F275145B6e662C5318871287Af30",
//         functionName: "sendTokensMultipleAddresses",
//         args: [
//           TokenContract,
//           [
//             "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
//             "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
//             "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB",
//             "0x617F2E2fD72FD9D5503197092aC168c91465E7f2",
//             "0x17F6AD8Ef982297579C203069C1DbfFE4348c372",
//             "0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678",
//             "0x03C6FcED478cBbC9a4FAB34eF9f40767739D1Ff7",
//             "0x1aE0EA34a72D944a8C7603FfB3eC30a6669E454C",
//             "0x0A098Eda01Ce92ff4A4CCb7A4fFFb5A43EBC70DC",
//             "0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c",
//             "0x14723A09ACff6D2A60DcdF7aA4AFf308FDDC160C",
//             "0x4B0897b0513fdC7C541B6d9D7E929C4e5364D2dB",
//             "0x583031D1113aD414F02576BD6afaBfb302140225",
//             "0xdD870fA1b7C4700F2BD7f44238821C26f7392148",
//           ],
//           1000000,
//         ],
//       });

//       // const hash = await writeContract(lotteryconfig, {
//       //   abi: Sender_CONTRACT_ABI,
//       //   address: "0xc0ff7eed74f5be013c4f3579be6393f9591f1ca0",
//       //   functionName: "sendTokensToMultipleAddresses",
//       //   args: [TokenContract, comession_addresses, amountperuser],
//       // });
//       const transactionstatus = await waitForTransactionReceipt(lotteryconfig, {
//         hash,
//       });
//       console.log(transactionstatus);

//       transactionstatus?.status === "success"
//         ? alert("Send Commission Successfully")
//         : alert("Transaction rejected");
//     } else {
//       alert("Error: Not Enough Balance to Send rewards");
//     }
//   } catch (error) {
//     alert(error?.message?.split(".")[0]);
//   } finally {
//     setLoading({ ...loading, premimumComissionLoading: false });
//   }
// }, [address, loading]);
