import clsx from 'clsx';
import { ReactNode } from 'react';

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    title?: string;
}

export default function GlassCard({ children, className, onClick, title }: GlassCardProps) {
    return (
        <div
            onClick={onClick}
            className={clsx(
                "glass-panel rounded-2xl transition-all duration-200",
                onClick && "cursor-pointer hover:bg-white/10 active:scale-95",
                className
            )}
        >
            {title && (
                <div className="border-b border-white/10 pb-4 mb-4">
                    <h2 className="text-xl font-semibold text-white">{title}</h2>
                </div>
            )}
            {children}
        </div>
    );
}
