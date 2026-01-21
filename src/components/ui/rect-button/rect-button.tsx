import { ReactNode } from 'react';

interface RectButtonProps {
  icon?: ReactNode;
  label?: string;
  className?: string;
  onPress?: () => void;
}

export function RectButton({ icon, label, className = "", onPress }: RectButtonProps) {
  return (
    <button
      onClick={onPress}
      className={`
        flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition-all
        bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800
        ${className}
      `}
    >
      {icon && <span className="text-xl">{icon}</span>}
      {label && <span>{label}</span>}
    </button>
  );
}