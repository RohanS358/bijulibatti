import Sidebar from '@/components/dashboard/Sidebar/Sidebar';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-violet-50/30">
            <Sidebar />
            <main className="pl-[290px] pr-6 pt-24 pb-6 min-h-screen">
                {children}
            </main>
        </div>
    );
}
