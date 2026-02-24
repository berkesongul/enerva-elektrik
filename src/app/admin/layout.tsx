import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopBar } from "@/components/admin/AdminTopBar";
import { AdminProviders } from "@/components/admin/AdminProviders";
import "../globals.css";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Enerva Admin",
    description: "Enerva Elektrik Admin Dashboard",
};

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session?.user) {
        return (
            <html lang="de" className="dark">
                <body className="min-h-screen bg-[#0d1117] text-slate-200 font-sans antialiased">
                    <AdminProviders>{children}</AdminProviders>
                </body>
            </html>
        );
    }

    return (
        <html lang="de" className="dark">
            <body className="min-h-screen bg-[#0d1117] text-slate-200 font-sans antialiased">
                <AdminProviders>
                    <div className="flex h-screen overflow-hidden">
                        <AdminSidebar />
                        <div className="flex-1 flex flex-col overflow-hidden">
                            <AdminTopBar user={session.user} />
                            <main className="flex-1 overflow-y-auto p-6 lg:p-8">
                                {children}
                            </main>
                        </div>
                    </div>
                </AdminProviders>
            </body>
        </html>
    );
}

