import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ProjectDetailClient } from "./ProjectDetailClient";
import type { Metadata } from "next";

export const revalidate = 3600;

export async function generateStaticParams() {
    const projects = await prisma.project.findMany({
        where: { isPublished: true },
        select: { slug: true },
    });

    return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
    const { locale, slug } = await params;
    const project = await prisma.project.findUnique({ where: { slug } });

    if (!project) return { title: "Project Not Found" };

    const titleKey = `title${locale.charAt(0).toUpperCase() + locale.slice(1)}` as keyof typeof project;
    const descKey = `description${locale.charAt(0).toUpperCase() + locale.slice(1)}` as keyof typeof project;

    const title = (project[titleKey] || project.titleDe) as string;
    const description = (project[descKey] || project.descriptionDe) as string;

    return {
        title: `${title} | Enerva Elektrik`,
        description: description.substring(0, 160) + (description.length > 160 ? "..." : ""),
        openGraph: {
            title,
            description: description.substring(0, 160),
            images: project.mainImage ? [project.mainImage] : [],
        },
    };
}

export default async function ProjectDetailPage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale, slug } = await params;

    const project = await prisma.project.findUnique({
        where: { slug },
    });

    if (!project || !project.isPublished) {
        notFound();
    }

    return <ProjectDetailClient project={project} locale={locale} />;
}
