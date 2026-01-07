'use client';

import React, { useEffect } from 'react';
import { MapPin, Phone, User, Loader2 } from 'lucide-react';
import { useAddresses } from '../hooks/useAddress';

interface AddressListProps {
    onSelect: (addressId: string) => void;
    selectedAddressId: string | null;
}

export const AddressList: React.FC<AddressListProps> = ({ onSelect, selectedAddressId }) => {
    const { data: addresses, isLoading, error, refetch } = useAddresses();

    useEffect(() => {
        if (addresses && addresses.length > 0 && !selectedAddressId) {
            onSelect(addresses[0]._id);
        }
    }, [addresses, selectedAddressId, onSelect]);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-gray-500">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mb-4" />
                <p className="text-sm font-medium">Loading your addresses...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 text-center bg-red-50 rounded-lg border border-red-100">
                <p className="text-red-600 text-sm font-medium">Failed to fetch addresses</p>
                <button
                    onClick={() => refetch()}
                    className="mt-4 text-emerald-600 text-sm font-semibold hover:underline"
                >
                    Try Again
                </button>
            </div>
        );
    }

    if (!addresses || addresses.length === 0) {
        return (
            <div className="p-12 text-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-500 text-sm">No shipping addresses found.</p>
                <p className="text-gray-400 text-xs mt-1">Add a new address to proceed with checkout.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 p-4 md:p-6">
            {addresses.map((address) => (
                <div
                    key={address._id}
                    onClick={() => onSelect(address._id)}
                    className={`
                        relative p-3 md:p-4 rounded-lg border-2 cursor-pointer transition-all
                        ${selectedAddressId === address._id
                            ? 'border-emerald-600 bg-emerald-50/50'
                            : 'border-gray-200 hover:border-emerald-300 bg-gray-50'
                        }
                    `}
                >
                    <div className="flex justify-end items-start mb-2 md:mb-3">
                        {selectedAddressId === address._id && (
                            <div className="h-4 w-4 rounded-full bg-emerald-600 flex items-center justify-center">
                                <div className="h-2 w-2 rounded-full bg-white"></div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-gray-600">
                        <div className="flex items-center gap-1.5 md:gap-2">
                            <User size={12} className="text-gray-400 md:w-3.5 md:h-3.5" />
                            <span className="font-semibold text-gray-900 text-[11px] md:text-sm">
                                {address.first_name} {address.last_name}
                            </span>
                        </div>
                        <div className="flex items-start gap-1.5 md:gap-2">
                            <MapPin size={12} className="text-gray-400 mt-0.5 md:w-3.5 md:h-3.5" />
                            <span className="line-clamp-2 text-[11px] md:text-sm">
                                {address.address}, {address.city}, {address.state}, {address.postal_code}, {address.country}
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5 md:gap-2">
                            <Phone size={12} className="text-gray-400 md:w-3.5 md:h-3.5" />
                            <span className="text-[11px] md:text-sm">{address.phone_number}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
