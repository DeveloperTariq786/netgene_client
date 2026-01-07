import React from 'react';
import { Order } from '@/modules/orders/types';
import { Package, Truck, CheckCircle, XCircle, Clock } from 'lucide-react';

interface OrderCardProps {
    order: Order;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Delivered': return <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />;
            case 'Cancelled': return <XCircle className="w-4 h-4 md:w-5 md:h-5 text-red-600" />;
            case 'Shipped': return <Truck className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />;
            case 'Processing': return <Clock className="w-4 h-4 md:w-5 md:h-5 text-orange-600" />;
            default: return <Package className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Delivered': return 'text-emerald-700';
            case 'Cancelled': return 'text-red-700';
            case 'Shipped': return 'text-blue-700';
            case 'Processing': return 'text-orange-700';
            default: return 'text-gray-700';
        }
    };

    return (
        <div className="bg-white rounded-lg md:rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
            {/* Header */}
            <div className="bg-gray-50/80 px-4 py-3 md:px-6 md:py-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-4 text-xs md:text-sm">
                <div className="flex flex-wrap gap-x-6 md:gap-x-12 gap-y-1.5 md:gap-y-2 w-full md:w-auto">
                    <div>
                        <span className="block text-[10px] md:text-[11px] text-gray-500 uppercase tracking-wider font-semibold mb-0.5 md:mb-1">Order Placed</span>
                        <span className="text-gray-900 font-medium text-xs md:text-sm">{order.date}</span>
                    </div>
                    <div>
                        <span className="block text-[10px] md:text-[11px] text-gray-500 uppercase tracking-wider font-semibold mb-0.5 md:mb-1">Total</span>
                        <span className="text-gray-900 font-medium text-xs md:text-sm">${order.total.toFixed(2)}</span>
                    </div>
                    <div>
                        <span className="block text-[10px] md:text-[11px] text-gray-500 uppercase tracking-wider font-semibold mb-0.5 md:mb-1">Ship To</span>
                        <span className="text-gray-900 font-medium text-xs md:text-sm truncate max-w-[120px] md:max-w-none block">{order.shippingAddress}</span>
                    </div>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-2">
                    <span className="text-[10px] md:text-[11px] text-gray-500 uppercase tracking-wider font-semibold">Order # {order.id}</span>
                    <button className="text-blue-600 hover:text-blue-700 hover:underline font-medium text-[10px] md:text-xs transition-colors">
                        View Invoice
                    </button>
                </div>
            </div>

            {/* Body */}
            <div className="p-4 md:p-6">
                <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                    {getStatusIcon(order.status)}
                    <h3 className={`text-sm md:text-lg font-bold ${getStatusColor(order.status)}`}>
                        {order.status === 'Delivered' ? `Delivered ${order.date}` : order.status}
                    </h3>
                </div>

                <div className="space-y-4 md:space-y-6">
                    {order.items.map((item) => (
                        <div key={item.id} className="flex gap-3 md:gap-6 items-center">
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-50 rounded-md md:rounded-lg p-1.5 md:p-2 flex-shrink-0 border border-gray-100">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-contain mix-blend-multiply"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-gray-900 line-clamp-1 mb-1 md:mb-1.5 text-xs md:text-base">
                                    {item.name}
                                </h4>
                                <div className="flex items-center text-[11px] md:text-sm text-gray-500">
                                    <span className="bg-gray-100 px-1.5 py-0.5 md:px-2 rounded text-[10px] md:text-xs font-medium text-gray-600">Qty: {item.quantity}</span>
                                    <span className="mx-1.5 md:mx-2 text-gray-300">|</span>
                                    <span className="text-[11px] md:text-sm">${item.price.toFixed(2)} each</span>
                                </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                                <span className="block font-bold text-gray-900 text-xs md:text-base">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
