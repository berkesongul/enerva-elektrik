import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash("admin123", 12);

    const admin = await prisma.admin.upsert({
        where: { email: "admin@enerva.de" },
        update: {},
        create: {
            email: "admin@enerva.de",
            password: hashedPassword,
            name: "Enerva Admin",
        },
    });

    console.log("✅ Admin user seeded:", admin.email);
}

main()
    .catch((e) => {
        console.error("❌ Seed error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
