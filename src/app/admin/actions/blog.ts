"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getBlogs() {
    return prisma.blog.findMany({
        orderBy: { createdAt: "desc" },
    });
}

export async function getBlogById(id: string) {
    return prisma.blog.findUnique({ where: { id } });
}

function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[äÄ]/g, "ae")
        .replace(/[öÖ]/g, "oe")
        .replace(/[üÜ]/g, "ue")
        .replace(/[ß]/g, "ss")
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
}

export async function createBlog(data: {
    titleDe: string;
    titleTr: string;
    titleEn: string;
    contentDe: string;
    contentTr: string;
    contentEn: string;
    image?: string;
    isPublished?: boolean;
}) {
    const blog = await prisma.blog.create({
        data: {
            ...data,
            slugDe: slugify(data.titleDe),
            slugTr: slugify(data.titleTr),
            slugEn: slugify(data.titleEn),
        },
    });
    revalidatePath("/admin/blog");
    return blog;
}

export async function updateBlog(
    id: string,
    data: {
        titleDe?: string;
        titleTr?: string;
        titleEn?: string;
        contentDe?: string;
        contentTr?: string;
        contentEn?: string;
        image?: string;
        isPublished?: boolean;
    }
) {
    const updateData: Record<string, unknown> = { ...data };

    // Regenerate slugs if titles changed
    if (data.titleDe) updateData.slugDe = slugify(data.titleDe);
    if (data.titleTr) updateData.slugTr = slugify(data.titleTr);
    if (data.titleEn) updateData.slugEn = slugify(data.titleEn);

    const blog = await prisma.blog.update({
        where: { id },
        data: updateData,
    });
    revalidatePath("/admin/blog");
    return blog;
}

export async function deleteBlog(id: string) {
    await prisma.blog.delete({ where: { id } });
    revalidatePath("/admin/blog");
}
