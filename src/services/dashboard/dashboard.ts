import { useState, useEffect } from 'react';

const DASHBOARD_API = import.meta.env.VITE_BANK_DASHBOARD_API;

export function useDashboard() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchInfo = async () => {
    const token = sessionStorage.getItem("bank_token");

    try {
      const response = await fetch(DASHBOARD_API, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        setUserData(result.data);
      } else if (response.status === 401) {
        sessionStorage.clear();
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Dashboard error:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { fetchInfo(); }, []);

  return { userData, loading, refresh: fetchInfo };
}