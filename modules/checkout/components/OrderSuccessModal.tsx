import React from 'react';
import { CheckCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/core/components/ui/button';
import { useRouter } from 'next/navigation';
import { Modal } from '@/core/components/shared/Modal';

interface OrderSuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ isOpen, onClose }) => {
    const router = useRouter();

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            maxWidth="max-w-md"
            className="h-auto lg:h-auto rounded-xl md:rounded-2xl"
        >
            <div className="p-6 md:p-8 text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                    <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-emerald-600" />
                </div>

                <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-1.5 md:mb-2">Order Placed Successfully!</h2>
                <p className="text-xs md:text-sm text-gray-500 mb-6 md:mb-8">
                    Thank you for your purchase. Your order has been received and is being processed.
                </p>

                <div className="space-y-2.5 md:space-y-3">
                    <Button
                        onClick={() => router.push('/orders')}
                        className="w-full h-10 md:h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm md:text-base shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        <ShoppingBag className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                        See Order
                    </Button>

                    <Button
                        variant="outline"
                        onClick={() => {
                            onClose();
                            router.push('/');
                        }}
                        className="w-full h-10 md:h-12 border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 font-bold text-sm md:text-base transition-all duration-300"
                    >
                        Continue Shopping
                        <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
