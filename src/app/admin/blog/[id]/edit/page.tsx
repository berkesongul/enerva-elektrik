import { getBlogById } from "@/app/admin/actions/blog";
import { EditBlogClient } from "@/components/admin/EditBlogClient";
import { notFound } from "next/navigation";

export default async function EditBlogPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const blog = await getBlogById(id);

    if (!blog) notFound();

    const formattedBlog = {
        id: blog.id,
        titleDe: blog.titleDe,
        titleTr: blog.titleTr,
        titleEn: blog.titleEn,
        contentDe: blog.contentDe,
        contentTr: blog.contentTr,
        contentEn: blog.contentEn,
        isPublished: blog.isPublished,
        image: blog.image,
    };

    return <EditBlogClient blog={formattedBlog} />;
}
