import { useTransfer } from "@/services";
import { StandardContainer, TextInput, RectButton, FeedbackModal } from "@/components/ui";
import { SendHorizonal, Loader2 } from "lucide-react";
import { useState } from "react";


interface TransferProps {
  onTransferSuccess: () => void;
  className?: string;
}

export function TransferContainer({ onTransferSuccess, className }: TransferProps) {
  const {
    error, setError,
    success, setSuccess,
    receiver, setReceiver,
    amount, setAmount,
    loading, handleTransfer } = useTransfer();
  const [invalidFields, setInvalidFields] = useState({ rec: false, amo: false });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const receiverEmpty = !receiver.trim();
    const amountEmpty = !amount.trim();

    if (receiverEmpty || amountEmpty) {
      setInvalidFields({ rec: receiverEmpty, amo: amountEmpty });
      setTimeout(() => {
        setInvalidFields({ rec: false, amo: false });
      }, 500)
      return;
    }
    handleTransfer(e, onTransferSuccess);
  };

  return (
    <StandardContainer title="Money Transfer" className={`${className}`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <TextInput
          label="Receiver Username"
          value={receiver}
          onChange={setReceiver}
          isInvalid={invalidFields.rec}
        />
        <FeedbackModal
          isLoading={loading}
          isOpen={loading || !!error}
          type="success"
          message={success}
          onClose={() => setSuccess("")}
        />

        <FeedbackModal
          isLoading={loading}
          isOpen={loading || !!error}
          type={error.includes("Too many requests") ? "timedOut" : "error"}
          message={error}
          onClose={() => setError("")}
        />

        <TextInput
          label="Amount"
          value={amount}
          onChange={setAmount}
          isInvalid={invalidFields.amo}
        />

        <RectButton
          label={loading ? "Processing..." : "Send Money"}
          icon={loading ? <Loader2 className="animate-spin" size={20} /> : <SendHorizonal size={20} />}
          className=""
        />
      </form>
    </StandardContainer>
  );
}