import Layout from "@/components/Layout";
import { createLottery } from "@/source/services/api/methods/lottery";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { LOTTERY_CONTRACT_ABI } from "../../components/constants/lotteryabi";
import moment from "moment";
// import { useReadContract, useWriteContract } from "wagmi";
import { useAccount, useDisconnect, useSwitchChain } from "wagmi";
import { formatEther, parseEther } from "viem";
import {
  readContract,
  writeContract,
  waitForTransactionReceipt,
} from "@wagmi/core";
import { lotteryconfig } from "../_app";
// import { writeContract } from "@wagmi/core";

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
  // const {
  //   readcontract,
  //   isLoading,
  //   data: lotteryid,
  // } = useReadContract({
  //   abi: LOTTERY_CONTRACT_ABI,
  //   address: "0x16e380bd39eef11eac96c965c652fb2ee0161cfa",
  //   functionName: "lotteryCount",
  //   args: [],
  // });
  // const { writeContract, isSuccess, reset, isError, error, data, isPending } =
  //   useWriteContract();
  const { isConnected, chainId, address } = useAccount();

  //*******************************************************************/
  const [formData, setFormData] = useState({
    lotteryType: "",
    expiry: "",
    firstPrize: "",
    secondPrize: "",
    thirdPrize: "",
    fourthPrize: "",
    otherPrizes: "",
    maxTicketCount: "",
    ticketPrice: "",
    operatorCommissionPercentage: "",
    lotteryOperator: address,
  });

  const [loading, setLoading] = useState(false);

  // console.log("this is my address", address);
  // console.log("isConnected", isConnected);

  //*****************Read the Contract Functions OR Public Accessors */

  // const lotteryinfo = useReadContract({
  //   abi: LOTTERY_CONTRACT_ABI,
  //   address: "0x6dcd9b7253f596ae46354e85a08a67d0e88a30cf",
  //   functionName: "lottery",
  //   args: [1n],
  // });

  const submitLotteryData = useCallback(async () => {
    try {
      setLoading(true);
      const unixEpochTime = moment(formData.expiry).unix();
      const lotteryOperator = address;
      const ticket = formData.ticketPrice.toString();
      const hash = await writeContract(lotteryconfig, {
        abi: LOTTERY_CONTRACT_ABI,
        address: "0x16e380bd39eef11eac96c965c652fb2ee0161cfa",
        functionName: "createLottery",
        args: [
          lotteryOperator.toString(),
          parseEther(ticket),
          formData.maxTicketCount,
          formData.operatorCommissionPercentage,
          unixEpochTime,
        ],
      });
      const waiting = await waitForTransactionReceipt(lotteryconfig, {
        hash,
      });
      console.log(waiting);
      if (waiting?.status === "success") {
        const lotteryid = await readContract(lotteryconfig, {
          abi: LOTTERY_CONTRACT_ABI,
          address: "0x16e380bd39eef11eac96c965c652fb2ee0161cfa",
          functionName: "lotteryCount",
        });

        const res = await createLottery({
          ...formData,
          transactionHash: hash,
          lotteryID: Number(lotteryid),
        });
        if (res?.success) {
          alert(res?.message);
        }
      } else {
        alert("Transection rejected");
      }
    } catch (error) {
      alert(error?.message?.split(".")[0]);
    } finally {
      setLoading(false);
    }
  }, [address, formData]);

  // useEffect(() => {
  //   if (isSuccess) {
  //     submitLotteryData(data);
  //   }
  //   if (isError) {
  //     alert(error?.message.split(".")[0]);
  //     reset();
  //   }
  // }, [isSuccess, data, error, isError, reset, submitLotteryData]);

  // USE WRITE CONTRACT to write smart contract function
  const Lottery = async () => {
    // ******************Create lottery Smart Contract function params**********/
    //         address _lotteryOperator,
    //         uint256 _ticketPrice,
    //         uint256 _maxTickets,
    //         uint256 _operatorCommissionPercentage,
    //         uint256 _expiration,
    //         uint256 _lotteryId
    const unixEpochTime = moment(formData.expiry).unix();
    console.log("this is my address", address);

    const lotteryOperator = address;
    const ticket = formData.ticketPrice.toString();

    writeContract({
      abi: LOTTERY_CONTRACT_ABI,
      address: "0x6dcd9b7253f596ae46354e85a08a67d0e88a30cf",
      functionName: "createLottery",
      args: [
        lotteryOperator.toString(),
        parseEther(ticket),
        formData.maxTicketCount,
        formData.operatorCommissionPercentage,
        unixEpochTime,
        formData.lotteryType,
      ],
    });
  };

  // let transactionData = useWaitForTransactionReceipt({
  //   hash: txHash,
  //   confirmations: 1,
  //   onReplaced(response) {
  //     if (response?.reason === "cancelled") {
  //       alter("Transaction Failed");
  //     }
  //   },
  // });

  // useEffect(() => {
  //   if (transactionData?.status === "success") {
  //     console.log(transactionData);
  //     alert("Purchased Successfully!");
  //     setLoading(false);
  //     setTxHash(null);
  //     transactionData = "";
  //   }
  // }, [transactionData?.status]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isConnected) {
      await Lottery();
      // console.log("This is lottery ID", lotteryid);
    } else {
      alert("Wallet is not connected");
    }

    // console.log(formData);
    // createLoteery(formData);
  };

  return (
    <>
      <Layout>
        <h1>Create Lottery</h1>
        {/* create a form inside card class */}
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="lotteryType">Lottery Type</label>
                <select
                  className="form-control"
                  id="lotteryType"
                  onChange={handleChange}
                  value={formData.lotteryType}>
                  <option value="">Select</option>
                  <option value="easy">Easy</option>
                  <option value="super">Super</option>
                  <option value="superx">SuperX</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="expiry">Expiry</label>
                <input
                  type="date"
                  className="form-control"
                  id="expiry"
                  onChange={handleChange}
                  value={formData.expiry}
                />
              </div>
              <div className="form-group">
                <label htmlFor="firstPrize">First Prize</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstPrize"
                  placeholder="e.g., 3000"
                  onChange={handleChange}
                  value={formData.firstPrize}
                />
              </div>
              <div className="form-group">
                <label htmlFor="secondPrize">Second Prize ($)</label>
                <input
                  type="text"
                  className="form-control"
                  id="secondPrize"
                  placeholder="e.g., 1000"
                  onChange={handleChange}
                  value={formData.secondPrize}
                />
              </div>
              <div className="form-group">
                <label htmlFor="thirdPrize">Third Prize ($)</label>
                <input
                  type="text"
                  className="form-control"
                  id="thirdPrize"
                  placeholder="e.g., 300"
                  onChange={handleChange}
                  value={formData.thirdPrize}
                />
              </div>
              <div className="form-group">
                <label htmlFor="fourthPrize">Fourth Prize ($)</label>
                <input
                  type="text"
                  className="form-control"
                  id="fourthPrize"
                  placeholder="e.g., 100"
                  onChange={handleChange}
                  value={formData.fourthPrize}
                />
              </div>
              <div className="form-group">
                <label htmlFor="otherPrizes">
                  Other Lucky Winners Prize ($)
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="otherPrizes"
                  placeholder="Enter other lucky winners prize amount in dollars"
                  onChange={handleChange}
                  value={formData.otherPrizes}
                />
              </div>
              <div className="form-group">
                <label htmlFor="ticketPrice">Ticket Price</label>
                <input
                  type="text"
                  className="form-control"
                  id="ticketPrice"
                  placeholder="Enter Ticket Price"
                  onChange={handleChange}
                  value={formData.ticketPrice}
                />
              </div>
              <div className="form-group">
                <label htmlFor="maxTicketCount">Max Ticket Count</label>
                <input
                  type="number"
                  className="form-control"
                  id="maxTicketCount"
                  placeholder="Enter max ticket count"
                  onChange={handleChange}
                  value={formData.maxTicketCount}
                />
              </div>
              <div className="form-group">
                <label htmlFor="operatorcommissionpercentage">
                  Operator Commission Percentage
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="operatorCommissionPercentage"
                  placeholder="Enter Operator Percentage"
                  onChange={handleChange}
                  value={formData.operatorCommissionPercentage}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary mt-3"
                style={style}>
                {loading ? "loading..." : "Create Lottery"}
              </button>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Index;