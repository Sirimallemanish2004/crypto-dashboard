import { useEffect, useState } from "react";

export const useLivePrice = (asset: string | null) => {
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    if (!asset) return;

    const pairMap: Record<string, string> = {
      bitcoin: "btcusdt",
      ethereum: "ethusdt",
      solana: "solusdt",
    };

    const pair = pairMap[asset];
    if (!pair) return;

    const socket = new WebSocket(
      `wss://stream.binance.com:9443/ws/${pair}@trade`
    );

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setPrice(parseFloat(data.p));
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      socket.close();
    };
  }, [asset]);

  return price;
};
