"use client";

import { Home, Zap, BarChart2, DollarSign, FileText, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const navItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: BarChart2, label: 'Analytics', href: '/analytics' },
    { icon: DollarSign, label: 'Billing', href: '/billing' },
    { icon: FileText, label: 'Reports', href: '/reports' },
    { icon: Settings, label: 'Settings', href: '/settings' },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-6 top-6 bottom-6 w-64 glass-panel rounded-2xl flex flex-col p-6 z-[110] shadow-premium-lg">
            <div className="flex items-center gap-3 mb-10 px-2">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg">
                    <Zap className="text-white fill-current" size={24} />
                </div>
                <div>
                    <h1 className="font-bold text-xl tracking-tight text-slate-800">BijuliBatti</h1>
                    <p className="text-xs text-slate-500 font-medium">Virtual Smart Grid</p>
                </div>
            </div>

            <nav className="flex-1 space-y-1.5">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={clsx(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group font-medium text-sm",
                                isActive
                                    ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/30"
                                    : "hover:bg-slate-50 text-slate-600 hover:text-slate-900"
                            )}
                        >
                            <item.icon size={20} className={clsx(
                                "transition-transform group-hover:scale-110",
                                isActive && "drop-shadow-sm"
                            )} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto pt-6 border-t border-slate-200 space-y-2">
                <div className="pt-2">
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all font-medium text-sm group">
                        <LogOut size={20} className="transition-transform group-hover:scale-110" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </aside>
    );
}
