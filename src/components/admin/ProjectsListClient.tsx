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

interface Project {
    id: string;
    titleDe: string;
    category: string;
    year: number | null;
    isPublished: boolean;
}

export function ProjectsListClient({ projects }: { projects: Project[] }) {
    const { t } = useAdminI18n();

    const categoryLabels: Record<string, string> = {
        HV: t("form.categoryHV"),
        MV: t("form.categoryMV"),
        POWER_SYSTEMS: t("form.categoryPower"),
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">{t("projects.title")}</h1>
                    <p className="text-slate-500 mt-1">{t("projects.subtitle")}</p>
                </div>
                <Link href="/admin/projects/new">
                    <Button className="bg-[#D4AF37] hover:bg-[#e0c35c] text-[#1B365D] font-semibold">
                        {t("projects.new")}
                    </Button>
                </Link>
            </div>

            <div className="rounded-xl border border-slate-800 bg-[#161b22] overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="border-slate-800 hover:bg-transparent">
                            <TableHead className="text-slate-400">{t("projects.titleDe")}</TableHead>
                            <TableHead className="text-slate-400">{t("projects.category")}</TableHead>
                            <TableHead className="text-slate-400">{t("projects.year")}</TableHead>
                            <TableHead className="text-slate-400">{t("projects.status")}</TableHead>
                            <TableHead className="text-slate-400 text-right">{t("projects.actions")}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {projects.length === 0 ? (
                            <TableRow className="border-slate-800">
                                <TableCell colSpan={5} className="text-center text-slate-500 py-12">
                                    {t("projects.empty")}
                                </TableCell>
                            </TableRow>
                        ) : (
                            projects.map((project) => (
                                <TableRow key={project.id} className="border-slate-800 hover:bg-slate-800/30">
                                    <TableCell className="text-white font-medium">{project.titleDe}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="border-slate-700 text-slate-300">
                                            {categoryLabels[project.category] || project.category}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-slate-400">{project.year || "—"}</TableCell>
                                    <TableCell>
                                        <Badge className={project.isPublished ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-slate-500/10 text-slate-400 border-slate-500/20"}>
                                            {project.isPublished ? t("projects.published") : t("projects.draft")}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Link href={`/admin/projects/${project.id}/edit`}>
                                            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                                                {t("projects.edit")}
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
