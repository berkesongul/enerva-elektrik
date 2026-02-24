import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { BlogClient } from "./BlogClient";

export const revalidate = 3600;

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "nav" });

    return {
        title: `${t("blog")} | Enerva Elektrik`,
        description: "Aktuelles, Nachrichten und Insights aus dem Bereich Energietechnik.",
    };
}

export default async function BlogPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Fetch only published blog posts
    const blogs = await prisma.blog.findMany({
        where: { isPublished: true },
        orderBy: { createdAt: "desc" },
    });

    return (
        <BlogClient
            initialBlogs={blogs}
            locale={locale}
        />
    );
}
