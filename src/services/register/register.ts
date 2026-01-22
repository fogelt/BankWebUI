import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BANK_API = import.meta.env.VITE_BANK_REGISTER_API;

export function useRegister() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (username.length < 4) {
      setError("Username must be at least 4 characters.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(BANK_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(data.message || "Registration Successful!");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        const errorText = await response.text();
        setError(errorText || "Registration failed.");
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
    success, setSuccess,
    handleRegister
  };
}