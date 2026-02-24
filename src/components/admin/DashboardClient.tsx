"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminI18n } from "@/lib/admin-i18n";

interface DashboardClientProps {
    projectCount: number;
    blogCount: number;
}

export function DashboardClient({ projectCount, blogCount }: DashboardClientProps) {
    const { t } = useAdminI18n();

    const stats = [
        {
            title: t("dashboard.projects"),
            value: projectCount,
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21" />
                </svg>
            ),
            color: "from-blue-500/20 to-blue-600/20",
            textColor: "text-blue-400",
        },
        {
            title: t("dashboard.blogPosts"),
            value: blogCount,
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18V7.875c0-.621.504-1.125 1.125-1.125H6.75" />
                </svg>
            ),
            color: "from-emerald-500/20 to-emerald-600/20",
            textColor: "text-emerald-400",
        },
        {
            title: t("dashboard.published"),
            value: "—",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
            ),
            color: "from-[#D4AF37]/20 to-[#e0c35c]/20",
            textColor: "text-[#D4AF37]",
        },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-white">{t("dashboard.title")}</h1>
                <p className="text-slate-500 mt-1">{t("dashboard.welcome")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.map((stat) => (
                    <Card key={stat.title} className="bg-[#161b22] border-slate-800 hover:border-slate-700 transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-slate-400">{stat.title}</CardTitle>
                            <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color} ${stat.textColor}`}>{stat.icon}</div>
                        </CardHeader>
                        <CardContent>
                            <div className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div>
                <h2 className="text-lg font-semibold text-white mb-4">{t("dashboard.quickActions")}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a href="/admin/projects/new" className="flex items-center gap-4 p-4 rounded-xl bg-[#161b22] border border-slate-800 hover:border-[#D4AF37]/30 hover:bg-[#1a2030] transition-all group">
                        <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-white">{t("dashboard.newProject")}</p>
                            <p className="text-xs text-slate-500">{t("dashboard.addProject")}</p>
                        </div>
                    </a>
                    <a href="/admin/blog/new" className="flex items-center gap-4 p-4 rounded-xl bg-[#161b22] border border-slate-800 hover:border-[#D4AF37]/30 hover:bg-[#1a2030] transition-all group">
                        <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-white">{t("dashboard.newBlogPost")}</p>
                            <p className="text-xs text-slate-500">{t("dashboard.writePost")}</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}
