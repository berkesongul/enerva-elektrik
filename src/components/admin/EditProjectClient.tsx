"use client";

import { ProjectForm } from "@/components/admin/ProjectForm";
import { useAdminI18n } from "@/lib/admin-i18n";

export function EditProjectClient({ project }: { project: any }) {
    const { t } = useAdminI18n();

    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h1 className="text-2xl font-bold text-white">{t("projects.editTitle")}</h1>
                <p className="text-slate-500 mt-1">{project.titleDe}</p>
            </div>
            <ProjectForm initialData={project} />
        </div>
    );
}
