import Layout from "@/components/Layout";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Sender_CONTRACT_ABI } from "../../components/constants/Senderabi";
import { usdt } from "../../components/constants/usdtabi";
import { LOTTERY_REFERRAL_ABI } from "../../components/constants/lotterytestingabi";

// import { LOTTERY_CONTRACT_ABI } from "../../components/constants/lotteryabi";

// import { useReadContract, useWriteContract } from "wagmi";
import { useAccount, useDisconnect, useSwitchChain } from "wagmi";
import {
  readContract,
  writeContract,
  waitForTransactionReceipt,
  simulateContract,
} from "@wagmi/core";
import { useWaitForTransactionReceipt } from "wagmi";
import { lotteryconfig } from "../_app";
import { submitwinner } from "@/source/services/api/BlockchainServices";
import { submitPremiumComission } from "@/source/services/api/BlockchainServices/premiumuser";
import { submitSender } from "@/source/services/api/BlockchainServices/sendercommission";
import { thousandWinner } from "@/source/services/api/BlockchainServices/randomwinners";

const TokenContract = process.env.NEXT_PUBLIC_TOKENADDRESS;
const LotteryContract = process.env.NEXT_PUBLIC_LOTTERY;

const Index = () => {
  const [lotteries, setLotteries] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [secondWinner, setSecondWinner] = useState({
    address: "",
    amount: "",
  });
  const [thirdWinner, setThirdWinner] = useState({
    address: "",
    amount: "",
  });
  const [random1kAddresses, setRandom1kAddresses] = useState([]);
  const [premiumUsers, setPremiumUsers] = useState([]);
  const [premiumUsersAmount, setPremiumUsersAmount] = useState({});
  const [fivePercent, setFivePercent] = useState({});
  const [randomUsersAmount, setRandomUsersAmount] = useState({});
  // const [loading, setLoading] = useState(false);
  const [loading, setLoading] = useState({
    secondComissionLoading: false,
    thirdComissionLoading: false,
    topComissionLoading: false,
    randomComissionLoading: false,
    premimumComissionLoading: false,
  });
  const {
    secondComissionLoading,
    thirdComissionLoading,
    topComissionLoading,
    randomComissionLoading,
    premimumComissionLoading,
  } = loading;
  const { isConnected, chainId, address } = useAccount();
  const { waitForTransactionReceipt, data } = useWaitForTransactionReceipt();
  // const { data: hash, error, isPending, writeContract } = useWriteContract();

  const getLottery = useCallback(async () => {
    try {
      const res = await axios.get(
        "https://lottaverse.mainulhasan05.xyz/api/activelotteries"
      );
      setLotteries(res.data?.data);

      handleSubmitDraw(res.data?.data[0].lotteryID);
    } catch (error) {
      console.log("ERROR::", error);
    }
  }, []);

  useEffect(() => {
    getLottery();
  }, [getLottery]);

  const handleSubmitDraw = async (lotteryId) => {
    try {
      // drawlottery
      const res = await axios.post(
        "https://lottaverse.mainulhasan05.xyz/api/drawlottery",
        // " https://1075-103-105-211-114.ngrok-free.app/api/drawlottery",
        {
          lotteryId: lotteryId,
        }
      );
      setAddresses(res.data?.data.top30Users);
      setFivePercent(res.data?.data.fivePercentOfTotalPerUser);
      setSecondWinner({
        address: res.data?.data.secondPrizeWinner,
        amount: res.data?.data.secondWinnerAmount,
      });
      setThirdWinner({
        address: res.data?.data.thirdPrizeWinner,
        amount: res.data?.data.thirdWinnerAmount,
      });
      setRandom1kAddresses(res.data?.data.randomUsers);
      setRandomUsersAmount(res.data?.data.randomWinnerAmount);
      setPremiumUsers(res.data.data?.premiumUsers);
      setPremiumUsersAmount(res.data?.data.fivePercentPerPremiumUser);
      // randomWinnerAmount
    } catch (error) {
      console.log(error.message);
      // alert(error)
    }
  };

  const submitthousandwinner = useCallback(
    // async (winner_addresses) => {
    //   try {
    //     setLoading({ ...loading, randomComissionLoading: true });
    //     // const winner_addresses = random1kAddresses.map((addr) => {
    //     //   return addr.address;
    //     // });
    //     const balance = await readContract(lotteryconfig, {
    //       abi: usdt,
    //       address: TokenContract,
    //       functionName: "balanceOf",
    //       args: [address],
    //     });
    //     console.log("balance of Admin Account", balance);

    //     const totalamount = randomUsersAmount * winner_addresses.length;
    //     // const totalamount = 10 * winner_addresses.length;

    //     let Approve;
    //     let hash;
    //     let transactionstatus;

    //     Number(balance) >= totalamount
    //       ? ((Approve = await writeContract(lotteryconfig, {
    //           abi: usdt,
    //           address: TokenContract,
    //           functionName: "approve",
    //           args: [
    //             "0xc0ff7eed74f5be013c4f3579be6393f9591f1ca0",
    //             BigInt(totalamount),
    //           ],
    //         })),
    //         console.log("Approve", Approve),
    //         // (hash = await writeContract(lotteryconfig, {
    //         //   abi: Sender_CONTRACT_ABI,
    //         //   address: "0xc0ff7eed74f5be013c4f3579be6393f9591f1ca0",
    //         //   functionName: "sendTokensToMultipleAddresses",
    //         //   args: [
    //         //     "0x1c8671b5a296dae6da2c11cc2f626c2b2b5c37a9",
    //         //     [
    //         //       "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
    //         //       "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
    //         //       "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB",
    //         //       "0x617F2E2fD72FD9D5503197092aC168c91465E7f2",
    //         //       "0x17F6AD8Ef982297579C203069C1DbfFE4348c372",
    //         //       "0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678",
    //         //       "0x03C6FcED478cBbC9a4FAB34eF9f40767739D1Ff7",
    //         //       "0x1aE0EA34a72D944a8C7603FfB3eC30a6669E454C",
    //         //       "0x0A098Eda01Ce92ff4A4CCb7A4fFFb5A43EBC70DC",
    //         //       "0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c",
    //         //       "0x14723A09ACff6D2A60DcdF7aA4AFf308FDDC160C",
    //         //       "0x4B0897b0513fdC7C541B6d9D7E929C4e5364D2dB",
    //         //       "0x583031D1113aD414F02576BD6afaBfb302140225",
    //         //       "0xdD870fA1b7C4700F2BD7f44238821C26f7392148",
    //         //     ],
    //         //     1,
    //         //   ],
    //         // })),
    //         (hash = await writeContract(lotteryconfig, {
    //           abi: Sender_CONTRACT_ABI,
    //           address: "0xc0ff7eed74f5be013c4f3579be6393f9591f1ca0",
    //           functionName: "sendTokensToMultipleAddresses",
    //           args: [
    //             TokenContract,
    //             winner_addresses,
    //             BigInt(randomUsersAmount),
    //           ],
    //         })),
    //         (transactionstatus = await waitForTransactionReceipt(
    //           lotteryconfig,
    //           {
    //             hash,
    //           }
    //         )),
    //         console.log(transactionstatus),
    //         transactionstatus?.status === "success"
    //           ? alert("Send Winners amount Successfully")
    //           : alert("Transaction rejected"))
    //       : alert("Error: Not Enough Balance to Send rewards");
    //   } catch (error) {
    //     alert(error?.message?.split(".")[0]);
    //   } finally {
    //     setLoading({ ...loading, randomComissionLoading: false });
    //   }
    // },
    async (winner_addresses) => {
      try {
        thousandWinner(
          // winner_addresses,
          setLoading,
          loading,
          address
          // randomUsersAmount
        );
      } catch (error) {
        console.log(error);
      }
    },
    [address, loading]
  );
  // const submitwinner = useCallback(
  //   async (winner_address, amount) => {
  //     try {
  //       setLoading(true);

  //       const balance = await readContract(lotteryconfig, {
  //         abi: usdt,
  //         address: TokenContract,
  //         functionName: "balanceOf",
  //         args: [address],
  //       });
  //       console.log("balance of Admin Account", balance);

  //       let hash;
  //       let transactionstatus;

  //       Number(balance) >= amount
  //         ? ((hash = await writeContract(lotteryconfig, {
  //             abi: usdt,
  //             address: TokenContract,
  //             functionName: "transfer",
  //             args: [winner_address, BigInt(amount)],
  //           })),
  //           (transactionstatus = await waitForTransactionReceipt(
  //             lotteryconfig,
  //             {
  //               hash,
  //             }
  //           )),
  //           console.log(transactionstatus),
  //           transactionstatus?.status === "success"
  //             ? alert("Send prize Successfully")
  //             : alert("Transaction rejected"))
  //         : alert("Error: Not Enough Balance to Send rewards");
  //     } catch (error) {
  //       alert(
  //         error?.message
  //         // ?.split(".")[0]
  //       );
  //     } finally {
  //       setLoading(false);
  //     }
  //   },
  //   [address]
  // );

  const submitSenderComission = useCallback(async () => {
    // address,
    //   // comession_addresses,
    //   //   lotteryID,
    //   loading,
    //   setLoading;
    await submitSender(
      address,
      // comession_addresses,
      // lotteryID,
      loading,
      setLoading
    );

    // try {
    //   setLoading({ ...loading, topComissionLoading: true });
    //   // const comession_addresses = addresses.map((addr) => {
    //   //   return addr.address;
    //   // });
    //   const balance = await readContract(lotteryconfig, {
    //     abi: usdt,
    //     address: TokenContract,
    //     functionName: "balanceOf",
    //     args: [address],
    //   });
    //   console.log("balance of Admin Account", balance);
    //   // const approval_amount = 30;
    //   // const approval_amount = fivePercent*30;
    //   const amountperuser = fivePercent / 30;

    //   if (Number(balance) >= fivePercent) {
    //     const Approve = await writeContract(lotteryconfig, {
    //       abi: usdt,
    //       address: TokenContract,
    //       functionName: "approve",
    //       args: [
    //         "0x7104eb5194E9F275145B6e662C5318871287Af30",
    //         BigInt(approval_amount),
    //       ],
    //     });
    //     console.log("Approved", Approve);

    //     // const hash = await writeContract(lotteryconfig, {
    //     //   abi: Sender_CONTRACT_ABI,
    //     //   address: "0x7104eb5194E9F275145B6e662C5318871287Af30",
    //     //   functionName: "sendTokensMultipleAddresses",
    //     //   args: [
    //     //     TokenContract,
    //     //     [
    //     //       "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
    //     //       "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
    //     //       "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB",
    //     //       "0x617F2E2fD72FD9D5503197092aC168c91465E7f2",
    //     //       "0x17F6AD8Ef982297579C203069C1DbfFE4348c372",
    //     //       "0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678",
    //     //       "0x03C6FcED478cBbC9a4FAB34eF9f40767739D1Ff7",
    //     //       "0x1aE0EA34a72D944a8C7603FfB3eC30a6669E454C",
    //     //       "0x0A098Eda01Ce92ff4A4CCb7A4fFFb5A43EBC70DC",
    //     //       "0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c",
    //     //       "0x14723A09ACff6D2A60DcdF7aA4AFf308FDDC160C",
    //     //       "0x4B0897b0513fdC7C541B6d9D7E929C4e5364D2dB",
    //     //       "0x583031D1113aD414F02576BD6afaBfb302140225",
    //     //       "0xdD870fA1b7C4700F2BD7f44238821C26f7392148",
    //     //     ],
    //     //     1000000,
    //     //   ],
    //     // });
    //     const hash = await writeContract(lotteryconfig, {
    //       abi: Sender_CONTRACT_ABI,
    //       address: "0x7104eb5194E9F275145B6e662C5318871287Af30",
    //       functionName: "sendTokensMultipleAddresses",
    //       args: [TokenContract, comession_addresses, amountperuser],
    //     });
    //     const transactionstatus = await waitForTransactionReceipt(
    //       lotteryconfig,
    //       {
    //         hash,
    //       }
    //     );
    //     console.log(transactionstatus),
    //       transactionstatus?.status === "success"
    //         ? alert("Send Commission Successfully")
    //         : alert("Transaction rejected");
    //   } else {
    //     alert("Error: Not Enough Balance to Send rewards");
    //   }
    // } catch (error) {
    //   console.log(error);
    //   alert(error?.message);
    // } finally {
    //   setLoading({ ...loading, topComissionLoading: false });
    // }
  }, [address, loading]);

  const submitPremium = useCallback(async () => {
    // setLoading({ ...loading, premimumComissionLoading: true });
    // // const comession_addresses = premiumUsers?.map((addr) => {
    // //   return addr?.address;
    // // });
    // const balance = await readContract(lotteryconfig, {
    //   abi: usdt,
    //   address: TokenContract,
    //   functionName: "balanceOf",
    //   args: [address],
    // });
    // console.log("balance of Admin Account", balance);
    // // const amountperuser = premiumUsersAmount / comession_addresses.length;
    // const approvalAmount = 30;

    // if (Number(balance) >= approvalAmount) {
    //   const Approve = await writeContract(lotteryconfig, {
    //     abi: usdt,
    //     address: TokenContract,
    //     functionName: "approve",
    //     args: [
    //       "0x7104eb5194E9F275145B6e662C5318871287Af30",
    //       BigInt(approvalAmount),
    //     ],
    //   });
    //   console.log("Approve", Approve);
    //   // const hash = await writeContract(lotteryconfig, {
    //   //   abi: Sender_CONTRACT_ABI,
    //   //   address: "0x7104eb5194E9F275145B6e662C5318871287Af30",
    //   //   functionName: "sendTokensMultipleAddresses",
    //   //   args: [
    //   //     TokenContract,
    //   //     [
    //   //       "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
    //   //       "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
    //   //       "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB",
    //   //       "0x617F2E2fD72FD9D5503197092aC168c91465E7f2",
    //   //       "0x17F6AD8Ef982297579C203069C1DbfFE4348c372",
    //   //       "0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678",
    //   //       "0x03C6FcED478cBbC9a4FAB34eF9f40767739D1Ff7",
    //   //       "0x1aE0EA34a72D944a8C7603FfB3eC30a6669E454C",
    //   //       "0x0A098Eda01Ce92ff4A4CCb7A4fFFb5A43EBC70DC",
    //   //       "0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c",
    //   //       "0x14723A09ACff6D2A60DcdF7aA4AFf308FDDC160C",
    //   //       "0x4B0897b0513fdC7C541B6d9D7E929C4e5364D2dB",
    //   //       "0x583031D1113aD414F02576BD6afaBfb302140225",
    //   //       "0xdD870fA1b7C4700F2BD7f44238821C26f7392148",
    //   //     ],
    //   //     1000000,
    //   //   ],
    //   // });

    //   const hash = await writeContract(lotteryconfig, {
    //     abi: Sender_CONTRACT_ABI,
    //     address: "0x7104eb5194E9F275145B6e662C5318871287Af30",
    //     functionName: "sendTokensMultipleAddresses",
    //     args: [TokenContract, comession_addresses, amountperuser],
    //   });
    //   const transactionstatus = await waitForTransactionReceipt(
    //     lotteryconfig,
    //     {
    //       hash,
    //     }
    //   );
    //   console.log(transactionstatus);

    //   transactionstatus?.status === "success"
    //     ? alert("Send Commission Successfully")
    //     : alert("Transaction rejected");
    // } else {
    //   alert("Error: Not Enough Balance to Send rewards");
    // }
    // address,lotteryID, premiumAddresses, loading, setLoading;
    await submitPremiumComission(
      address,
      // lotteryID,
      // premiumUsers,
      loading,
      setLoading
    );
  }, [address, loading]);

  const sendwinnerprize = useCallback(
    async (winner, amount, second) => {
      try {
        await submitwinner(
          winner,
          amount,
          second,
          setLoading,
          loading,
          address
        );
      } catch (error) {
        console.log(error);
      }
    },
    [address, loading]
  );

  // const sendthousandprizes = async (winners_addresses) => {
  //   // ******************sendTokensToMultipleAddresses Smart Contract function params**********/
  //   // IERC20 token,
  //   // address[] recipients,
  //   // uint256 amount
  //   submitthousandwinner(winners_addresses);
  // };

  // const sendwinnerprize = async (winner, amount) => {
  //   // ******************Transfer Smart Contract function params**********/
  //   // address to,
  //   // uint256 amount
  //   submitwinner(winner, amount);
  // };

  // const sendCommission = async () => {
  //   // ******************Send Commission Smart Contract function params**********/
  //   // IERC20 token,
  //   // address[] recipients,
  //   // uint256 amount
  //   submitSenderComission();
  // };

  // const premiumCommission = async () => {
  //   // ******************Send Commission Smart Contract function params**********/
  //   // IERC20 token,
  //   // address[] recipients,
  //   // uint256 amount
  //   submitPremiumComission();
  // };

  const handleSendCommission = async () => {
    console.log("send commission");
    if (isConnected) {
      await submitSenderComission();
    } else {
      alert("Wallet is not connected");
    }
    // const comession_addresses = addresses.map((addr) => {
    //   return addr.address;
    // });
    // console.log(comession_addresses);
    // console.log(comession_addresses.length);
    // console.log(fivePercent);
  };

  const handlePremiumCommission = async () => {
    console.log("send commission");
    if (isConnected) {
      await submitPremium();
    } else {
      alert("Wallet is not connected");
    }
    // const comession_addresses = addresses.map((addr) => {
    //   return addr.address;
    // });
    // console.log(comession_addresses);
    // console.log(comession_addresses.length);
    // console.log(fivePercent);
  };

  const handleSecondWinnerCommission = async (second) => {
    // sendwinnerprize("0x14b47cd2cf750b9477ef7b17bbbe428986c80d61", 2);
    if (isConnected) {
      await sendwinnerprize(
        secondWinner?.address,
        secondWinner?.amount,
        second
      );

      // await sendwinnerprize(
      //   "0x14B47cD2cf750b9477EF7B17bBbE428986c80D61",
      //   1000000,
      //   second
      // );
    } else {
      alert("Wallet is not connected");
    }

    console.log(secondWinner?.address, secondWinner?.amount);
  };
  const handleThirdWinnerCommission = async (third) => {
    // sendwinnerprize("0x529Ece8c1995be3D4839912551565F1531037737", 1);
    if (isConnected) {
      await sendwinnerprize(thirdWinner?.address, thirdWinner?.amount, third);
      // await sendwinnerprize(
      //   "0x14B47cD2cf750b9477EF7B17bBbE428986c80D61",
      //   1000000,
      //   third
      // );
    } else {
      alert("Wallet is not connected");
    }
    // console.log(thirdWinner?.address, thirdWinner?.amount);
  };
  const handleRandomWinnerCommission = async () => {
    if (isConnected) {
      await submitthousandwinner(random1kAddresses);
    } else {
      alert("Wallet is not connected");
    }
    console.log(random1kAddresses);
    console.log(randomUsersAmount);
  };
  return (
    <Layout>
      <div className="container">
        <h1>Send Commission</h1>
        {/* create a select field */}
        <select
          onChange={async (e) => {
            await handleSubmitDraw(e.target.value);
          }}
          className="form-select">
          {lotteries.map((lottery) => (
            <option key={lottery.ID} value={lottery.lotteryID}>
              {lottery.lotteryID}
            </option>
          ))}
        </select>

        <br />
        <br />
        <div className="container">
          <h2>Second Winner</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Address</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{secondWinner?.address}</td>
                <td>{secondWinner?.amount}</td>
              </tr>
            </tbody>
          </table>
          {/* send commision button */}
          <button
            onClick={() => handleSecondWinnerCommission("second")}
            className="btn btn-primary">
            {secondComissionLoading
              ? "Loading..."
              : "Send Commission Second Winner"}
          </button>
        </div>
        <br />
        <hr />
        <br />

        <div className="container">
          <h2>Third Winner</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Address</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{thirdWinner?.address}</td>
                <td>{thirdWinner?.amount}</td>
              </tr>
            </tbody>
          </table>
          {/* send commision button */}
          <button
            onClick={() => handleThirdWinnerCommission("third")}
            className="btn btn-primary">
            {thirdComissionLoading
              ? "Loading..."
              : "Send Commission Third Winner"}
          </button>
        </div>
        <br />
        <hr />
        <br />
        <div className="container">
          <h2>Premium Users</h2>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Address</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {premiumUsers.map((address, index) => (
              <tr key={index}>
                <td>{address.address}</td>
                <td>{premiumUsersAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={handlePremiumCommission} className="btn btn-primary">
          {premimumComissionLoading
            ? "Loading..."
            : "Send Commission Premium Users"}
        </button>
        <br />
        <hr />

        <div className="container">
          <h2>Top 30</h2>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Address</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {addresses.map((address, index) => (
              <tr key={index}>
                <td>{address.address}</td>
                <td>{fivePercent}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={handleSendCommission} className="btn btn-primary">
          {topComissionLoading ? "Loading..." : "Send Commission top30"}
        </button>
        <br />
        <hr />

        <div className="container">
          <br />
          <hr />
          <br />

          <div className="container">
            <h2>Random 1k Winners</h2>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Address</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {random1kAddresses.map((address, index) => (
                <tr key={index}>
                  <td>{address}</td>
                  <td>{randomUsersAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={handleRandomWinnerCommission}
            className="btn btn-primary">
            {randomComissionLoading
              ? "Loading..."
              : "Send Commission 1k Winners"}
          </button>
          <br />
          <hr />
        </div>
      </div>
    </Layout>
  );
};

export default Index;