import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { HomeClient } from "./HomeClient";

export const revalidate = 3600;

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "hero" });

    return {
        title: `Enerva Elektrik | ${t("title")}`,
        description: t("subtitle"),
    };
}

export default async function HomePage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Fetch the 3 most recent published projects
    const recentProjects = await prisma.project.findMany({
        where: { isPublished: true },
        orderBy: { createdAt: "desc" },
        take: 3,
    });

    // Fetch the 2 most recent published blog posts
    const latestNews = await prisma.blog.findMany({
        where: { isPublished: true },
        orderBy: { createdAt: "desc" },
        take: 2,
    });

    return (
        <HomeClient
            recentProjects={recentProjects}
            latestNews={latestNews}
            locale={locale}
        />
    );
}
