interface TransactionItemProps {
  data?: {
    history: string[];
  };
}

export function TransactionItem({ data }: TransactionItemProps) {
  return (
    <ul className="flex-1 min-h-72 overflow-y-auto space-y-3 pb-24">
      {data?.history.map((log: string, index: number) => (
        <li key={index} className={`shadow-lg bg-gray-100 p-2 text-gray-500 text-sm uppercase tracking-[0.05em] border border-gray-300 rounded-md`}>
          {log}
        </li>
      ))}
    </ul>
  );
}