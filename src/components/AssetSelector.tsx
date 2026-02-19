import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { setSelectedAsset } from "../features/assetSlice";

export default function AssetSelector() {
  const dispatch = useDispatch();
  const selectedAsset = useSelector(
    (state: RootState) => state.asset.selectedAsset
  );

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedAsset(e.target.value));
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Select Asset</h3>

      <select value={selectedAsset ?? ""} onChange={handleChange}>
        <option value="">Choose Asset</option>
        <option value="bitcoin">Bitcoin</option>
        <option value="ethereum">Ethereum</option>
        <option value="solana">Solana</option>
      </select>

      {selectedAsset && (
        <p style={{ marginTop: "10px" }}>
          Selected: <strong>{selectedAsset}</strong>
        </p>
      )}
    </div>
  );
}
