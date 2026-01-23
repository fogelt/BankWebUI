import { StandardContainer, RectButton } from '@/components/ui';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';
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
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 w-1"
          icon={<X size={24} />} />

        <StandardContainer
          title={title || (isSuccess ? "Success" : "Error")}
          className="p-0"
        >
          <div className="flex flex-col items-center text-center space-y-4">

            <div className={`p-3 rounded-full ${isSuccess ? 'bg-green-100' : 'bg-red-100'}`}>
              {isSuccess ? (
                <CheckCircle2 className="text-green-600" size={48} />
              ) : (
                <AlertCircle className="text-red-600" size={48} />
              )}
            </div>

            <p className="text-gray-700 text-lg">
              {message}
            </p>

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