'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { MessageSquare, User, Star, Loader2, CheckCircle2 } from 'lucide-react';
import { DetailedProduct } from '@/modules/products/types/details';
import { RatingStars } from '@/core/components/ui/rating-stars';
import { Button } from '@/core/components/ui/button';
import { Textarea } from '@/core/components/ui/Textarea';
import { useAddReview } from '@/modules/products/hooks/useAddReview';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import LoginDialog from '@/modules/auth/components/LoginDialog';

interface ProductReviewsProps {
    product: DetailedProduct;
}

export const ProductReviews: React.FC<ProductReviewsProps> = ({ product }) => {
    const [selectedRating, setSelectedRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [description, setDescription] = useState('');
    const [showLoginDialog, setShowLoginDialog] = useState(false);

    const { user, backendUser } = useAuthStore();
    const { mutateAsync: addReview, isPending } = useAddReview();

    const reviews = product.customerReviews || [];

    // Check if the current user has already reviewed
    const hasAlreadyReviewed = useMemo(() => {
        if (!backendUser) return false;

        const currentUserName = backendUser.name.toLowerCase();

        return reviews.some((review: any) => {
            if (typeof review === 'string') {
                return false; // String reviews no longer have a reliable way to link to current user
            }
            return (review.customer_id === backendUser._id) ||
                (review.customer_name?.toLowerCase() === currentUserName);
        });
    }, [reviews, backendUser]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!backendUser) {
            setShowLoginDialog(true);
            return;
        }

        if (selectedRating === 0) {
            alert('Please select a rating before submitting.');
            return;
        }

        try {
            const result = await addReview({
                customerId: backendUser._id,
                productId: product.id,
                reviewData: {
                    ratings: selectedRating,
                    reviews: [
                        {
                            customer_id: backendUser._id,
                            customer_reviews: description
                        }
                    ]
                }
            });

            if (result.success === false) {
                alert(result.message || 'Failed to submit review');
                return;
            }

            // Reset form on success
            setDescription('');
            setSelectedRating(0);

            // Note: useAddReview hook already invalidates the product query,
            // so the reviews list will refresh automatically.
        } catch (error: any) {
            console.error('Failed to submit review:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Failed to submit review. Please try again.';
            alert(errorMessage);
        }
    };

    return (
        <div className="animate-fade-in space-y-8">
            {/* Simple Responsive Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
                <div>
                    <h3 className="text-xl font-bold text-gray-900">Customer Reviews</h3>
                </div>
                <div className="bg-emerald-50 px-4 py-2 rounded-lg flex items-center gap-3 w-fit">
                    <span className="text-xl font-bold text-emerald-700">{product.rating.toFixed(1)}</span>
                    <RatingStars
                        rating={product.rating}
                        showReviewCount={false}
                        starSize="sm"
                    />
                </div>
            </div>

            {/* Compact Review List */}
            <div className="space-y-6">
                {reviews.length > 0 ? (
                    reviews.map((review: any, index: number) => {
                        const isStringReview = typeof review === 'string';
                        const reviewText = isStringReview ? review : (review.customer_reviews || review.comment || review.description || 'No comment provided.');
                        const reviewerName = isStringReview ? 'Anonymous' : (review.customer_name || 'Anonymous');
                        const reviewDate = !isStringReview && review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'Recent';
                        const reviewRating = !isStringReview ? (review.rating || 5) : Math.round(product.rating);

                        // Try to get avatar: if it's the current user's review, use their Google photo
                        const isCurrentUser = backendUser && (
                            (!isStringReview && review.customer_id === backendUser._id) ||
                            (reviewerName.toLowerCase() === backendUser.name.toLowerCase())
                        );
                        const avatarUrl = isCurrentUser ? user?.photoURL : (!isStringReview ? review.avatar : null);

                        return (
                            <div key={review._id || index} className="flex gap-3 md:gap-4 items-start pb-6 border-b border-gray-50 last:border-0">
                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden relative">
                                    {avatarUrl ? (
                                        <Image
                                            src={avatarUrl}
                                            alt={reviewerName}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <User className="w-5 h-5 md:w-6 md:h-6 text-gray-400" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2 mb-1">
                                        <h4 className="font-semibold text-gray-900 text-sm md:text-base truncate">
                                            {reviewerName}
                                            {isCurrentUser && <span className="ml-2 text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full uppercase font-bold">You</span>}
                                        </h4>
                                        <span className="text-[10px] md:text-xs text-gray-400 whitespace-nowrap">
                                            {reviewDate}
                                        </span>
                                    </div>
                                    <div className="flex items-center mb-2">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star
                                                key={i}
                                                size={12}
                                                className={`${i < reviewRating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                        {reviewText}
                                    </p>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center py-10 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                        <MessageSquare className="w-10 h-10 mx-auto text-gray-300 mb-3" />
                        <p className="text-gray-500 text-sm px-4">No reviews yet. Be the first to share your thoughts!</p>
                        {!hasAlreadyReviewed && (
                            <button
                                onClick={() => document.getElementById('review-form')?.scrollIntoView({ behavior: 'smooth' })}
                                className="mt-3 text-emerald-600 font-bold text-sm hover:underline"
                            >
                                Write a Review
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Review Form Area */}
            <div id="review-form" className="pt-8 border-t border-gray-100">
                {hasAlreadyReviewed ? (
                    <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 text-center animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 mb-2">Review Submitted</h4>
                        <p className="text-gray-600 text-sm">
                            Thank you! You have already reviewed this product. Your feedback helps other shoppers make better choices.
                        </p>
                    </div>
                ) : (
                    <>
                        <h4 className="text-lg font-bold text-gray-900 mb-6">Write a Review</h4>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Compact Rating Selection */}
                            <div className="flex items-center gap-4 bg-white p-3 rounded-lg border border-gray-200 w-fit">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-tight">Your Rating:</span>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setSelectedRating(star)}
                                            onMouseEnter={() => setHoveredRating(star)}
                                            onMouseLeave={() => setHoveredRating(0)}
                                            className="focus:outline-none transition-transform hover:scale-110"
                                            disabled={isPending}
                                        >
                                            <Star
                                                size={24}
                                                className={`${star <= (hoveredRating || selectedRating)
                                                    ? 'text-amber-400 fill-amber-400'
                                                    : 'text-gray-200'
                                                    } transition-colors`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="relative group">
                                <Textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="I loved this product because..."
                                    className="w-full min-h-[120px] p-4 text-sm border-gray-200 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 transition-all resize-none"
                                    required
                                    disabled={isPending}
                                />
                                <div className="absolute right-4 bottom-4">
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        size="sm"
                                        className="rounded-lg font-bold px-6 h-10"
                                        disabled={isPending}
                                    >
                                        {isPending ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Posting...
                                            </>
                                        ) : (
                                            'Post Review'
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </>
                )}
            </div>

            {/* Login Dialog */}
            <LoginDialog
                open={showLoginDialog}
                onOpenChange={setShowLoginDialog}
                onSuccess={() => {
                    // Success callback for login
                }}
            />
        </div>
    );
};

export default ProductReviews;

