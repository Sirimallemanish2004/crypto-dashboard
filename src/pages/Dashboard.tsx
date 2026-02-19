import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import AssetSelector from "../components/AssetSelector";
import CryptoChart from "../components/CryptoChart";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { useLivePrice } from "../hooks/useLivePrice";

export default function Dashboard() {
  const navigate = useNavigate();

  const selectedAsset = useSelector(
    (state: RootState) => state.asset.selectedAsset
  );

  const livePrice = useLivePrice(selectedAsset);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={{ color: "white" }}>CryptoApp</h2>

        <div style={{ marginTop: "30px" }}>
          <AssetSelector />
        </div>

        <button style={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={styles.main}>
        <h1 style={{ marginBottom: "20px" }}>
          {selectedAsset
            ? selectedAsset.toUpperCase()
            : "Select an Asset"}
        </h1>

        {/* Price Card */}
        {selectedAsset && (
          <div style={styles.card}>
            <h3>Live Price</h3>
            {livePrice ? (
              <h2 style={{ color: "#22c55e" }}>
                ${livePrice.toFixed(2)}
              </h2>
            ) : (
              <p>Connecting to live market...</p>
            )}
          </div>
        )}

        {/* Chart Card */}
        {selectedAsset && (
          <div style={styles.card}>
            <CryptoChart />
          </div>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    height: "100vh",
    backgroundColor: "#0f172a",
    color: "white",
  },
  sidebar: {
    width: "250px",
    backgroundColor: "#1e293b",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  main: {
    flex: 1,
    padding: "40px",
    overflowY: "auto",
  },
  card: {
    backgroundColor: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "20px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
  },
  logoutBtn: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#ef4444",
    color: "white",
    cursor: "pointer",
  },
};
