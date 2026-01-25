import { useState } from 'react';

const BANK_API = import.meta.env.VITE_BANK_REGISTER_API;

export function useRegister() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async () => {

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
        setSuccess(data.message || "Registration Successful!");
      } else {
        setError(data.message || "Registration failed.");
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