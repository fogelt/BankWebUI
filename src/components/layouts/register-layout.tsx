import { useRegister } from "@/services";
import { StandardContainer, TextInput, RectButton, FeedbackModal } from "@/components/ui";
import { CornerDownLeft } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function RegisterLayout() {
  const {
    username, setUsername,
    password, setPassword,
    error, setError,
    success, setSuccess,
    handleRegister, loading
  } = useRegister();
  const [invalidFields, setInvalidFields] = useState({ user: false, pass: false });

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const userEmpty = !username.trim();
    const passEmpty = !password.trim();
    if (userEmpty || passEmpty) {
      setInvalidFields({ user: userEmpty, pass: passEmpty })
      setTimeout(() => {
        setInvalidFields({ user: false, pass: false });
      }, 500);
      return
    }
    handleRegister();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="relative w-full max-w-md animate-in fade-in slide-in-from-bottom-20 duration-1000">

        <StandardContainer title="Register new user">
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextInput label="Username" value={username} onChange={setUsername} isInvalid={invalidFields.user} />
            <TextInput label="Password" type="password" value={password} onChange={setPassword} isInvalid={invalidFields.pass} />
            <div className="flex justify-center pt-2 gap-4">
              <RectButton label="Register" type='submit' />
            </div>
          </form>
        </StandardContainer>

        <RectButton
          className="absolute bottom-8 left-8"
          icon={<CornerDownLeft size={20} />}
          onPress={() => navigate('/login')}
          isTextButton={true}
        />

        <FeedbackModal
          isLoading={loading}
          isOpen={!!error}
          type={error.includes("Too many requests") ? "timedOut" : "error"}
          message={error}
          onClose={() => setError("")}
        />

        <FeedbackModal
          isLoading={loading}
          isOpen={!!success}
          type="success"
          message={success}
          onClose={() => setSuccess("")}
        />

      </div>
    </div>
  );
}