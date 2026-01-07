import React from 'react';
import { Order } from '@/modules/orders/types';
import { Package, Truck, CheckCircle, XCircle, Clock, Loader2, AlertCircle, ArrowRight, Check } from 'lucide-react';
import { useCancelOrder } from '../hooks/useOrders';
import { toast } from 'sonner';
import { Button } from '@/core/components/ui/button';

interface OrderCardProps {
    order: Order;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
    const { mutate: cancelOrder, isPending: isCancelling } = useCancelOrder();

    const getStatusIcon = (status: string) => {
        switch (status.toLowerCase()) {
            case 'delivered': return <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />;
            case 'cancelled': return <XCircle className="w-4 h-4 md:w-5 md:h-5 text-red-600" />;
            case 'shipping': return <Truck className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />;
            case 'confirmed': return <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-indigo-600" />;
            case 'processing': return <Clock className="w-4 h-4 md:w-5 md:h-5 text-orange-600" />;
            default: return <Package className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'delivered': return 'text-emerald-700 bg-emerald-50 border-emerald-100';
            case 'cancelled': return 'text-red-700 bg-red-50 border-red-100';
            case 'shipping': return 'text-blue-700 bg-blue-50 border-blue-100';
            case 'confirmed': return 'text-indigo-700 bg-indigo-50 border-indigo-100';
            case 'processing': return 'text-orange-700 bg-orange-50 border-orange-100';
            default: return 'text-gray-700 bg-gray-50 border-gray-100';
        }
    };

    const handleCancel = () => {
        cancelOrder(
            { orderId: order._id, currentStatus: order.order_status },
            {
                onSuccess: (data) => {
                    if (data.success) {
                        toast.success('Order cancelled successfully');
                    } else {
                        toast.error(data.message || 'Failed to cancel order');
                    }
                },
                onError: () => {
                    toast.error('Something went wrong. Please try again.');
                }
            }
        );
    };

    const canCancel = ['processing', 'confirmed', 'shipping'].includes(order.order_status.toLowerCase());

