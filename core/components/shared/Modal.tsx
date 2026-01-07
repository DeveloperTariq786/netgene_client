'use client';

import React from 'react';
import { X } from 'lucide-react';

import { cn } from '@/core/lib/utils/utils';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    maxWidth?: string;
    className?: string;
}

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    children,
    maxWidth = 'max-w-5xl',
    className,
}) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[200] flex items-center justify-center p-0 lg:p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
            onClick={onClose}
        >
            <div
                className={cn(
                    "relative bg-white rounded-none lg:rounded-xl shadow-2xl w-full h-full lg:h-[calc(100vh-2rem)] overflow-y-auto custom-scrollbar animate-scale-in border-0 lg:border lg:border-gray-200",
                    maxWidth,
                    className
                )}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 md:top-4 right-3 md:right-4 z-20 p-1.5 md:p-2 bg-white rounded-full shadow-md hover:bg-gray-50 hover:shadow-lg transition-all border border-gray-200"
                >
                    <X size={18} className="text-gray-600 md:w-5 md:h-5" />
                </button>

                {children}
            </div>
        </div>
    );
};

export default Modal;
