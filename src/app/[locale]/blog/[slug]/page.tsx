import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { BlogDetailClient } from "./BlogDetailClient";
import type { Metadata } from "next";

export const revalidate = 3600;

export async function generateStaticParams() {
    const blogs = await prisma.blog.findMany({
        where: { isPublished: true },
        select: { slugDe: true, slugTr: true, slugEn: true },
    });

    const params: { slug: string }[] = [];
    for (const blog of blogs) {
        if (blog.slugDe) params.push({ slug: blog.slugDe });
        if (blog.slugTr) params.push({ slug: blog.slugTr });
        if (blog.slugEn) params.push({ slug: blog.slugEn });
    }

    return params;
}

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
    const { locale, slug } = await params;
    const blog = await prisma.blog.findFirst({
        where: { OR: [{ slugDe: slug }, { slugTr: slug }, { slugEn: slug }], isPublished: true }
    });

    if (!blog) return { title: "Blog Not Found" };

    const titleKey = `title${locale.charAt(0).toUpperCase() + locale.slice(1)}` as keyof typeof blog;

    const title = (blog[titleKey] || blog.titleDe) as string;

    return {
        title: `${title} | Enerva Blog`,
        openGraph: {
            title,
            images: blog.image ? [blog.image] : [],
        },
    };
}

export default async function BlogDetailPage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale, slug } = await params;

    const blog = await prisma.blog.findFirst({
        where: {
            OR: [
                { slugDe: slug },
                { slugTr: slug },
                { slugEn: slug }
            ],
            isPublished: true
        }
    });

    if (!blog) {
        notFound();
    }

    return <BlogDetailClient blog={blog} locale={locale} />;
}
