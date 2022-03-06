import { ethers } from "ethers";
import { governorAbi, tokenAbi } from "./proposals.abi";

export async function createProposal() {
    const tokenAddress = "0xffaCC069dbC675722ce18f6E1A18c174f4a7dc67";
    const governorAddress = "0x546B261394311ACbb88F1a8844F7A1Ed67269C72";

    // const token = await ethers.getContractAt("ERC20", tokenAddress);
    // const governor = await ethers.getContractAt("Governor", governorAddress);

    var provider = ethers.providers.getDefaultProvider("http://127.0.0.1:9545");

    const token = new ethers.Contract(tokenAddress, tokenAbi, provider.getSigner());
    const governor = new ethers.Contract(governorAddress, governorAbi, provider.getSigner());

    const teamAddress = "0xf262d625cca985573ec7517e807ece0f5723785f";
    const grantAmount = 1000;

    const transferCalldata = token.interface.encodeFunctionData("transfer", [teamAddress, grantAmount]);

    await governor.propose([tokenAddress], [0], [transferCalldata], "Proposal #1: Give grant to team");
}
