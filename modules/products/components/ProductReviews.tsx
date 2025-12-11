'use client';

import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { Product } from '@/modules/home/types';
import { RatingStars } from '@/core/components/ui/rating-stars';
import { Button } from '@/core/components/ui/button';
import { Card } from '@/core/components/ui/card';
import { Textarea } from '@/core/components/ui/Textarea';

interface ProductReviewsProps {
    product: Product;
}

export const ProductReviews: React.FC<ProductReviewsProps> = ({ product }) => {
    const [selectedRating, setSelectedRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Review submitted:', { rating: selectedRating, description });
        // Reset form
        setDescription('');
        setSelectedRating(0);
    };

    return (
        <div className="animate-fade-in">
            {/* Reviews Header */}
            <div className="mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                    Customer Reviews
                </h3>
                <div className="flex items-center gap-4">
                    <RatingStars
                        rating={product.rating}
                        reviewCount={product.reviewCount}
                        starSize="lg"
                        showReviewLabel={true}
                    />
                </div>
            </div>

            {/* Existing Reviews */}
            <div className="space-y-6 mb-8">
                {/* Review 1 */}
                <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-start justify-between mb-2">
                        <div>
                            <h4 className="font-semibold text-gray-800">John Doe</h4>
                            <RatingStars
                                rating={5}
                                showReviewCount={false}
                                starSize="sm"
                                className="mt-1"
                            />
                        </div>
                        <span className="text-sm text-gray-500">2 days ago</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Excellent product! Fresh and high quality. Will definitely buy again.
                    </p>
                </div>

                {/* Review 2 */}
                <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-start justify-between mb-2">
                        <div>
                            <h4 className="font-semibold text-gray-800">Jane Smith</h4>
                            <RatingStars
                                rating={4}
                                showReviewCount={false}
                                starSize="sm"
                                className="mt-1"
                            />
                        </div>
                        <span className="text-sm text-gray-500">1 week ago</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Good quality product. Delivery was fast and packaging was secure.
                    </p>
                </div>

                {/* Review 3 */}
                <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-start justify-between mb-2">
                        <div>
                            <h4 className="font-semibold text-gray-800">Mike Johnson</h4>
                            <RatingStars
                                rating={5}
                                showReviewCount={false}
                                starSize="sm"
                                className="mt-1"
                            />
                        </div>
                        <span className="text-sm text-gray-500">2 weeks ago</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Highly recommend! Exactly as described and very fresh.
                    </p>
                </div>
            </div>

            {/* Add Your Review Section */}
            <Card className="border-2 border-gray-200">
                <div className="p-4 md:p-8">
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-6">
                        Add Your Review
                    </h3>

                    <form onSubmit={handleSubmit}>
                        {/* Rating Stars */}
                        <div className="flex justify-center mb-6">
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setSelectedRating(star)}
                                        onMouseEnter={() => setHoveredRating(star)}
                                        onMouseLeave={() => setHoveredRating(0)}
                                        className="focus:outline-none transition-transform hover:scale-110"
                                    >
                                        <span
                                            className={`text-4xl ${star <= (hoveredRating || selectedRating)
                                                ? 'text-[#ffab10]'
                                                : 'text-gray-300'
                                                }`}
                                        >
                                            ★
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-6">
                            <Textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Give your feedback"
                                rows={5}
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full uppercase font-bold tracking-wide py-6 text-base"
                        >
                            <MessageSquare className="w-5 h-5" />
                            Drop Your Review
                        </Button>
                    </form>
                </div>
            </Card>

            {/* No reviews message (for products with 0 reviews) */}
            {(!product.reviewCount || product.reviewCount === 0) && (
                <div className="text-center py-8 border-b border-gray-200 mb-8">
                    <MessageSquare className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
                </div>
            )}
        </div>
    );
};

export default ProductReviews;
