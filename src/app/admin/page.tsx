import { prisma } from "@/lib/prisma";
import { DashboardClient } from "@/components/admin/DashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
    const [projectCount, blogCount] = await Promise.all([
        prisma.project.count().catch(() => 0),
        prisma.blog.count().catch(() => 0),
    ]);

    return <DashboardClient projectCount={projectCount} blogCount={blogCount} />;
}
