import { StandardContainer, RectButton } from '@/components/ui';
import { X, Check, TriangleAlert } from 'lucide-react';
import { createPortal } from 'react-dom';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  type: 'success' | 'error';
}

export function FeedbackModal({ isOpen, onClose, title, message, type }: FeedbackModalProps) {
  if (!isOpen) return null;

  const isSuccess = type === 'success';

  return createPortal(
    < div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm" >
      <div className="relative w-full max-w-md animate-in fade-in zoom-in duration-200">

        <RectButton
          onPress={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 z-10 p-0 w-1"
          icon={<X size={20} />} />
        <StandardContainer
          title={title || (isSuccess ? "Success" : "Error")}
          className="p-0"
        >
          <div className="flex flex-col items-center text-center space-y-4">

            {isSuccess ? (
              <Check className="text-green-600" size={48} />
            ) : (
              <TriangleAlert className="text-red-600" size={48} />
            )}
            <div className={`py-1 px-3 rounded-lg ${isSuccess ? 'bg-green-100' : 'bg-red-100'}`}>
              <p className={`${isSuccess ? 'text-green-900' : 'text-red-900'}`}>
                {message}
              </p>
            </div>

            <RectButton
              label='Close'
              onPress={onClose}
            />
          </div>
        </StandardContainer>
      </div>
    </div>,
    document.body
  );
}