import { Zap } from 'lucide-react';

export default function Loading() {
    return (
        <div className="w-full h-[calc(100vh-8rem)] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center animate-pulse relative">
                    <Zap className="text-primary animate-bounce" size={32} />
                    <div className="absolute inset-0 border-4 border-primary/20 rounded-full animate-ping" />
                </div>
                <p className="text-slate-500 text-sm font-medium tracking-widest animate-pulse">CONNECTING TO GRID...</p>
            </div>
        </div>
    );
}
