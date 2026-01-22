import { Dashboard } from "@/services";
import { RectButton, StandardContainer } from "@/components/ui"

export function DashboardLayout() {
  const { userData, loading } = Dashboard();

  if (loading) return;
  if (!userData) return;

  return (
    <div className="pt-40 animate-in fade-in slide-in-from-bottom-20 duration-1000">
      <StandardContainer
        className="w-full"
        title={`${userData.userName}'s Dashboard`}>
        <div className="text-right">
          <p className="text-sm text-gray-500">Available Balance</p>
          <p className="text-2xl tracking-[0.05em] text-gray-600">${userData.balance.toFixed(2)}</p>
        </div>
        <RectButton
          label="Log out"
          onPress={() => {
            sessionStorage.clear();
            window.location.href = "/";
          }} />
      </StandardContainer>
      <StandardContainer
        className="w-full">
        <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
        <ul className="divide-y divide-gray-200">
          {userData.history.map((log: string, index: number) => (
            <li key={index} className="py-3 text-gray-700 text-sm">
              {log}
            </li>
          ))}
        </ul>
      </StandardContainer>

    </div >
  );
}