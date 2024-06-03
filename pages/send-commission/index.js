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
  const [selectedLottery, setSelectedLottery] = useState([]);
  const [lotteries, setLotteries] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [showLimit, setShowLimit] = useState(1000);
  const [lotteryIdSelected, setLotteryIdSelected] = useState(null);
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
  const [getLotteryLodding, setLotteryLodding] = useState(false);
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
        "https://lottaverse.mainulhasan05.xyz/api/admin/activelotteries"
      );
      setLotteries(res.data?.data);

      // await handleSubmitDraw(res.data?.data[0].lotteryID, res.data?.data);
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
    console.log("lotteryId", lotteryId);
    try {
      
      // drawlottery
      const res = await axios.get(
        `https://lottaverse.mainulhasan05.xyz/api/drawhistory/${lotteryId}`
      );
      console.log("RESPONSE::", res.data);


      setSecondWinner({
        address: res.data?.data?.drawHistory?.secondWinner?.userId?.address,
        amount: res.data?.data?.lottery?.prizes?.secondPrize,
        commission_sent:res.data?.data?.drawHistory?.secondWinner?.commission_sent
      });

      setThirdWinner({
        address: res.data?.data?.drawHistory?.thirdWinner?.userId?.address,
        amount: res.data?.data?.lottery?.prizes?.thirdPrize,
        commission_sent:res.data?.data?.drawHistory?.thirdWinner?.commission_sent
      });

      setRandom1kAddresses(res.data?.data?.drawHistory?.randomWinners);

      setAddresses(res.data?.data?.drawHistory?.leaders);

      setPremiumUsers(res.data?.data?.drawHistory?.premiumUsers);

      setRandomUsersAmount(res.data?.data?.lottery?.prizes?.otherPrizes);
      setLotteryIdSelected(lotteryId);
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
  // /admin/send-second-winner-commission/:lotteryId
  const sendSecondWinnerCommission = async (lotteryId) => {
    try {
      const res = await axios.post(`${process.env.API}/api/admin/send-second-winner-commission/${lotteryId}`);
      console.log("RESPONSE::", res.data);
    } catch (error) {
      console.log("ERROR::", error);
    }
  };
  const sendThirdWinnerCommission = async (lotteryId) => {
    try {
      const res = await axios.post(`${process.env.API}/api/admin/send-third-winner-commission/${lotteryId}`);
      console.log("RESPONSE::", res.data);
    } catch (error) {
      console.log("ERROR::", error);
    }
  };

  const sendLeadersCommission = async (lotteryId) => {
    try {
      const res = await axios.post(`${process.env.API}/api/admin/send-leaders-commission/${lotteryId}`);
      console.log("RESPONSE::", res.data);
    } catch (error) {
      console.log("ERROR::", error);
    }
  };
  // /admin/send-random-winners-commission/
  const sendRandomWinnersCommission = async (lotteryId,addresses) => {
    try {
      const res = await axios.post(`${process.env.API}/api/admin/send-random-winners-commission/${lotteryId}`,{
        addresses
      }
      );
      console.log("RESPONSE::", res.data);
      await handleSubmitDraw(lotteryId);
    } catch (error) {
      console.log("ERROR::", error);
    }
  };

  const submitThousandWinner = useCallback(async () => {
    const winner_addresses_filter = random1kAddresses.filter((addr) => {
      if(addr?.commission_sent === false){
        return addr?.userId?.address;
      }
      else{
        return false;
      }
    });
    const winner_addresses = winner_addresses_filter.map((addr) => {
      return addr?.userId?.address;
    });
    console.log("winner_addresses", winner_addresses);
    try {
      // if the winner_addresses length is greater than 100, then make it in 10 chunks
      if (winner_addresses.length > 100) {
        const chunks = Math.ceil(winner_addresses.length / 10);
        for (let i = 0; i < chunks; i++) {
          const start = i * 100;
          const end = (i + 1) * 100;
          const chunk = winner_addresses.slice(start, end);
          
          await thousandWinner(
            chunk,
            setLoading,
            loading,
            address,
            randomUsersAmount
          );
          await sendRandomWinnersCommission(selectedLottery, chunk);
        }
      } else {
        await thousandWinner(
          winner_addresses,
          setLoading,
          loading,
          address,
          randomUsersAmount
        );
        await sendRandomWinnersCommission(selectedLottery, winner_addresses);
      }
      // await thousandWinner(
      //   winner_addresses,
      //   setLoading,
      //   loading,
      //   address,
      //   randomUsersAmount
      // );
      
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
    try {
      await submitSender(
        address,
        comession_addresses,
        selectedLottery,
        loading,
        setLoading
      );
      await sendLeadersCommission(selectedLottery);
      await handleSubmitDraw(selectedLottery);
    } catch (error) {
      console.log(error);
      
    }
  }, [address, addresses, loading, selectedLottery]);

  const submitPremium = useCallback(async () => {
    const premiumAddresses = premiumUsers.map((addr) => {
      return addr.userId.address;
    });

    await submitPremiumComission(
      address,
      selectedLottery,
      premiumAddresses,
      loading,
      setLoading
    );
  }, [address, loading, premiumUsers, selectedLottery]);

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
        if(second === "second"){
          await sendSecondWinnerCommission(selectedLottery);
          await handleSubmitDraw(selectedLottery);

        }
        if(second === "third"){
          await sendThirdWinnerCommission(selectedLottery);
          await handleSubmitDraw(selectedLottery);
        }
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
    console.log("send commission lottery ID", lotteries);
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
      await submitThousandWinner(random1kAddresses);
    } else {
      alert("Wallet is not connected");
    }
    // console.log(random1kAddresses);
    // console.log(randomUsersAmount);
  };
  const getlotterydetails = async (e) => {
    try {
      setLotteryLodding(true);
      setSelectedLottery(e.target.value);
      // console.log("selectedLottery", selectedLottery);
      console.log("Target value", e.target.value);
      await handleSubmitDraw(e.target.value);
      setLotteryLodding(false);
    } catch (error) {
      console.log(error);
      alert(error);
      setLotteryLodding(false);
    }
  };

  return (
    <Layout>
      <div className="container">
        <h1>Send Commission {lotteryIdSelected}</h1>
        {/* create a select field */}
        <select
          // defaultValue={10}
          onChange={getlotterydetails}
          className="form-select">
          <option value={""} hidden>
            select Lottery
          </option>
          {lotteries.map((lottery) => (
            <option key={lottery.ID} value={lottery.lotteryID}>
              {console.log("getID", lottery)}
             Lottery  {lottery.lotteryType} - Round {lottery.round }
            </option>
          ))}
        </select>

        <br />
        <br />
        {getLotteryLodding ? (
          <div>Loading....</div>
        ) : (
          <>
            <div className="container">
              <h2>Second Winner</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>Address</th>
                    <th>Amount</th>
                    <th>Payment Sent</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{secondWinner?.address}</td>
                    <td>{secondWinner?.amount}</td>
                    <td>{secondWinner?.commission_sent? 
                    <span className="fw-bold" style={{color:"green"}}>Yes</span>:
                    <span className="fw-bold" style={{color:"red"}}>No</span>
                    }</td>
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
                    <th>Payment Sent</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{thirdWinner?.address}</td>
                    <td>{thirdWinner?.amount}</td>
                    <td>{thirdWinner?.commission_sent? 
                    <span className="fw-bold" style={{color:"green"}}>Yes</span>:
                    <span className="fw-bold" style={{color:"red"}}>No</span>
                    }</td>
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
            {/* <div className="container">
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
                    <td>{10}%</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              onClick={handlePremiumCommission}
              className="btn btn-primary">
              {premimumComissionLoading
                ? "Loading..."
                : "Send Commission Premium Users"}
            </button>
            <br />
            <hr /> */}

            <div className="container">
              <h2>Top 30 Leaders</h2>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Address</th>
                  <th>Amount</th>
                  <th>Payment Sent</th>
                </tr>
              </thead>
              <tbody>
                {addresses.map((user, index) => (
                  <tr key={index}>
                    <td>{user?.userId?.address}</td>
                    <td>{5}%</td>
                    
                    <td>{user?.commission_sent? 
                    <span className="fw-bold" style={{color:"green"}}>Yes</span>:
                    <span className="fw-bold" style={{color:"red"}}>No</span>
                    }</td>
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
                <div className="d-flex justify-content-between">
                <h2>Random 1k Winners</h2>
                <select onChange={(e)=>{
                  setShowLimit(e.target.value);
                }} name="" id="">
                  <option value="">Show</option>
                  <option value="100">Show 100</option>
                  <option value="500">Show 500</option>
                  <option value="800">Show 800</option>

                </select>
                </div>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>Address</th>
                    <th>Amount</th>
                    <th>Payment Sent</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    random1kAddresses.slice(0,showLimit).map((user, index) => (
                      <tr key={index}>
                        <td>{user?.userId?.address}</td>
                        <td>{randomUsersAmount}</td>
                        <td>{user?.commission_sent? 
                    <span className="fw-bold" style={{color:"green"}}>Yes</span>:
                    <span className="fw-bold" style={{color:"red"}}>No</span>
                    }</td>
                      </tr>
                    ))
                  }
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
          </>
        )}
      </div>
    </Layout>
  );
};

export default Index;
