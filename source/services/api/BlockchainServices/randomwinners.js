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

    //*****************UNCOMMENT NEEDED******************/
    // const lotteryStatus = await readContract(lotteryconfig, {
    //   abi: LOTTERY_REFERRAL_ABI,
    //   address: lotteryContract,
    //   functionName: "LotteryWinner",
    //   args: [1],
    // });
    // console.log(lotteryStatus);

    console.log("This is winner addresses", winner_addresses);
    console.log("This is winner addresses length", winner_addresses.length);

    const balance = await readContract(lotteryconfig, {
      abi: usdt,
      address: TokenContract,
      functionName: "balanceOf",
      args: [address],
    });
    console.log("balance of Admin Account", balance);

    const totalamount = randomUsersAmount * winner_addresses.length;
    // const totalamount = 10 * winner_addresses.length;
    // const totalamount = 50000000;

    if (Number(balance) >= totalamount) {
      const Approve = await writeContract(lotteryconfig, {
        abi: usdt,
        address: TokenContract,
        functionName: "approve",
        args: [Sender, BigInt(totalamount)],
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
      //   const hash = await writeContract(lotteryconfig, {
      //     abi: Sender_CONTRACT_ABI,
      //     address: Sender,
      //     functionName: "sendTokensMultipleAddresses",
      //     args: [
      //       TokenContract,
      //       [
      //         "0x3b95654cA3D98278e3be48BBA3694b0c6717dd02",
      //         "0x400A39935695ab99796f7818c98Ac13E3C35910C",
      //         "0xd916B8093A34997DA5B7E59b129784017e1C58dA",
      //         "0xD7103B12527659C083Abc2bBf1f17D849EF26af9",
      //         "0x2c85014D0A0C5732f9942302677D2fD10D1764A7",
      //         "0x712AfbF14f0F17658d5286BDF768B68cAe4B07a6",
      //         "0x47CC2bd586FabB06B0f11cC0b8ea078C116F0cfd",
      //         "0x3ff2f8e90c7D1185CC7FbB0eAA313685d04E1165",
      //         "0xD7C5420b98A704F3A9D7B48e08978945A8Bcb629",
      //         "0x07bDf25Eb1Bb8dA806cc97145dFB86417AF37a5A",
      //         "0x403773658F0bA47161977f8e5EdFcA7361D3b881",
      //         "0xAc8267506eC0639Ed428f865Ad7bf5a2d77cD267",
      //         "0xB2aE67358A54da2be9f8b37684701670fF0A8BB7",
      //         "0x374D70f8409B47aaF5C68005e02a0f6BCC1BF64a",
      //         "0xA753DFDAb5a78A47C9aD7fd3eba824eF7180982D",
      //         "0xf11b83E1F0b1b530e59185e8660DeE18e94c4D25",
      //         "0x8D783D334fc8ceBaF46A704A5E92B5ae48084caE",
      //         "0xFEBC23BB526c2C12bA8a3D837dd69D4cCa615c42",
      //         "0x3A216B0838B3A96f08C91C4777FD331114B87533",
      //         "0xE7f3092155fDB48e7a08Ab8D05fB926258756Ca6",
      //         "0x26BaDaC9143069C471Ef024eeDA8994Fb549Fd3A",
      //         "0x88BAC1140570f1e2F676567D5404213ca8d1aF0b",
      //         "0x143177891b31965B4D1f1766171A2a82cb5332D1",
      //         "0x38dbf0d0F98162e35eea2B0c7BeF04a96CA3d036",
      //         "0x38368Cd55Ec29489dC711127cC10233943279900",
      //         "0xe6a8FAFaa9e8fc36E55184a557D6Db136B766AbE",
      //         "0x5f284c0c4272b0fAcdD6eEe05Fd0e57714B05577",
      //         "0x16859b35C11A09ad28ADe93a6Ba03BeE56f0a709",
      //         "0xE3cC96703C62036153cC890c9ed7FA07Ec6B2Ae2",
      //         "0x74a134D86B90C1D58769f4Ea07a8827C0A09BC29",
      //         "0xc13DA2C16F879105050B9C6B15Af5fec39AAFeA7",
      //         "0x2087955AabAB730a4f73128FDa2B99Cf9932d51C",
      //         "0x1674177F37299A2D298945215B3755de5340f717",
      //         "0x88f713716889AA13d0e3aFD3B34239A073f866F3",
      //         "0xE73D28AD01D4675ca96DBd79Cd88c87356ACe124",
      //         "0x0ac4C38BC76849E4Bda938CFAEd3077A0969FC8C",
      //         "0xD797E0b7A10c0f673c02ccbAaEf07d33cC4aEe55",
      //         "0x56901593F9FF3DED6acbB2a7DD84db94143263F5",
      //         "0x0A9395C3677e913112C03F32C1F4d3C4136c4bC4",
      //         "0xD9E832D5bDA2F60F7F49402644F7445B106D2eD8",
      //         "0x7552344EE4795290D67197432a5E77fFd54f8Da9",
      //         "0xA96d22F285Fc90e47D7EB20b2006CD44E8C4a91B",
      //         "0x4aEA21c72Ee598bfD83cB0a754D65392aFCB68a9",
      //         "0x5A81c2041eDa224904967e6814a0Ec38F4Bce20d",
      //         "0x76d1989161ac39426EaE7003767E0da36870aFf1",
      //         "0xAF887810CF45f8EcaB35E02ec6668D6879F5D0C1",
      //         "0x5d7F95f2547ef807Bd7092daB1D0D835173523fd",
      //         "0x908cEb6614a8048c0EDD687F7cA8B13De9db4A19",
      //         "0x5B071d1Cc6b7bdE43834D8C6FD0119a2496e6E9f",
      //         "0xDbdC79A9893D531dB553F63AEee7547F1b214A39",
      //         "0x2fFf66f6cfC7fFab56046a31bF8cF440cB1DE6f6",
      //         "0xEc618Da7AA8746D3aa474c721166F4AF87C73F73",
      //         "0xBCbaaD8489a19a923f8E47B681272BA5Db10f570",
      //         "0xFFb4A59f1485de1FbBc4e9CDc1AFf624Fb1fC42E",
      //         "0xc245815280AAbD2A8c142b9B1fB331781131FCcf",
      //         "0x19Cb33A46bcf3AC225C2A1fb72Ca2B6389561748",
      //         "0xE80BA360BBddf7eaB97E3bD04Dc09972Cb0483d0",
      //         "0xACa23d328BBE7947ec1134cf03E6e9E15cE510c3",
      //         "0xcDB79B2eBa0De4d360c292F2c3A33F27336Bb3bB",
      //         "0x2C2cc7aB3f17cF522a46B319E33114BA961D5F01",
      //         "0xA9B13F858394eF183ECa4aD946572181b0141024",
      //         "0xB38138F369b42f30174a0b226f5D1386A5C06B56",
      //         "0x17b91893D54d0A1bfA898941cCdB20E0dd778213",
      //         "0x9F25BA7A14447e6215b5dc77E24B099f443F5b26",
      //         "0x750Be532fC3E36868947340273113FAD68875e05",
      //         "0xFd18F2b74b290012294016508b8dcCe20f34cFBA",
      //         "0xf40538618DC740C2290eA53d21C61C6Ce03d5784",
      //         "0xEe288C195Fa8BbeE57B91Db02575B4CBE503517e",
      //         "0x87f7EdCd9CB1B764f238B63A188138C12B150eF5",
      //         "0x43B24fDB17bb2c948313a4D0766fA9c804067788",
      //         "0xa27f240D44baB1C1fc049A5032C58e893332bb9d",
      //         "0x9b40E8e0C8eB30E011d6CF3611f64f9A97fdB381",
      //         "0x4Ed74d8d77857653EcEf9108bf5b9a64E980E226",
      //         "0x28468bD84c9f383BA4eFdee0A699704bf1028616",
      //         "0x38b74f2B93C74F35380843Dfa6912e800C58ee3d",
      //         "0x54c65dF8632d4370419e12e7ACAF7cF21f7850B1",
      //         "0x612193895558948F333A170c641e978D7a796F8e",
      //         "0x91D87C43D3b84AaFEA4571e570ad4263e4220862",
      //         "0xA11E51D5dE9F9eF4e83cd39fa425e63F120aa400",
      //         "0xD7E4126F751275448c865626D6a99a358BA8B0f3",
      //         "0x78883343a6AE6F295E165286050F05D0D8f42C08",
      //         "0x81b4F48853a91a10aFb0ad5f08FbD6aB9388d2f0",
      //         "0x1b56B400485d48D3806d06Ee8F62576Bf2472c9c",
      //         "0x472F86347a32C74Ff9D6Ac4088AFE5c94CcE899C",
      //         "0xf9B030335861778eE99eccd315ac947976194768",
      //         "0x0cb4F233a7973FFAc396c2a1ebeAF6014C4f557e",
      //         "0x4b10D62b7Dfd49F85c9c5a14D37bB3ad77c35D51",
      //         "0x607092EE32F7B26164Aa7a980AfBC4C979662290",
      //         "0x8914e6Fa1C2325773216F3252dC234047D92Fc41",
      //         "0xc801622eBe5aF91a9D2C3469B0A8BDaedbAf573C",
      //         "0xC2ACE3C65e115191Bb3932184dB54e7131A29576",
      //         "0x801861Beb9805f3e8B5D3C02B05bD483BB3a8ac3",
      //         "0xdd8dd8963774D02e7eFde0CcA96ada7B968A1919",
      //         "0xb577254c9cc698665622F220dC5316E345Db17A1",
      //         "0x235b871786c42a835C656Ed1418ea78F39400117",
      //         "0x74882e68aad4e1Bc9b5c1EdAcc26AF8f01F0dF01",
      //         "0x086CD3658cAd682E07AeedA0dE3C3CF1E9C3FC2A",
      //         "0x942de7B86eacaF6896632065fE9f4C3070e25DDE",
      //         "0xC3bFE55518fB810d22f74Fa98320Ff26637e339C",
      //         "0xE074Bcd5042735868ECa9a3524E47B2c2Fd833dE",
      //         "0x6AB42AfC936c78A436A64705432999109c439b98",
      //       ],
      //       1000000,
      //     ],
      //   });

      const hash = await writeContract(lotteryconfig, {
        abi: Sender_CONTRACT_ABI,
        address: Sender,
        functionName: "sendTokensMultipleAddresses",
        args: [TokenContract, winner_addresses, BigInt(randomUsersAmount)],
      });
      const transactionstatus = await waitForTransactionReceipt(lotteryconfig, {
        hash,
      });
      console.log(transactionstatus);
      transactionstatus?.status === "success"
        ? alert("Send Winners amount Successfully")
        : alert("Transaction rejected");
    } else {
      alert("Error: Not Enough Balance to Send rewards");
    }
  } catch (error) {
    alert(error?.message?.split(".")[0]);
  } finally {
    setLoading({ ...loading, randomComissionLoading: false });
  }
};
