import { useTransfer } from "@/services";
import { StandardContainer, TextInput, RectButton, FeedbackModal } from "@/components/ui";
import { SendHorizonal, Loader2 } from "lucide-react";

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

  const handleSubmit = (e: React.FormEvent) => {
    handleTransfer(e, onTransferSuccess);
  };

  return (
    <StandardContainer title="Money Transfer" className={`${className}`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <TextInput
          label="Receiver Username"
          value={receiver}
          onChange={setReceiver}
        />
        <FeedbackModal
          isOpen={!!success}
          onClose={() => setSuccess("")}
          type="success"
          message={success}
        />

        <FeedbackModal
          isOpen={!!error}
          onClose={() => setError("")}
          type="error"
          message={error}
        />

        <TextInput
          label="Amount"
          value={amount}
          onChange={setAmount}
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