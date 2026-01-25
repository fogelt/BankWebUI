import { useRegister } from "@/services";
import { StandardContainer, TextInput, RectButton, FeedbackModal } from "@/components/ui";
import { CornerDownLeft } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export function RegisterLayout() {
  const {
    username, setUsername,
    password, setPassword,
    error, setError,
    success, setSuccess,
    handleRegister
  } = useRegister();

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleRegister();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="relative w-full max-w-md animate-in fade-in slide-in-from-bottom-20 duration-1000">

        <StandardContainer title="Register new user">
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextInput label="Username" value={username} onChange={setUsername} />
            <TextInput label="Password" type="password" value={password} onChange={setPassword} />
            <div className="flex justify-center pt-2 gap-4">
              <RectButton label="Register" />
            </div>
          </form>
        </StandardContainer>

        <RectButton
          className="absolute bottom-8 left-8"
          icon={<CornerDownLeft size={20} />}
          onPress={() => navigate('/login')}
        />

        <FeedbackModal
          isOpen={!!error}
          type="error"
          message={error}
          onClose={() => setError("")}
        />

        <FeedbackModal
          isOpen={!!success}
          type="success"
          message={success}
          onClose={() => setSuccess("")}
        />

      </div>
    </div>
  );
}