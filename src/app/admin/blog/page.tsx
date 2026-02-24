export const dynamic = "force-dynamic";

import { getBlogs } from "@/app/admin/actions/blog";
import { BlogListClient } from "@/components/admin/BlogListClient";

export default async function BlogListPage() {
    const blogs = await getBlogs();

    return (
        <BlogListClient
            blogs={blogs.map((b) => ({
                id: b.id,
                titleDe: b.titleDe,
                createdAt: b.createdAt.toISOString(),
                isPublished: b.isPublished,
            }))}
        />
    );
}
