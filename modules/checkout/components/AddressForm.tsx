import React from 'react';
import { FormInput, FormSelect } from '@/core/components/forms';

interface AddressFormProps {
    onSave: () => void;
    onCancel: () => void;
}

export const AddressForm: React.FC<AddressFormProps> = ({ onSave, onCancel }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave();
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
                    />
                    <FormInput
                        label="Last Name"
                        placeholder="Doe"
                        type="text"
                    />

                    <FormInput
                        label="Email Address"
                        placeholder="example@mail.com"
                        type="email"
                    />
                    <FormInput
                        label="Phone Number"
                        placeholder="+1 234 567 890"
                        type="text"
                    />

                    <FormInput
                        label="Address"
                        placeholder="Type your address"
                        type="text"
                        containerClassName="lg:col-span-2"
                    />

                    <FormSelect
                        label="Country"
                        options={[
                            { value: 'us', label: 'United States' },
                            { value: 'uk', label: 'United Kingdom' },
                            { value: 'ca', label: 'Canada' },
                        ]}
                        placeholder="Select Country"
                    />
                    <FormSelect
                        label="City"
                        options={[
                            { value: 'ny', label: 'New York' },
                            { value: 'ldn', label: 'London' },
                            { value: 'tor', label: 'Toronto' },
                        ]}
                        placeholder="Select City"
                    />

                    <FormInput
                        label="State / Division"
                        placeholder="State"
                        type="text"
                    />
                    <FormInput
                        label="Postal Code"
                        placeholder="12345"
                        type="text"
                    />

                    <div className="lg:col-span-2 flex justify-end gap-3 md:gap-4 mt-2 md:mt-4">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 md:px-6 py-2 md:py-3 rounded-md text-gray-600 font-semibold text-xs md:text-sm hover:bg-gray-100 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 md:px-6 py-2 md:py-3 rounded-md bg-emerald-600 text-white font-semibold text-xs md:text-sm hover:bg-emerald-700 transition-colors shadow-sm"
                        >
                            Save Address
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};
