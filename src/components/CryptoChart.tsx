import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { useQuery } from "@tanstack/react-query";
import { fetchHistoricalData } from "../services/api";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartDataType {
  time: string;
  price: number;
}

export default function CryptoChart() {
  const selectedAsset = useSelector(
    (state: RootState) => state.asset.selectedAsset
  );

  const { data, isLoading } = useQuery({
    queryKey: ["historicalData", selectedAsset],
    queryFn: () => fetchHistoricalData(selectedAsset!),
    enabled: !!selectedAsset,
  });

  if (!selectedAsset) return null;

  if (isLoading) return <p>Loading chart...</p>;

  if (!data) return null;

  const chartData: ChartDataType[] = data.prices.map(
    (price: [number, number]) => ({
      time: new Date(price[0]).toLocaleTimeString(),
      price: price[1],
    })
  );

  return (
    <div style={{ marginTop: "30px", height: "300px" }}>
      <h3>{selectedAsset.toUpperCase()} - 24h Chart</h3>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <XAxis dataKey="time" hide />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#4f46e5"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
