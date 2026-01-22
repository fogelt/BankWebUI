import { useState, useEffect } from 'react';

const DISPLAY_API = import.meta.env.VITE_BANK_INFO_API;

export function useDashboard() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfo = async () => {
      const token = sessionStorage.getItem("bank_token");

      if (!token) {
        window.location.href = "/";
        return;
      }

      try {
        const response = await fetch(DISPLAY_API, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
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

    fetchInfo();
  }, []);

  // We return the data so the UI can use it
  return { userData, loading };
}