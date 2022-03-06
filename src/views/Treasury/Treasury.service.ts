import { ethers } from "ethers";

function truncate(str: string, n: number) {
    if (!str) {
        return "";
    }
    return str.length > n ? str.substr(0, 6) + "..." + str.substr(6, 4) : str;
}

export const getTransactions = async () => {
    let address = "0xa8047C2a86D5A188B0e15C3C10E2bc144cB272C2";

    let provider = new ethers.providers.EtherscanProvider();
    console.log("provider", provider);
    let history = await provider.getHistory(address);

    const transactions = history.map((tx: any) => {
        const dateObject = new Date(tx.timestamp * Number(1000));
        return {
            data: {
                tokenName: "ETH",
                transactionHash: truncate(tx.hash, 12),
                date: dateObject.toLocaleString(),
                amount: tx.value.toString(),
                from: truncate(tx.from, 12),
                to: truncate(tx.to, 12),
            },
        };
    });

    console.log(transactions);

    return transactions;
    // return transactions.map((transaction: any) => {
    //     const { blockNumber, from, to, value, gas, gasPrice, gasUsed, input, nonce, timeStamp, transactionIndex, transactionHash } = transaction;

    //     return {
    //         blockNumber,
    //         from,
    //         to,
    //         value,
    //         gas,
    //         gasPrice,
    //         gasUsed,
    //         input,
    //         nonce,
    //         timeStamp,
    //         transactionIndex,
    //         transactionHash,
    //         networkID,
    //     };
    // });
};
