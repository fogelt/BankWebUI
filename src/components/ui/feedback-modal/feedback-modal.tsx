import { StandardContainer } from '@/components/ui';
import { Check, TriangleAlert } from 'lucide-react';
import { AutoDismiss } from '@/components/animations';

interface FeedbackModalProps {
  isOpen: boolean;
  message: string;
  type: 'success' | 'error';
}

const TYPE_CONFIG = {
  success: {
    Icon: Check,
    iconColor: 'text-green-600',
    bgColor: 'bg-green-100',
    textColor: 'text-green-900',
  },
  error: {
    Icon: TriangleAlert,
    iconColor: 'text-red-600',
    bgColor: 'bg-red-100',
    textColor: 'text-red-900',
  },
};

export function FeedbackModal({ isOpen, message, type }: FeedbackModalProps) {
  if (!isOpen) return null;

  const { Icon, iconColor, bgColor, textColor } = TYPE_CONFIG[type];

  return (
    <div className="fixed inset-bottom-full flex justify-center z-50 pointer-events-none">
      <AutoDismiss delay={1000}>
        <div className="mt-20 w-full max-w-md p-4 pointer-events-auto animate-in slide-in-from-bottom duration-500">
          <StandardContainer>
            <div className="flex flex-col items-center text-center space-y-4 p-2">
              <Icon className={iconColor} size={48} />
              <div className={`py-2 px-4 rounded-lg ${bgColor}`}>
                <p className={`font-medium ${textColor}`}>{message}</p>
              </div>
            </div>
          </StandardContainer>
        </div>
      </AutoDismiss>
    </div>
  );
}