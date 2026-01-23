import { useLogin } from "@/services";
import { StandardContainer, TextInput, RectButton } from "@/components/ui";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Rect } from "@dnd-kit/core/dist/utilities";

export function LoginLayout() {
  const { username, setUsername, password, setPassword, error, handleLogin, setError } = useLogin();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
      setShowError(true);
      const fadeOutTimer = setTimeout(() => { setShowError(false); }, 1000);
      const clearTimer = setTimeout(() => { setError(""); }, 1300);

      return () => {
        clearTimeout(fadeOutTimer);
        clearTimeout(clearTimer);
      };
    }
  }, [error, setError]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="relative w-full max-w-md animate-in fade-in slide-in-from-bottom-20 duration-1000">
        <StandardContainer title="Bank Login">
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextInput label="Username" value={username} onChange={setUsername} />
            <TextInput label="Password" type="password" value={password} onChange={setPassword} />
            <div className="flex justify-center pt-2">
              <RectButton label="Log in" />
            </div>
          </form>
          <div className="flex justify-center border-t border-gray-100 pt-4">
            <RectButton
              label="Create new account"
              onPress={() => navigate("/register")}
              className="bg-transparent text-sm text-gray-400 border-none shadow-none hover:text-gray-600"
            />
          </div>
        </StandardContainer>
        <div className={`
        absolute -bottom-16 left-0 right-0 transition-all duration-300 ease-in-out
        ${showError ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"}`}>
          <StandardContainer className="py-1">
            <p className="text-red-400 text-xs font-bold uppercase tracking-[0.2em] text-center">
              {errorMessage}
            </p>
          </StandardContainer>
        </div>
      </div>
    </div>
  );
}