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
  // const [premiumUsersAmount, setPremiumUsersAmount] = useState({});
  // const [fivePercent, setFivePercent] = useState({});
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

  const getLottery = useCallback(async () => {
    try {
      const res = await axios.get(
        "https://lottaverse.mainulhasan05.xyz/api/activelotteries"
      );
      setLotteries(res.data?.data);

      await handleSubmitDraw(res.data?.data[0].lotteryID, res.data?.data);
    } catch (error) {
      console.log("ERROR::", error);
    }
  }, []);

  useEffect(() => {
    getLottery();
  }, [getLottery]);

  useEffect(() => {
    console.log("secondWinner", secondWinner);
  }, [secondWinner]);
  const handleSubmitDraw = async (lotteryId, lotteries2) => {
    try {
      // drawlottery
      const res = await axios.get(
        `https://lottaverse.mainulhasan05.xyz/api/drawhistory/${lotteryId}`
      );
      console.log("RESPONSE::", res.data);

      // setFivePercent(res.data?.data.fivePercentOfTotalPerUser);

      setSecondWinner({
        address: res.data?.data?.drawHistory?.secondWinner?.userId?.address,
        amount: res.data?.data?.lottery?.prizes?.secondPrize  
      });

      setThirdWinner({
        address: res.data?.data?.drawHistory?.thirdWinner?.userId?.address,
        amount: res.data?.data?.lottery?.prizes?.thirdPrize
      });

      setRandom1kAddresses(res.data?.data?.drawHistory?.randomWinners);

      setAddresses(res.data?.data?.drawHistory?.leaders);

      setPremiumUsers(res.data?.data?.drawHistory?.premiumUsers);

      setRandomUsersAmount(res.data?.data?.lottery?.prizes?.otherPrizes/res.data?.data?.drawHistory?.randomWinners?.length);
      // setPremiumUsersAmount(res.data?.data.fivePercentPerPremiumUser);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        const message = error.response.data.message;
        alert(message);
      } else {
        // Handle other errors
        console.error("An error occurred:", error);
        alert("An unexpected error occurred. Please try again later.");
      }
    }
  };

  const submitthousandwinner = useCallback(async () => {
    const winner_addresses = random1kAddresses.map((addr) => {
      return addr.userId.address;
    });
    try {
      thousandWinner(
        winner_addresses,
        setLoading,
        loading,
        address,
        randomUsersAmount
      );
    } catch (error) {
      console.log(error);
    }
  }, [address, loading, random1kAddresses, randomUsersAmount]);

  const submitSenderComission = useCallback(async () => {
    // address,
    //   // comession_addresses,
    //   //   lotteryID,
    //   loading,
    //   setLoading;

    const comession_addresses = addresses.map((addr) => {
      return addr?.userId?.address;
    });

    await submitSender(
      address,
      comession_addresses,
      // lotteryID,
      loading,
      setLoading
    );
  }, [address, addresses, loading]);

  const submitPremium = useCallback(async () => {
    const premiumAddresses = premiumUsers.map((addr) => {
      return addr.userId.address;
    });

    await submitPremiumComission(
      address,
      // lotteryID,
      premiumAddresses,
      loading,
      setLoading
    );
  }, [address, loading, premiumUsers]);

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
    // console.log(random1kAddresses);
    // console.log(randomUsersAmount);
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
            {premiumUsers.map((user, index) => (
              <tr key={index}>
                <td>{user?.userId?.address}</td>
                <td>{5}%</td>
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
            {addresses.map((user, index) => (
              <tr key={index}>
                <td>{user?.userId?.address}</td>
                <td>{5}%</td>
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
              {random1kAddresses.map((user, index) => (
                <tr key={index}>
                  <td>{user?.userId?.address}</td>
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
