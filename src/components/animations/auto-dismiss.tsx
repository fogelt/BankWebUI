import { useEffect, useState, ReactNode } from 'react';

interface AutoDismissProps {
  children: ReactNode;
  delay?: number;
  onDismiss?: () => void;
}

export function AutoDismiss({ children, delay = 1000 }: AutoDismissProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const exitTimer = setTimeout(() => setIsExiting(true), delay);
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
    }, delay + 500);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, [delay]);

  if (!isVisible) return null;

  return (
    <div
      className={
        isExiting
          ? 'animate-out fade-out slide-out-to-bottom-10 duration-500 fill-mode-forwards'
          : 'animate-in fade-in slide-in-from-bottom-10 duration-500'
      }
    >
      {children}
    </div>
  );
}