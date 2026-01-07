'use client';

import React, { useState, useEffect } from 'react';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

interface CountdownTimerProps {
    targetDate?: string;
    onExpire?: () => void;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, onExpire }) => {
    const calculateTimeLeft = React.useCallback(() => {
        if (!targetDate) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        const difference = +new Date(targetDate) - +new Date();
        if (difference <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
        };
    }, [targetDate]);

    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

    useEffect(() => {
        setTimeLeft(calculateTimeLeft()); // Reset when targetDate changes

        const timer = setInterval(() => {
            const nextTime = calculateTimeLeft();
            setTimeLeft(nextTime);

            if (nextTime.days === 0 && nextTime.hours === 0 && nextTime.minutes === 0 && nextTime.seconds === 0) {
                onExpire?.();
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [calculateTimeLeft, onExpire]);

    const formatNumber = (num: number) => num.toString().padStart(2, '0');

    return (
        <div className="flex items-center justify-center gap-2 md:gap-4 my-6 md:my-8">
            <div className="flex flex-col items-center">
                <span className="text-4xl md:text-5xl font-bold text-[#119744]">
                    {formatNumber(timeLeft.days)}
                </span>
                <span className="text-xs md:text-sm font-medium text-[#2b2f33] mt-1">Days</span>
            </div>
            <div className="text-3xl md:text-4xl font-bold text-[#2b2f33] -mt-4">:</div>
            <div className="flex flex-col items-center">
                <span className="text-4xl md:text-5xl font-bold text-[#119744]">
                    {formatNumber(timeLeft.hours)}
                </span>
                <span className="text-xs md:text-sm font-medium text-[#2b2f33] mt-1">Hours</span>
            </div>
            <div className="text-3xl md:text-4xl font-bold text-[#2b2f33] -mt-4">:</div>
            <div className="flex flex-col items-center">
                <span className="text-4xl md:text-5xl font-bold text-[#119744]">
                    {formatNumber(timeLeft.minutes)}
                </span>
                <span className="text-xs md:text-sm font-medium text-[#2b2f33] mt-1">Minutes</span>
            </div>
            <div className="text-3xl md:text-4xl font-bold text-[#2b2f33] -mt-4">:</div>
            <div className="flex flex-col items-center">
                <span className="text-4xl md:text-5xl font-bold text-[#119744]">
                    {formatNumber(timeLeft.seconds)}
                </span>
                <span className="text-xs md:text-sm font-medium text-[#2b2f33] mt-1">Seconds</span>
            </div>
        </div>
    );
};
