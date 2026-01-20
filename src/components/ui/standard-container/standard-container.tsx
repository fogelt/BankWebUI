import { ReactNode } from 'react';

interface StandardContainerProps {
  children?: ReactNode;
  title?: string;
}

export function StandardContainer({ title, children }: StandardContainerProps) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 w-full max-w-md overflow-hidden">

        {title && (
          <div className="bg-blue-600 px-6 py-4">
            <h2 className="text-white font-bold text-xl">{title}</h2>
          </div>
        )}

        <div className="p-6">
          {children}
        </div>

      </div>
    </div>
  );
}