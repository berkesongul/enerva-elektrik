"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useAdminI18n } from "@/lib/admin-i18n";

interface Blog {
    id: string;
    titleDe: string;
    createdAt: string;
    isPublished: boolean;
}

export function BlogListClient({ blogs }: { blogs: Blog[] }) {
    const { t } = useAdminI18n();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">{t("blog.title")}</h1>
                    <p className="text-slate-500 mt-1">{t("blog.subtitle")}</p>
                </div>
                <Link href="/admin/blog/new">
                    <Button className="bg-[#D4AF37] hover:bg-[#e0c35c] text-[#1B365D] font-semibold">
                        {t("blog.new")}
                    </Button>
                </Link>
            </div>

            <div className="rounded-xl border border-slate-800 bg-[#161b22] overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="border-slate-800 hover:bg-transparent">
                            <TableHead className="text-slate-400">{t("blog.titleDe")}</TableHead>
                            <TableHead className="text-slate-400">{t("blog.created")}</TableHead>
                            <TableHead className="text-slate-400">{t("blog.status")}</TableHead>
                            <TableHead className="text-slate-400 text-right">{t("blog.actions")}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {blogs.length === 0 ? (
                            <TableRow className="border-slate-800">
                                <TableCell colSpan={4} className="text-center text-slate-500 py-12">
                                    {t("blog.empty")}
                                </TableCell>
                            </TableRow>
                        ) : (
                            blogs.map((blog) => (
                                <TableRow key={blog.id} className="border-slate-800 hover:bg-slate-800/30">
                                    <TableCell className="text-white font-medium">{blog.titleDe}</TableCell>
                                    <TableCell className="text-slate-400">
                                        {new Date(blog.createdAt).toLocaleDateString("de-DE")}
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={blog.isPublished ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-slate-500/10 text-slate-400 border-slate-500/20"}>
                                            {blog.isPublished ? t("blog.published") : t("blog.draft")}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Link href={`/admin/blog/${blog.id}/edit`}>
                                            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                                                {t("blog.edit")}
                                            </Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
