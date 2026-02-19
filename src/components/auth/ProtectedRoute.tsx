import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };

    getSession();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
