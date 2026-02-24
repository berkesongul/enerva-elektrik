"use client";

import { BlogForm } from "@/components/admin/BlogForm";
import { useAdminI18n } from "@/lib/admin-i18n";

export function EditBlogClient({ blog }: { blog: any }) {
    const { t } = useAdminI18n();

    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h1 className="text-2xl font-bold text-white">{t("blog.editTitle")}</h1>
                <p className="text-slate-500 mt-1">{blog.titleDe}</p>
            </div>
            <BlogForm initialData={blog} />
        </div>
    );
}
