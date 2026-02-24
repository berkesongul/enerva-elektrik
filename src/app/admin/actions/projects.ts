"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import type { ProjectCategory } from "@prisma/client";

export async function getProjects() {
    return prisma.project.findMany({
        orderBy: { createdAt: "desc" },
    });
}

export async function getProjectById(id: string) {
    return prisma.project.findUnique({ where: { id } });
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

export async function createProject(data: {
    titleDe: string;
    titleTr: string;
    titleEn: string;
    descriptionDe: string;
    descriptionTr: string;
    descriptionEn: string;
    clientDe?: string;
    clientTr?: string;
    clientEn?: string;
    category: ProjectCategory;
    mainImage?: string;
    gallery?: string[];
    year?: number;
    location?: string;
    isPublished?: boolean;
}) {
    const slug = slugify(data.titleEn || data.titleDe);
    const project = await prisma.project.create({
        data: {
            ...data,
            slug,
            gallery: data.gallery || [],
        },
    });
    revalidatePath("/admin/projects");
    return project;
}

export async function updateProject(
    id: string,
    data: {
        titleDe?: string;
        titleTr?: string;
        titleEn?: string;
        descriptionDe?: string;
        descriptionTr?: string;
        descriptionEn?: string;
        clientDe?: string;
        clientTr?: string;
        clientEn?: string;
        category?: ProjectCategory;
        mainImage?: string;
        gallery?: string[];
        year?: number;
        location?: string;
        isPublished?: boolean;
    }
) {
    const project = await prisma.project.update({
        where: { id },
        data: {
            ...data,
            gallery: data.gallery || undefined,
        },
    });
    revalidatePath("/admin/projects");
    return project;
}

export async function deleteProject(id: string) {
    await prisma.project.delete({ where: { id } });
    revalidatePath("/admin/projects");
}
