import { ethers } from "ethers";
import { governorAbi, tokenAbi } from "./proposals.abi";

const tokenAddress = "0xEC189C53D7FA727575bF48BE40039679e923BCB2";
const provider = ethers.providers.getDefaultProvider("http://127.0.0.1:9545");
const governorAddress = "0xED74b8F16502D1165F52cD1545F0484B733591f8";
const token = new ethers.Contract(tokenAddress, tokenAbi, provider.getSigner());
const whaleGov = new ethers.Contract(governorAddress, governorAbi, provider.getSigner());

export async function createProposal() {
    const teamAddress = "0xf262d625cca985573ec7517e807ece0f5723785f";
    const grantAmount = 1000;

    const transferCalldata = token.interface.encodeFunctionData("transfer", [teamAddress, grantAmount]);

    let proposal = await whaleGov.propose([tokenAddress], [0], [transferCalldata], "PID #" + crypto.randomUUID() + ": ETH 80%, HNT 10%, OHM 10%");
    console.log(proposal);
}
