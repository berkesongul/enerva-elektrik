"use client";

import { ProjectForm } from "@/components/admin/ProjectForm";
import { useAdminI18n } from "@/lib/admin-i18n";

export default function NewProjectPage() {
    const { t } = useAdminI18n();

    return (
        <div className="max-w-4xl">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-white">{t("projects.newTitle")}</h1>
                <p className="text-slate-500 mt-1">{t("projects.newSubtitle")}</p>
            </div>
            <ProjectForm />
        </div>
    );
}