    const formattedDate = new Date(order.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const formattedAddress = `${order.shipping_address.address}, ${order.shipping_address.city}, ${order.shipping_address.state}, ${order.shipping_address.country}, ${order.shipping_address.postal_code}`;

    return (
        <div className="bg-white rounded-lg md:rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
            {/* Header */}
            <div className="bg-gray-50/80 px-4 py-3 md:px-6 md:py-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-4 text-xs md:text-sm">
                <div className="flex flex-wrap gap-x-6 md:gap-x-12 gap-y-1.5 md:gap-y-2 w-full md:w-auto">
                    <div>
                        <span className="block text-[10px] md:text-[11px] text-gray-500 uppercase tracking-wider font-semibold mb-0.5 md:mb-1">Order Placed</span>
                        <span className="text-gray-900 font-medium text-xs md:text-sm">{formattedDate}</span>
                    </div>
                    <div>
                        <span className="block text-[10px] md:text-[11px] text-gray-500 uppercase tracking-wider font-semibold mb-0.5 md:mb-1">Total</span>
                        <span className="text-gray-900 font-medium text-xs md:text-sm">${order.total_amount.toFixed(2)}</span>
                    </div>
                    <div className="max-w-[200px] md:max-w-[300px]">
                        <span className="block text-[10px] md:text-[11px] text-gray-500 uppercase tracking-wider font-semibold mb-0.5 md:mb-1">Ship To</span>
                        <span className="text-gray-900 font-medium text-[10px] md:text-[11px] leading-tight block">
                            {formattedAddress}
                        </span>
                    </div>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-2">
                    <span className="text-[10px] md:text-[11px] text-gray-500 uppercase tracking-wider font-semibold">Order # {order.order_id}</span>
                </div>
            </div>

            {/* Body */}
            <div className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    {/* Status Badge */}
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg border ${getStatusColor(order.order_status).split(' ').slice(1).join(' ')}`}>
                            {getStatusIcon(order.order_status)}
                        </div>
                        <div>
                            <span className="text-[10px] md:text-[11px] text-gray-500 uppercase tracking-wider font-bold block mb-0.5">Status</span>
                            <h3 className={`text-sm md:text-base font-bold capitalize ${getStatusColor(order.order_status).split(' ')[0]}`}>
                                {order.order_status}
                            </h3>
                        </div>
                    </div>

                    {/* Inline Dynamic Timeline */}
                    <div className="flex items-center gap-0 overflow-x-auto">
                        {(() => {
                            interface TimelineStep {
                                status: string;
                                date: string;
                                isCancelled?: boolean;
                            }

                            let timelineSteps: TimelineStep[] = [];

                            if (order.order_history && order.order_history.length > 0) {
                                timelineSteps.push({
                                    status: order.order_history[0].previous_status,
                                    date: order.createdAt
                                });
                                order.order_history.forEach(h => {
                                    timelineSteps.push({
                                        status: h.new_status,
                                        date: h.changed_at,
                                        isCancelled: h.new_status === 'cancelled'
                                    });
                                });
                            } else {
                                timelineSteps.push({
                                    status: 'processing',
                                    date: order.createdAt
                                });
                                if (order.order_status !== 'processing') {
                                    timelineSteps.push({
                                        status: order.order_status,
                                        date: order.updatedAt,
                                        isCancelled: order.order_status === 'cancelled'
                                    });
                                }
                            }

                            const isOrderCancelled = order.order_status === 'cancelled';

                            return timelineSteps.map((step, index) => {
                                const isLast = index === timelineSteps.length - 1;
                                const isCancelledStep = step.isCancelled || (isLast && isOrderCancelled && step.status === 'cancelled');

                                const circleColor = isCancelledStep
                                    ? 'bg-red-500 border-red-500'
                                    : 'bg-emerald-500 border-emerald-500';

                                const nextStep = timelineSteps[index + 1];
                                const isNextCancelled = nextStep?.isCancelled || nextStep?.status === 'cancelled';
                                const lineColor = isNextCancelled ? 'bg-red-400' : 'bg-emerald-400';

                                return (
                                    <React.Fragment key={`${step.status}-${index}`}>
                                        {/* Step Circle + Label */}
                                        <div className="flex flex-col items-center">
                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${circleColor} shadow-sm`}>
                                                {isCancelledStep ? <XCircle className="w-3 h-3 text-white" /> : <Check className="w-3 h-3 text-white stroke-[3]" />}
                                            </div>
                                            <p className={`text-[8px] font-semibold uppercase mt-1 ${isCancelledStep ? 'text-red-600' : 'text-gray-700'}`}>
                                                {step.status === 'shipping' ? 'Shipped' : step.status}
                                            </p>
                                            <p className="text-[7px] text-gray-400 font-medium">
                                                {new Date(step.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                            </p>
                                        </div>

                                        {/* Continuous Line */}
                                        {!isLast && (
                                            <div className={`w-8 h-0.5 ${lineColor} -mt-4`} />
                                        )}
                                    </React.Fragment>
                                );
                            });
                        })()}
                    </div>

                    {canCancel && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleCancel}
                            disabled={isCancelling}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 font-semibold gap-2 border border-transparent hover:border-red-100 rounded-lg group transition-all"
                        >
                            {isCancelling ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin text-red-600" />
                                    <span>Cancelling...</span>
                                </>
                            ) : (
                                <>
                                    <AlertCircle className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                                    <span>Cancel Order</span>
                                </>
                            )}
                        </Button>
                    )}
                </div>

                <div className="space-y-4 md:space-y-6">
                    {order.order_items.map((item) => (
                        <div key={item._id} className="flex gap-3 md:gap-6 items-center">
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-50 rounded-md md:rounded-lg p-1.5 md:p-2 flex-shrink-0 border border-gray-100">
                                <img
                                    src={item.product_logo}
                                    alt={item.product_name}
                                    className="w-full h-full object-contain mix-blend-multiply"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-gray-900 line-clamp-1 mb-1 md:mb-1.5 text-xs md:text-base">
                                    {item.product_name}
                                </h4>
                                <div className="flex items-center text-[11px] md:text-sm text-gray-500">
                                    <span className="bg-gray-100 px-1.5 py-0.5 md:px-2 rounded text-[10px] md:text-xs font-medium text-gray-600">Qty: {item.no_of_products}</span>
                                    <span className="mx-1.5 md:mx-2 text-gray-300">|</span>
                                    <span className="text-[11px] md:text-sm">${item.product_price.toFixed(2)}</span>
                                    <span className="mx-1.5 md:mx-2 text-gray-300">|</span>
                                    <span className="text-[11px] md:text-sm">{item.product_dimension}</span>
                                </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                                <span className="block font-bold text-gray-900 text-xs md:text-base">
                                    ${item.total_price.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </div >
    );
};
