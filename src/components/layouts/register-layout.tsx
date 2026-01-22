import { useRegister } from "@/services";
import { StandardContainer, TextInput, RectButton } from "@/components/ui";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export function RegisterLayout() {
  const { username, setUsername, password, setPassword, error, handleRegister, setError, success, setSuccess } = useRegister();
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

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

  useEffect(() => {
    if (success) {
      setSuccessMessage(success);
      setShowSuccess(true);
      const fadeOutTimer = setTimeout(() => { setShowSuccess(false); }, 1000);
      const clearTimer = setTimeout(() => { setSuccess(""); }, 1300);
      const redirectTimer = setTimeout(() => {
        navigate("/");
      }, 1500);

      return () => {
        clearTimeout(fadeOutTimer);
        clearTimeout(clearTimer);
        clearTimeout(redirectTimer);
      };
    }
  }, [success, setSuccess, navigate]);

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

        <div className={`absolute -bottom-16 left-0 right-0 transition-all duration-300 ease-in-out
          ${showError ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"}`}>
          <StandardContainer className="py-1 border-red-200">
            <p className="text-red-400 text-xs font-bold uppercase tracking-[0.2em] text-center">
              {errorMessage}
            </p>
          </StandardContainer>
        </div>

        <div className={`absolute -bottom-16 left-0 right-0 transition-all duration-300 ease-in-out
          ${showSuccess ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"}`}>
          <StandardContainer className="py-1 border-green-200">
            <p className="text-green-500 text-xs font-bold uppercase tracking-[0.2em] text-center">
              {successMessage}
            </p>
          </StandardContainer>
        </div>

      </div>
    </div>
  );
}