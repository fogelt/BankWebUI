import { useState } from 'react';

const TRANSFER_API = import.meta.env.VITE_BANK_TRANSFER_API;

export function useTransfer() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTransfer = async (e: React.FormEvent, onSuccess?: () => void) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const token = sessionStorage.getItem("bank_token");

    try {
      const response = await fetch(TRANSFER_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          receiver,
          amount: parseFloat(amount)
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        setAmount("");
        setReceiver("");
        if (onSuccess) onSuccess();
      } else {
        setError(data.message || "Transfer failed.");
      }
    } catch (err) {
      setError("Could not connect to the API");
    } finally {
      setLoading(false);
    }
  };

  return {
    error, setError, success, setSuccess,
    receiver, setReceiver,
    amount, setAmount,
    loading, handleTransfer
  };
}