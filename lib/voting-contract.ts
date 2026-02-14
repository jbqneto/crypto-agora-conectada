export const contractAddress =
  "0x3eb66f9D30843D258411684dff71c3D108d544a4";

export const contractAbi = [
  {
    name: "totalVotings",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256" }],
  },
  {
    name: "getVoting",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "id", type: "uint256" }],
    outputs: [
      {
        components: [
          { name: "title", type: "string" },
          { name: "options", type: "string[]" },
          { name: "votes", type: "uint256[]" },
          { name: "maxDate", type: "uint256" },
        ],
        type: "tuple",
      },
    ],
  },
  {
    name: "addVoting",
    type: "function",
    stateMutability: "payable",
    inputs: [
      { name: "title", type: "string" },
      { name: "options", type: "string[]" },
      { name: "timeToVote", type: "uint256" },
    ],
    outputs: [],
  },
  {
    name: "vote",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "votingId", type: "uint256" },
      { name: "choice", type: "uint256" },
    ],
    outputs: [],
  },
];
