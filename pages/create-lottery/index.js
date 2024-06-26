import Layout from "@/components/Layout";
import { createLottery } from "@/source/services/api/methods/lottery";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { LOTTERY_REFERRAL_ABI } from "../../components/constants/lotteryreferralabi";
// import { LOTTERY_REFERRAL_ABI } from "../../components/constants/lotterytestingabi";

import moment from "moment";
// import { useReadContract, useWriteContract } from "wagmi";
import { useAccount, useDisconnect, useSwitchChain } from "wagmi";
import { formatEther, parseEther, parseUnits } from "viem";
import {
  readContract,
  writeContract,
  waitForTransactionReceipt,
} from "@wagmi/core";
import { lotteryconfig } from "../_app";
// import { writeContract } from "@wagmi/core";

const lotteryContract = process.env.NEXT_PUBLIC_LOTTERY;

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
    // fourthPrize: "",
    otherPrizes: "",
    maxTicketCount: "",
    ticketPrice: "",
    operatorCommissionPercentage: 18,
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
      const firstWinnerprize = parseUnits(formData.firstPrize.toString(), 6);
      const hash = await writeContract(lotteryconfig, {
        abi: LOTTERY_REFERRAL_ABI,
        address: lotteryContract,
        functionName: "createLottery",
        args: [
          lotteryOperator.toString(),
          firstWinnerprize,
          parseUnits(ticket.toString(), 6),
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
          abi: LOTTERY_REFERRAL_ABI,
          address: lotteryContract,
          functionName: "getLotteryId",
          args: [],
        });
        console.log("lotteryid", lotteryid);
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
    // address _lotteryOperator,
    // uint256 _ticketPrice,
    // uint256 _maxTickets,
    // uint256 _operatorCommissionPercentage,
    // uint256 _expiration
    submitLotteryData();
  };

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
                  {/* <option value="super">Super</option> */}
                  <option value="superx">SuperX</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="expiry">Expiry</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="expiry"
                  onChange={handleChange}
                  value={formData.expiry}
                />
              </div>
              <div className="form-group">
                <label htmlFor="firstPrize">First Prize ($)</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstPrize"
                  placeholder="For example, $5"
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
                  placeholder="For example, $3"
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
                  placeholder="For example, $1"
                  onChange={handleChange}
                  value={formData.thirdPrize}
                />
              </div>
              {/* <div className="form-group">
                <label htmlFor="fourthPrize">Fourth Prize ($)</label>
                <input
                  type="text"
                  className="form-control"
                  id="fourthPrize"
                  placeholder="e.g., 100"
                  onChange={handleChange}
                  value={formData.fourthPrize}
                />
              </div> */}
              <div className="form-group">
                <label htmlFor="otherPrizes">
                  Other Lucky Winners Prize ($)
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="otherPrizes"
                  placeholder="Enter prize amount for other lucky winners in $:"
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
                  placeholder="Enter ticket price in $:"
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
                  placeholder="Enter max ticket count (for example, 100, 1,000, 10,000)"
                  onChange={handleChange}
                  value={formData.maxTicketCount}
                />
              </div>
              {/* <div className="form-group">
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
              </div> */}
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
