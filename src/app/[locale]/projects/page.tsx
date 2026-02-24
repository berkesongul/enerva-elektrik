import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { ProjectsClient } from "./ProjectsClient";

export const revalidate = 3600;

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "nav" });

    return {
        title: `${t("projects")} | Enerva Elektrik`,
        description: "Entdecken Sie unsere erfolgreich abgeschlossenen Projekte im Bereich Hochspannung, Mittelspannung und Energiesysteme.",
    };
}

export default async function ProjectsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Fetch only published projects
    const projects = await prisma.project.findMany({
        where: { isPublished: true },
        orderBy: { year: "desc" },
    });

    const categories = ["ALL", "HV", "MV", "POWER_SYSTEMS"];

    return (
        <ProjectsClient
            initialProjects={projects}
            locale={locale}
            categories={categories}
        />
    );
}
