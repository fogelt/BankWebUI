import { useDashboard } from "@/services";
import { RectButton, StandardContainer, TransferContainer } from "@/components/ui"
import { useNavigate } from "react-router-dom";

export function DashboardLayout() {
  const { userData, loading, refresh } = useDashboard();
  const navigate = useNavigate();

  if (loading || !userData) return null;

  return (
    <div className="grid grid-rows-4 px-48 pt-16 grid-cols-1 md:grid-cols-2 overflow-hidden animate-in fade-in slide-in-from-bottom-20 duration-1000">

      <div className="md:col-span-2 row-span-2 flex flex-col">
        <StandardContainer title={`Welcome back, ${userData.username}`} className="h-[28vh] pt-10">
          <div className="flex justify-between items-start">
            <div className="text-left">
              <p className="text-sm text-gray-500 uppercase tracking-widest">Available Balance</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">${userData.balance.toFixed(2)}</p>
            </div>

            <RectButton
              className="pt-10"
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
        <StandardContainer title="Transaction History" className="h-full overflow-hidden">
          <ul className="divide-y divide-gray-200 h-full overflow-y-auto pr-2">
            {userData.history.map((log: string, index: number) => (
              <li key={index} className="py-2 text-gray-600 text-xs">
                {log}
              </li>
            ))}
          </ul>
        </StandardContainer>
      </div>

      <div className="row-span-2 md:row-span-2">
        <TransferContainer onTransferSuccess={refresh} className="h-full" />
      </div>

    </div>
  );
}