import { useLogin } from "@/services";
import { StandardContainer, TextInput, RectButton, FeedbackModal } from "@/components/ui";
import { useNavigate } from 'react-router-dom';

export function LoginLayout() {
  const { username, setUsername, password, setPassword, error, handleLogin, setError } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

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
              isTextButton={true}
            />
          </div>
        </StandardContainer>
        <FeedbackModal
          isOpen={!!error}
          type={error.includes("Too many requests") ? "timedOut" : "error"}
          message={error}
          onClose={() => setError("")}
        />
      </div>
    </div>
  );
}