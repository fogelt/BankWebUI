import { useLogin } from "@/services";
import { StandardContainer, TextInput, RectButton } from "@/components/ui";

export function LoginLayout() {
  const { username, setUsername, password, setPassword, loading, error, handleLogin } = useLogin();

  return (
    <div className="min-h-screen flex justify-center">
      <StandardContainer
        className="w-full"
        title="Bank Login">
        <div className="space-y-4">
          <TextInput label="Username" value={username} onChange={setUsername} />
          <TextInput label="Password" type="password" value={password} onChange={setPassword} />

          {error && <p className="text-red-500 text-xs text-center">{error}</p>}

          <div className="flex justify-center">
            <RectButton
              label={loading ? "Verifying..." : "Log in"}
              onPress={handleLogin}
            />
          </div>
        </div>
      </StandardContainer>
    </div>
  );
}