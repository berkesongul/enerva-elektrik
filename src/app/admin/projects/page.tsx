export const dynamic = "force-dynamic";

import { getProjects } from "@/app/admin/actions/projects";
import { ProjectsListClient } from "@/components/admin/ProjectsListClient";

export default async function ProjectsListPage() {
    const projects = await getProjects();

    return (
        <ProjectsListClient
            projects={projects.map((p) => ({
                id: p.id,
                titleDe: p.titleDe,
                category: p.category,
                year: p.year,
                isPublished: p.isPublished,
            }))}
        />
    );
}
