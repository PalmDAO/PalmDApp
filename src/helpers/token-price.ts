import axios from "axios";

const cache: { [key: string]: number } = {};

export const getTopCoinsByMarketCap = async () => {
    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc";
    const { data } = await axios.get(url);

    console.log("top coins", data);
};

export const getTokenPrice = (symbol: string): number => {
    return Number(cache[symbol]);
};
