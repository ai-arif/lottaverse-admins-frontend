export const LOTTERY_CONTRACT_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "lotteryId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "lotteryOperator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "LogTicketCommission",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "lotteryId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "lotteryWinner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "LotteryClaimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "lotteryOperator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "ticketPrice",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "maxTickets",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "operatorCommissionPercentage",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "expiration",
        type: "uint256",
      },
    ],
    name: "LotteryCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "lotteryId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "lotteryWinner",
        type: "address",
      },
    ],
    name: "LotteryWinnerDrawn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "lotteryId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "numWords",
        type: "uint32",
      },
    ],
    name: "LotteryWinnerRequestSent",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "randomWords",
        type: "uint256",
      },
    ],
    name: "RequestFulfilled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "lotteryId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "ticketsBought",
        type: "uint256",
      },
    ],
    name: "TicketsBought",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_lotteryId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_tickets",
        type: "uint256",
      },
    ],
    name: "BuyTickets",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_lotteryId",
        type: "uint256",
      },
    ],
    name: "ClaimLottery",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_lotteryOperator",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_ticketPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_maxTickets",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_operatorCommissionPercentage",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_expiration",
        type: "uint256",
      },
    ],
    name: "createLottery",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_lotteryId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_randomNumber",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
    ],
    name: "DrawLotteryWinner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_lotteryId",
        type: "uint256",
      },
    ],
    name: "getRemainingTickets",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "lottery",
    outputs: [
      {
        internalType: "address",
        name: "lotteryOperator",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "ticketPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxTickets",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "operatorCommissionPercentage",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "expiration",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "lotteryWinner",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lotteryCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_lotteryId",
        type: "uint256",
      },
    ],
    name: "LotteryWinner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "requests",
    outputs: [
      {
        internalType: "uint256",
        name: "lotteryId",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "fulfilled",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "exists",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "randomNumber",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
