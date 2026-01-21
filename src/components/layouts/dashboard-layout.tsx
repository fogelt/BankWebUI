import { Dashboard } from "@/services";
import { RectButton } from "@/components/ui"

export function DashboardLayout() {
  const { userData, loading } = Dashboard();

  if (loading) return <div className="p-8 text-center">Loading Bank Data...</div>;
  if (!userData) return <div className="p-8 text-center text-red-500">Error loading data.</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <header className="mb-8 border-b pb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Welcome, {userData.userName}</h1>
        <div className="text-right">
          <p className="text-sm text-gray-500">Available Balance</p>
          <p className="text-3xl font-mono text-green-600">${userData.balance.toFixed(2)}</p>
        </div>
      </header>

      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
        <ul className="divide-y divide-gray-200">
          {userData.history.map((log: string, index: number) => (
            <li key={index} className="py-3 text-gray-700 font-mono text-sm">
              {log}
            </li>
          ))}
        </ul>
      </section>
      <RectButton
        label="Log out"
        onPress={() => {
          sessionStorage.clear();
          window.location.href = "/";
        }} />
    </div>
  );
}