import { useDashboard } from "@/services";
import { RectButton, StandardContainer, TransferContainer } from "@/components/ui"
import { useNavigate } from "react-router-dom";

export function DashboardLayout() {
  const { userData, loading, refresh } = useDashboard();
  const navigate = useNavigate();

  if (loading || !userData) return null;

  return (
    <div className="grid grid-rows-4 gap-10 grid-cols-1 h-full p-32 pt-20 md:grid-cols-2 animate-in fade-in slide-in-from-bottom-20 duration-1000">

      <div className="md:col-span-2 row-span-2">
        <StandardContainer title={`Welcome back, ${userData.username}`} className="h-full flex max-h-40">
          <div className="flex justify-between items-start">
            <div className="text-left">
              <p className="text-sm text-gray-500 uppercase tracking-widest">Available Balance</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">${userData.balance.toFixed(2)}</p>
            </div>

            <RectButton
              className="mt-6"
              label="Log out"
              onPress={() => {
                sessionStorage.clear();
                navigate('/login');
              }}
            />
          </div>
        </StandardContainer>
      </div>

      <div className="row-span-2 md:row-span-2">
        <StandardContainer
          title="Transaction History"
          className="flex flex-col max-h-72 overflow-auto">
          <ul className="flex-1 min-h-0 overflow-y-auto pr-2 divide-y divide-gray-200">
            {userData.history.map((log: string, index: number) => (
              <li key={index} className="py-2 text-gray-600 text-xs">
                {log}
              </li>
            ))}
          </ul>
        </StandardContainer>
      </div>

      <div className="row-span-2 md:row-span-2">
        <TransferContainer onTransferSuccess={refresh} className="h-full flex" />
      </div>

    </div>
  );
}