import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BANK_API = "http://79.72.16.110:5017/api/bank/login"

export function useLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(BANK_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem("bank_token", data.token);
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed.");
      }
    } catch (err) {
      setError("Could not connect to the API");
    } finally {
      setLoading(false);
    }
  };

  return {
    username, setUsername,
    password, setPassword,
    loading, error, setError,
    handleLogin
  };
}