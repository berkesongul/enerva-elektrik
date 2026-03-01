import { PrismaClient, ProjectCategory } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding...');

    // 1. Admin
    const hashedPassword = await bcrypt.hash('Enerva4545', 10);
    const admin = await prisma.admin.upsert({
        where: { email: 'admin@enervaelektrik.com' },
        update: {},
        create: {
            email: 'admin@enervaelektrik.com',
            password: hashedPassword,
            name: 'Enerva Admin',
        },
    });
    console.log(`Admin created: ${admin.email}`);

    // 2. Settings
    const settingsData = [
        { key: 'site_title', value: 'Enerva Elektrik' },
        { key: 'contact_email', value: 'info@enervaelektrik.com' },
        { key: 'contact_phone', value: '+90 555 123 4567' },
        { key: 'address', value: 'Ankara, Türkiye' },
    ];

    for (const s of settingsData) {
        await prisma.settings.upsert({
            where: { key: s.key },
            update: {},
            create: s,
        });
    }
    console.log(`Settings created`);

    // 3. Projects
    const projectsData = [
        {
            slug: 'örnek-yuksek-gerilim-projesi',
            titleTr: 'Örnek Yüksek Gerilim Projesi',
            titleEn: 'Sample High Voltage Project',
            titleDe: 'Beispiel Hochspannungsprojekt',
            descriptionTr: 'Bu proje kapsamında Ankara\'da 154 kV enerji iletim hattı kurulumu gerçekleştirilmiştir.',
            descriptionEn: 'Within the scope of this project, 154 kV energy transmission line installation was carried out in Ankara.',
            descriptionDe: 'Im Rahmen dieses Projekts wurde in Ankara der Bau einer 154-kV-Energieübertragungsleitung durchgeführt.',
            category: ProjectCategory.HV,
            isPublished: true,
            year: 2025,
            location: 'Ankara',
            clientTr: 'Örnek Müşteri A.Ş.',
            clientEn: 'Sample Client Inc.',
            clientDe: 'Beispiel Kunde GmbH',
        },
        {
            slug: 'örnek-orta-gerilim-projesi',
            titleTr: 'Örnek Orta Gerilim Projesi',
            titleEn: 'Sample Medium Voltage Project',
            titleDe: 'Beispiel Mittelspannungsprojekt',
            descriptionTr: 'OSB içerisinde 34.5 kV trafo merkezi ve hücre montajı çalışmaları yapılmıştır.',
            descriptionEn: '34.5 kV transformer station and cell installation works were carried out within the organized industrial zone.',
            descriptionDe: 'Im Industriegebiet wurden 34,5-kV-Umspannwerks- und Zellenmontagearbeiten durchgeführt.',
            category: ProjectCategory.MV,
            isPublished: true,
            year: 2024,
            location: 'İstanbul',
            clientTr: 'Örnek Endüstri',
            clientEn: 'Sample Industry',
            clientDe: 'Beispiel Industrie',
        },
        {
            slug: 'örnek-enerji-sistemleri',
            titleTr: 'Örnek Enerji Sistemleri & Otomasyon',
            titleEn: 'Sample Energy Systems & Automation',
            titleDe: 'Beispiel Energiesysteme & Automation',
            descriptionTr: 'Güneş enerjisi santrali ve kompanzasyon sistemleri otomasyonu entegrasyonu başarıyla tamamlandı.',
            descriptionEn: 'Solar power plant and compensation systems automation integration was successfully completed.',
            descriptionDe: 'Integration der Automatisierung von Solarkraftwerken und Kompensationssystemen erfolgreich abgeschlossen.',
            category: ProjectCategory.POWER_SYSTEMS,
            isPublished: true,
            year: 2025,
            location: 'İzmir',
            clientTr: 'Yenilenebilir Enerji A.Ş.',
            clientEn: 'Renewable Energy Inc.',
            clientDe: 'Erneuerbare Energien AG',
        }
    ];

    for (const p of projectsData) {
        const project = await prisma.project.upsert({
            where: { slug: p.slug },
            update: {},
            create: p,
        });
        console.log(`Project created: ${project.slug}`);
    }

    // 4. Blogs
    const blogsData = [
        {
            slugTr: 'enerji-sektorunde-dijitallesme',
            slugEn: 'digitalization-in-energy-sector',
            slugDe: 'digitalisierung-im-energiesektor',
            titleTr: 'Enerji Sektöründe Dijitalleşme ve Yapay Zeka',
            titleEn: 'Digitalization and Artificial Intelligence in the Energy Sector',
            titleDe: 'Digitalisierung und Künstliche Intelligenz im Energiesektor',
            contentTr: 'Enerji tesislerinde verimliliği artırmak için endüstriyel otomasyon ve yapay zeka entegrasyonu gün geçtikçe daha fazla önem kazanıyor.',
            contentEn: 'Industrial automation and AI integration to increase efficiency in energy facilities are gaining more importance day by day.',
            contentDe: 'Industrielle Automatisierung und KI-Integration zur Steigerung der Effizienz in Energieanlagen werden von Tag zu Tag wichtiger.',
            isPublished: true,
        },
        {
            slugTr: 'kompanzasyonun-onemi',
            slugEn: 'importance-of-compensation',
            slugDe: 'bedeutung-der-kompensation',
            titleTr: 'Endüstriyel Tesislerde Kompanzasyonun Önemi',
            titleEn: 'The Importance of Compensation in Industrial Facilities',
            titleDe: 'Die Bedeutung der Kompensation in Industrieanlagen',
            contentTr: 'Reaktif güç tüketimini kontrol altına alarak enerji maliyetlerinizi düşürmenin en etkili yolu doğru kompanzasyon sisteminden geçiyor.',
            contentEn: 'The most effective way to reduce your energy costs by controlling reactive power consumption is through the right compensation system.',
            contentDe: 'Der effektivste Weg, Ihre Energiekosten durch Kontrolle des Blindleistungsverbrauchs zu senken, führt über das richtige Kompensationssystem.',
            isPublished: true,
        }
    ];

    for (const b of blogsData) {
        const blog = await prisma.blog.upsert({
            where: { slugTr: b.slugTr },
            update: {},
            create: b,
        });
        console.log(`Blog created: ${blog.slugTr}`);
    }

    console.log('Seeding finished.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
