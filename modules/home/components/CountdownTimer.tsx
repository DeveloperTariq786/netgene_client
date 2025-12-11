'use client';

import React, { useState, useEffect } from 'react';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export const CountdownTimer: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 12,
        hours: 5,
        minutes: 45,
        seconds: 30
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                let { days, hours, minutes, seconds } = prev;

                if (seconds > 0) {
                    seconds--;
                } else {
                    seconds = 59;
                    if (minutes > 0) {
                        minutes--;
                    } else {
                        minutes = 59;
                        if (hours > 0) {
                            hours--;
                        } else {
                            hours = 23;
                            if (days > 0) {
                                days--;
                            } else {
                                // Timer finished, just reset or stop
                                clearInterval(timer);
                                return { days: 0, hours: 0, minutes: 0, seconds: 0 };
                            }
                        }
                    }
                }
                return { days, hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

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
