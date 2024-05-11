import Layout from "@/components/Layout";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Sender_CONTRACT_ABI } from "../../components/constants/Senderabi";
import { bep20 } from "../../components/constants/bep20abi";
import { LOTTERY_CONTRACT_ABI } from "../../components/constants/lotteryabi";

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

const Index = () => {
  const [lotteries, setLotteries] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [fivePercent, setFivePercent] = useState({});
  const [loading, setLoading] = useState(false);
  const { isConnected, chainId, address } = useAccount();
  // const {waitForTransactionReceipt,data} = useWaitForTransactionReceipt();

  const getLottery = async () => {
    const res = await axios.get(
      "https://lottaverse.mainulhasan05.xyz/api/activelotteries"
    );
    setLotteries(res.data?.data);
    handleSubmitDraw(res.data?.data[0].lotteryID);
  };
  useEffect(() => {
    getLottery();
  }, []);

  const handleSubmitDraw = async (lotteryId) => {
    // drawlottery
    const res = await axios.post(
      "https://lottaverse.mainulhasan05.xyz/api/drawlottery",
      {
        lotteryId: lotteryId,
      }
    );
    setAddresses(res.data.data.top30Users);
    setFivePercent(res.data.data.fivePercentOfTotalPerUser);
  };

  const submitSenderComission = useCallback(async () => {
    try {
      setLoading(true);
      const comession_addresses = addresses.map((addr) => {
        return addr.address;
      });
      const balance = await readContract(lotteryconfig, {
        abi: bep20,
        address: "0x1C8671B5a296DAE6DA2c11cC2F626C2B2B5c37A9",
        functionName: "balanceOf",
        args: [address],
      });
      console.log("balance of Admin Account", balance);
      // const approval_amount =  30;
      // const approval_amount = fivePercent*30;
      const amountperuser = fivePercent / 30;

      let Approve;
      let hash;
      let transactionstatus;

      Number(balance) >= fivePercent
        ? ((Approve = await writeContract(lotteryconfig, {
            abi: bep20,
            address: "0x1C8671B5a296DAE6DA2c11cC2F626C2B2B5c37A9",
            functionName: "approve",
            args: [
              "0xc0ff7eed74f5be013c4f3579be6393f9591f1ca0",
              BigInt(approval_amount),
            ],
          })),
          console.log("Approve", Approve),
          // (hash = await writeContract(lotteryconfig, {
          //   abi: Sender_CONTRACT_ABI,
          //   address: "0xc0ff7eed74f5be013c4f3579be6393f9591f1ca0",
          //   functionName: "sendTokensToMultipleAddresses",
          //   args: [
          //     "0x1c8671b5a296dae6da2c11cc2f626c2b2b5c37a9",
          //     [
          //       "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
          //       "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
          //       "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB",
          //       "0x617F2E2fD72FD9D5503197092aC168c91465E7f2",
          //       "0x17F6AD8Ef982297579C203069C1DbfFE4348c372",
          //       "0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678",
          //       "0x03C6FcED478cBbC9a4FAB34eF9f40767739D1Ff7",
          //       "0x1aE0EA34a72D944a8C7603FfB3eC30a6669E454C",
          //       "0x0A098Eda01Ce92ff4A4CCb7A4fFFb5A43EBC70DC",
          //       "0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c",
          //       "0x14723A09ACff6D2A60DcdF7aA4AFf308FDDC160C",
          //       "0x4B0897b0513fdC7C541B6d9D7E929C4e5364D2dB",
          //       "0x583031D1113aD414F02576BD6afaBfb302140225",
          //       "0xdD870fA1b7C4700F2BD7f44238821C26f7392148",
          //     ],
          //     1,
          //   ],
          // })),
          (hash = await writeContract(lotteryconfig, {
            abi: Sender_CONTRACT_ABI,
            address: "0xc0ff7eed74f5be013c4f3579be6393f9591f1ca0",
            functionName: "sendTokensToMultipleAddresses",
            args: [
              "0x1c8671b5a296dae6da2c11cc2f626c2b2b5c37a9",
              comession_addresses,
              amountperuser,
            ],
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
      alert(error?.message?.split(".")[0]);
    } finally {
      setLoading(false);
    }
  }, [address, addresses, fivePercent]);

  const sendCommission = async () => {
    // ******************Send Commission Smart Contract function params**********/
    // IERC20 token,
    // address[] recipients,
    // uint256 amount
    submitSenderComission();
  };

  const handleSendCommission = async () => {
    console.log("send commission");
    if (isConnected) {
      await sendCommission();
    } else {
      alert("Wallet is not connected");
    }
    const comession_addresses = addresses.map((addr) => {
      return addr.address;
    });
    console.log(comession_addresses);
    // console.log(comession_addresses.length);
    console.log(fivePercent);
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
        <button onClick={handleSendCommission} className="btn btn-primary">
          Send Commission
        </button>
        <br />
        <br />

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
      </div>
    </Layout>
  );
};

export default Index;
