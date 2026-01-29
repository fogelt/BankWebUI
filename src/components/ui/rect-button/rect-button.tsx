import { ReactNode } from 'react';

interface RectButtonProps {
  icon?: ReactNode;
  label?: string;
  className?: string;
  onPress?: () => void;
  isTextButton?: boolean;
  type?: "button" | "submit";
}

export function RectButton({ icon, label, className = "", onPress, isTextButton, type = 'submit' }: RectButtonProps) {
  const standardStyles = "px-6 py-2.5 rounded-lg shadow-lg border border-gray-300 bg-gray-100 hover:scale-[1.05] active:scale-[0.95] focus:scale-[0.95]";
  const textButtonStyles = "bg-transparent text-sm text-gray-400 border-none shadow-none hover:text-gray-600 hover:scale-[1.05]";

  return (
    <div className={`${className}`}>
      <button
        type={type}
        onClick={onPress}
        className={`
          flex items-center justify-center gap-2 font-semibold transition-all duration-200 uppercase tracking-[0.2em]
          ${isTextButton ? textButtonStyles : `${standardStyles} text-stone-600`}`}>
        {icon && <span className="text-xl">{icon}</span>}
        {label && <span>{label}</span>}
      </button>
    </div>
  );
}