import { ReactNode } from 'react';

interface RectButtonProps {
  icon?: ReactNode;
  label?: string;
  isDanger?: boolean;
  onPress?: () => void;
}

export function RectButton({ icon, label, isDanger, onPress }: RectButtonProps) {
  return (
    <button
      onClick={onPress}
      className={`
        flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition-all
        ${isDanger
          ? "bg-red-600 text-white hover:bg-red-700 active:bg-red-800"
          : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
        }
        shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      {icon && <span className="text-xl">{icon}</span>}
      {label && <span>{label}</span>}
    </button>
  );
}