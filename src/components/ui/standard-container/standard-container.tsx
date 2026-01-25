import { ReactNode } from 'react';

interface StandardContainerProps {
  children?: ReactNode;
  title?: string;
  className?: string;
}

export function StandardContainer({ title, children, className }: StandardContainerProps) {
  return (

    <div className={`bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col overflow-hidden ${className}`}>

      {title && (
        <h2 className="text-gray-600 font-bold uppercase tracking-[0.2em] text-xl pt-5 px-5 shrink-0">
          {title}
        </h2>
      )}

      <div className="p-6 flex-1 min-h-0 flex flex-col">
        {children}
      </div>

    </div>
  );
}