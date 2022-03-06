import { ethers } from "ethers";
import { governorAbi, tokenAbi } from "./proposals.abi";

const tokenAddress = "0x518Cf5DaDc6B75d1e1657922d542B5Ff5A2Dc5Ba";
const provider = ethers.providers.getDefaultProvider("http://127.0.0.1:7545");
const governorAddress = "0x4a6D7Fd3F85fd189f90f4bB7907297cC623c0EAD";
const token = new ethers.Contract(tokenAddress, tokenAbi, provider.getSigner());
const whaleGov = new ethers.Contract(governorAddress, governorAbi, provider.getSigner());
var proposals = {};

export async function createProposal() {
    const teamAddress = "0xf262d625cca985573ec7517e807ece0f5723785f";
    const grantAmount = 1000;

    const transferCalldata = token.interface.encodeFunctionData("transfer", [teamAddress, grantAmount]);

    let proposal = await whaleGov.propose([tokenAddress], [0], [transferCalldata], "Proposal #" + crypto.randomUUID() + ": Give grant to team");
    console.log(proposal);
}
