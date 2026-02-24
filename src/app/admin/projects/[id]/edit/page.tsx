import { getProjectById } from "@/app/admin/actions/projects";
import { EditProjectClient } from "@/components/admin/EditProjectClient";
import { notFound } from "next/navigation";

export default async function EditProjectPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const project = await getProjectById(id);

    if (!project) notFound();

    const formattedProject = {
        id: project.id,
        titleDe: project.titleDe,
        titleTr: project.titleTr,
        titleEn: project.titleEn,
        descriptionDe: project.descriptionDe,
        descriptionTr: project.descriptionTr,
        descriptionEn: project.descriptionEn,
        clientDe: project.clientDe || "",
        clientTr: project.clientTr || "",
        clientEn: project.clientEn || "",
        category: project.category,
        year: project.year || undefined,
        location: project.location || "",
        isPublished: project.isPublished,
        mainImage: project.mainImage,
    };

    return <EditProjectClient project={formattedProject} />;
}
