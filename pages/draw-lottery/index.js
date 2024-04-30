import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { getActiveLotteries } from "@/source/services/api/methods/lottery";
import Layout from "@/components/Layout";
import { LOTTERY_CONTRACT_ABI } from "../../components/constants/lotteryabi";
// import { useReadContract, useWriteContract } from "wagmi";
import { useAccount, useDisconnect, useSwitchChain } from "wagmi";
import {
  readContract,
  writeContract,
  waitForTransactionReceipt,
} from "@wagmi/core";
import { lotteryconfig } from "../_app";

const style = {
  backgroundColor: "skyblue",
  color: "black",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  boxShadow: "0 5px #666",
  bottom: "20px",
  right: "20px",
};

const Index = () => {
  const [lotteries, setLotteries] = useState([]);
  const [loading, setLoading] = useState({});
  const { isConnected, chainId, address } = useAccount();

  useEffect(() => {
    getLottery();
  }, []);
  const getLottery = async () => {
    const res = await axios.get(
      "https://lottaverse.mainulhasan05.xyz/api/activelotteries"
    );
    setLotteries(res.data?.data);
  };

  const submitdrawLottery = useCallback(async (lotteryid) => {
    try {
      setLoading((prevStates) => ({
        ...prevStates,
        [lotteryid]: true,
      }));
      const requestid = Number(lotteryid);
      const hash = await writeContract(lotteryconfig, {
        abi: LOTTERY_CONTRACT_ABI,
        address: "0x16e380bd39eef11eac96c965c652fb2ee0161cfa",
        functionName: "DrawLotteryWinner",
        args: [Number(lotteryid), 0, requestid],
      });
      const transactionstatus = await waitForTransactionReceipt(lotteryconfig, {
        hash,
      });
      console.log(transactionstatus);
      if (transactionstatus?.status === "success") {
        alert("Lottery drawn successfully");
      } else {
        alert("Transection rejected");
      }
    } catch (error) {
      alert(error?.message?.split(".")[0]);
    } finally {
      setLoading((prevStates) => ({
        ...prevStates,
        [lotteryid]: false,
      }));
    }
  }, []);

  const DrawLottery = async (lotteryid) => {
    // ******************Draw lottery Smart Contract function params**********/
    // uint256 _lotteryId,
    // uint256 _randomNumber,
    // uint256 requestId
    submitdrawLottery(lotteryid);
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    console.log("button pressed", id);
    if (isConnected) {
      await DrawLottery(id);
    } else {
      alert("Wallet is not connected");
    }
  };
  return (
    <div>
      <Layout>
        <h1>Draw Lottery</h1>
        <div className="row">
          {lotteries.map((lottery) => (
            <div key={lottery.lotteryID} className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={(e) => handleSubmit(e, lottery.lotteryID)}>
                    <h5 className="card-title">{lottery?.lotteryID}</h5>
                    <p className="card-text">LotteryId: {lottery?.lotteryID}</p>
                    <p className="card-text">
                      Ticket Price: {lottery?.ticketPrice}
                    </p>
                    <p className="card-text">
                      Lottery Type: {lottery?.lotteryType}
                    </p>
                    <p className="card-text">
                      Max Tickets: {lottery?.maxTickets}
                    </p>
                    <p className="card-text">
                      Operator Commission Percentage:{" "}
                      {lottery?.operatorCommissionPercentage}
                    </p>
                    <p className="card-text">
                      Expiration: {lottery?.expiration}
                    </p>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={style}
                      disabled={loading[lottery.lotteryID]}>
                      {loading[lottery.lotteryID] ? "Loading..." : "Draw"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Layout>
    </div>
  );
};

export default Index;