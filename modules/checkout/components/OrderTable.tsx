import React from 'react';
import { Eye } from 'lucide-react';
import { CartItem } from '@/modules/home/types';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/core/components/ui/table";
import { Button } from '@/core/components/ui/button';

interface OrderTableProps {
    items: CartItem[];
}

export const OrderTable: React.FC<OrderTableProps> = ({ items }) => {
    const subTotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const deliveryFee = 10.00;
    const discount = 0.00;
    const total = subTotal + deliveryFee - discount;

    return (
        <div className="bg-white rounded-lg md:rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300">
            <div className="bg-gray-50/80 px-4 py-3 md:px-6 md:py-4 border-b border-gray-100">
                <h2 className="text-sm md:text-lg font-bold text-gray-900">Your Orders</h2>
                <div className="w-10 md:w-12 h-0.5 md:h-1 bg-emerald-600 mt-1.5 md:mt-2"></div>
            </div>
            <div className="overflow-x-auto">
                <Table className="min-w-[800px]">
                    <TableHeader className="bg-emerald-600">
                        <TableRow className="hover:bg-emerald-600 border-none">
                            <TableHead className="py-3 md:py-4 px-4 md:px-6 text-center w-20 text-white uppercase text-[10px] md:text-xs font-bold tracking-wider">Serial</TableHead>
                            <TableHead className="py-3 md:py-4 px-4 md:px-6 text-center text-white uppercase text-[10px] md:text-xs font-bold tracking-wider">Product</TableHead>
                            <TableHead className="py-3 md:py-4 px-4 md:px-6 text-left text-white uppercase text-[10px] md:text-xs font-bold tracking-wider">Name</TableHead>
                            <TableHead className="py-3 md:py-4 px-4 md:px-6 text-center text-white uppercase text-[10px] md:text-xs font-bold tracking-wider">Price</TableHead>
                            <TableHead className="py-3 md:py-4 px-4 md:px-6 text-center text-white uppercase text-[10px] md:text-xs font-bold tracking-wider">Brand</TableHead>
                            <TableHead className="py-3 md:py-4 px-4 md:px-6 text-center text-white uppercase text-[10px] md:text-xs font-bold tracking-wider">Quantity</TableHead>
                            <TableHead className="py-3 md:py-4 px-4 md:px-6 text-center text-white uppercase text-[10px] md:text-xs font-bold tracking-wider">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-gray-100">
                        {items.map((item, idx) => (
                            <TableRow key={item.id} className="hover:bg-gray-50 transition-colors">
                                <TableCell className="py-3 md:py-4 px-4 md:px-6 text-center font-medium text-gray-600 text-xs md:text-sm">
                                    {String(idx + 1).padStart(2, '0')}
                                </TableCell>
                                <TableCell className="py-3 md:py-4 px-4 md:px-6 flex justify-center">
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-50 rounded-md overflow-hidden p-1.5 md:p-2 border border-gray-100">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-contain mix-blend-multiply"
                                        />
                                    </div>
                                </TableCell>
                                <TableCell className="py-3 md:py-4 px-4 md:px-6">
                                    <span className="font-semibold text-gray-900 text-xs md:text-sm line-clamp-1">{item.name}</span>
                                </TableCell>
                                <TableCell className="py-3 md:py-4 px-4 md:px-6 text-center">
                                    <span className="text-gray-900 font-medium text-xs md:text-sm">
                                        ${item.price.toFixed(2)}
                                        <span className="text-[10px] md:text-xs text-gray-400 font-normal">/unit</span>
                                    </span>
                                </TableCell>
                                <TableCell className="py-3 md:py-4 px-4 md:px-6 text-center">
                                    <span className="text-[10px] md:text-xs font-bold text-gray-600 uppercase tracking-wider bg-gray-100 px-1.5 md:px-2 py-0.5 md:py-1 rounded">
                                        Greeny
                                    </span>
                                </TableCell>
                                <TableCell className="py-3 md:py-4 px-4 md:px-6 text-center">
                                    <span className="text-gray-900 font-semibold text-xs md:text-sm">{item.quantity}</span>
                                </TableCell>
                                <TableCell className="py-3 md:py-4 px-4 md:px-6 text-center">
                                    <div className="flex items-center justify-center space-x-2">
                                        <Button
                                            variant="ghost"
                                            className="w-7 h-7 md:w-8 md:h-8 p-0 rounded bg-gray-100 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors"
                                            onClick={() => { }}
                                        >
                                            <Eye size={18} className="md:w-6 md:h-6" />
                                        </Button>

                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Summary Section */}
            <div className="p-4 md:p-8 border-t border-gray-100 flex justify-center">
                <div className="w-full max-w-md">
                    <div className="space-y-3 md:space-y-4">
                        <div className="flex justify-between items-center text-xs md:text-sm">
                            <span className="font-medium text-gray-500">Sub Total</span>
                            <span className="font-bold text-gray-900">${subTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs md:text-sm">
                            <span className="font-medium text-gray-500">Delivery Fee</span>
                            <span className="font-bold text-gray-900">${deliveryFee.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs md:text-sm">
                            <span className="font-medium text-gray-500">Discount</span>
                            <span className="font-bold text-gray-900">${discount.toFixed(2)}</span>
                        </div>
                        <div className="border-t border-gray-200 pt-3 md:pt-4 flex justify-between items-center text-sm md:text-base">
                            <span className="font-bold text-emerald-700">Total <span className="text-[10px] md:text-xs font-normal text-gray-400">(Incl. VAT)</span></span>
                            <span className="font-bold text-emerald-700">${total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
