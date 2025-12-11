import React from 'react';
import { MEGA_MENU_DATA } from '@/core/constants';

const MegaMenu: React.FC = () => {
    return (
        <div className="w-full bg-gradient-to-br from-white via-gray-50 to-white p-8 shadow-2xl rounded-b-2xl border-t border-gray-200 backdrop-blur-sm">
            <div className="max-h-[380px] overflow-y-auto custom-scrollbar pr-2">
                <div className="grid grid-cols-5 gap-y-10 gap-x-8">
                    {MEGA_MENU_DATA.map((section, index) => (
                        <div
                            key={`${section.title}-${index}`}
                            className="flex flex-col items-start group"
                        >
                            {/* Heading with hover effect */}
                            <div className="mb-5 relative w-full">
                                <h3 className="text-gray-800 font-bold text-[16px] leading-none group-hover:text-emerald-600 transition-colors duration-300">
                                    {section.title}
                                </h3>
                                {/* Full width underline with green accent */}
                                <div className="relative mt-2.5 w-full">
                                    <div className="h-[1px] w-full bg-gray-200"></div>
                                    <div className="absolute top-0 left-0 h-[2px] w-[30px] bg-emerald-500"></div>
                                    <div className="absolute top-0 left-0 h-[2px] w-0 bg-emerald-600 group-hover:w-[30px] transition-all duration-500 ease-out"></div>
                                </div>
                            </div>

                            {/* Links List with enhanced hover states */}
                            <ul className="space-y-3.5 w-full border-l border-r border-gray-200 px-4">
                                {section.items.map((link) => (
                                    <li key={link.label} className="relative pl-0 hover:pl-2 transition-all duration-200">
                                        <a
                                            href={link.href}
                                            className="block text-gray-600 hover:text-emerald-600 text-[14px] font-normal transition-all duration-200 relative group/link"
                                        >
                                            <span className="relative">
                                                {link.label}
                                                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-emerald-500 group-hover/link:w-full transition-all duration-300"></span>
                                            </span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="h-4"></div>
            </div>
        </div>
    );
};

export default MegaMenu;