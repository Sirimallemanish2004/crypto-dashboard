import axios from "axios";

export const fetchCryptoPrice = async (asset: string) => {
  const response = await axios.get(
    "https://api.coingecko.com/api/v3/simple/price",
    {
      params: {
        ids: asset,
        vs_currencies: "usd",
      },
    }
  );

  return response.data;
};

export const fetchHistoricalData = async (asset: string) => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${asset}/market_chart`,
    {
      params: {
        vs_currency: "usd",
        days: 1,
      },
    }
  );

  return response.data;
};
