import { ethers } from "ethers";
import { PalmContract, WhaleContract } from "../../abi";
import { getAddresses, Networks } from "../../constants";

const addresses = getAddresses(Networks.ETH);
const provider = ethers.providers.getDefaultProvider("http://127.0.0.1:9545");
const palmContract = new ethers.Contract(addresses.PALM_ADDRESS, PalmContract, provider.getSigner());
const whaleContract = new ethers.Contract(addresses.WHALE_GOVERNOR_ADDRESS, WhaleContract, provider.getSigner());

export async function createProposal() {
    const teamAddress = "0xf262d625cca985573ec7517e807ece0f5723785f";
    const grantAmount = 1000;

    const transferCalldata = palmContract.interface.encodeFunctionData("transfer", [teamAddress, grantAmount]);

    let proposal = await whaleContract.propose([addresses.PALM_ADDRESS], [0], [transferCalldata], "PID #" + crypto.randomUUID() + ": ETH 80%, HNT 10%, OHM 10%");
    console.log(proposal);
}
