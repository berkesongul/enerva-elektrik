"use client";

import { BlogForm } from "@/components/admin/BlogForm";
import { useAdminI18n } from "@/lib/admin-i18n";

export default function NewBlogPage() {
    const { t } = useAdminI18n();

    return (
        <div className="max-w-4xl">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-white">{t("blog.newTitle")}</h1>
                <p className="text-slate-500 mt-1">{t("blog.newSubtitle")}</p>
            </div>
            <BlogForm />
        </div>
    );
}
