import React, { useState } from 'react';
import { FormInput, FormSelect } from '@/core/components/forms';
import { useAddAddress } from '../hooks/useAddress';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import { AddAddressRequest } from '../types';

interface AddressFormProps {
    onSave: () => void;
    onCancel: () => void;
}

export const AddressForm: React.FC<AddressFormProps> = ({ onSave, onCancel }) => {
    const { backendUser } = useAuthStore();
    const { mutateAsync: addAddress, isPending: isLoading } = useAddAddress();
    const [formData, setFormData] = useState<AddAddressRequest>({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        address: '',
        country: '',
        state: '',
        city: '',
        postal_code: ''
    });

    const handleChange = (field: keyof AddAddressRequest, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!backendUser?._id) {
            console.error('No customer ID found');
            return;
        }

        try {
            const response = await addAddress({ customerId: backendUser._id, data: formData });
            if (response.success) {
                onSave();
            }
        } catch (error) {
            console.error('Failed to save address:', error);
        }
    };

    return (
        <div className="bg-white rounded-lg md:rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 animate-fade-in">
            <div className="bg-gray-50/80 px-4 py-3 md:px-6 md:py-4 border-b border-gray-100">
                <h3 className="text-sm md:text-lg font-bold text-gray-900">Add New Address</h3>
                <div className="w-10 md:w-12 h-0.5 md:h-1 bg-emerald-600 mt-1.5 md:mt-2"></div>
            </div>
            <form onSubmit={handleSubmit} className="p-4 md:p-6 lg:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                    <FormInput
                        label="First Name"
                        placeholder="John"
                        type="text"
                        value={formData.first_name}
                        onChange={(e) => handleChange('first_name', e.target.value)}
                        required
                    />
                    <FormInput
                        label="Last Name"
                        placeholder="Doe"
                        type="text"
                        value={formData.last_name}
                        onChange={(e) => handleChange('last_name', e.target.value)}
                        required
                    />

                    <FormInput
                        label="Email Address"
                        placeholder="example@mail.com"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        required
                    />
                    <FormInput
                        label="Phone Number"
                        placeholder="+1 234 567 890"
                        type="text"
                        value={formData.phone_number}
                        onChange={(e) => handleChange('phone_number', e.target.value)}
                        required
                    />

                    <FormInput
                        label="Address"
                        placeholder="Type your address"
                        type="text"
                        containerClassName="lg:col-span-2"
                        value={formData.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                        required
                    />

                    <FormSelect
                        label="Country"
                        options={[
                            { value: 'INDIA', label: 'India' },
                        ]}
                        placeholder="Select Country"
                        value={formData.country}
                        onChange={(e) => handleChange('country', e.target.value)}
                        required
                    />
                    <FormInput
                        label="City"
                        placeholder="Srinagar"
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleChange('city', e.target.value)}
                        required
                    />

                    <FormInput
                        label="State / Division"
                        placeholder="State"
                        type="text"
                        value={formData.state}
                        onChange={(e) => handleChange('state', e.target.value)}
                        required
                    />
                    <FormInput
                        label="Postal Code"
                        placeholder="190001"
                        type="text"
                        value={formData.postal_code}
                        onChange={(e) => handleChange('postal_code', e.target.value)}
                        required
                    />

                    <div className="lg:col-span-2 flex justify-end gap-3 md:gap-4 mt-2 md:mt-4">
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={isLoading}
                            className="px-4 md:px-6 py-2 md:py-3 rounded-md text-gray-600 font-semibold text-xs md:text-sm hover:bg-gray-100 transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-4 md:px-6 py-2 md:py-3 rounded-md bg-emerald-600 text-white font-semibold text-xs md:text-sm hover:bg-emerald-700 transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
                        >
                            {isLoading ? 'Saving...' : 'Save Address'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

