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
        flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition-all duration-200
        text-stone-600 uppercase tracking-[0.2em] hover:scale-[1.05] shadow-lg border border-gray-300 bg-gray-100
        ${className}
      `}
    >
      {icon && <span className="text-xl">{icon}</span>}
      {label && <span>{label}</span>}
    </button>
  );
}