import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../services/supabase";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (!error) navigate("/dashboard");
    else alert(error.message);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back 👋</h2>

        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          <button type="submit" style={styles.button}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p style={styles.footer}>
          Don’t have an account?{" "}
          <Link to="/signup" style={styles.link}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "#1e293b",
    padding: "40px 30px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
    color: "white",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "24px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  input: {
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    fontSize: "15px",
  },
  button: {
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#3b82f6",
    color: "white",
    fontWeight: "bold",
    fontSize: "15px",
    cursor: "pointer",
    transition: "0.3s",
  },
  footer: {
    marginTop: "20px",
    textAlign: "center",
    fontSize: "14px",
  },
  link: {
    color: "#3b82f6",
    fontWeight: "bold",
    textDecoration: "none",
  },
};
