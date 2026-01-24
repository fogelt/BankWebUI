import { ReactNode } from 'react';

interface StandardContainerProps {
  children?: ReactNode;
  title?: string;
  className?: string;
}

export function StandardContainer({ title, children, className }: StandardContainerProps) {
  return (
    <div className={`${className}`}>
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 w-full">

        {title && (
          <h2 className="text-gray-600 font-bold uppercase tracking-[0.2em] text-xl pt-5 px-5">{title}</h2>
        )}

        <div className="p-6">
          {children}
        </div>

      </div>
    </div >
  );
}