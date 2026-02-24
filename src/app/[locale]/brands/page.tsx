"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";

const brands = [
    { id: "schneider", name: "Schneider Electric", logo: "/brands/schneider.png" },
    { id: "legrand", name: "Legrand", logo: "/brands/legrand.png" },
    { id: "chint", name: "Chint", logo: "/brands/chintelectronics.png" },
    { id: "adalpano", name: "Adalpano", logo: "/brands/adalpano.png" },
    { id: "forlife", name: "Forlife", logo: "/brands/forlife_professional.png" },
    { id: "hascelik", name: "Hasçelik Kablo", logo: "/brands/hascelik_kablo.png" },
    { id: "oznur", name: "Öznur Kablo", logo: "/brands/oznurkablo.png" },
    { id: "raychem", name: "Raychem", logo: "/brands/raychem.png" },
    { id: "sena", name: "Sena Kablo", logo: "/brands/sena_kablo.png" },
    { id: "sutem", name: "Sutem", logo: "/brands/sutem.png" },
    { id: "provar", name: "Provar", logo: "/brands/provar.png" },
    { id: "kael", name: "Kael", logo: "/brands/kael.png" },
];

export default function BrandsPage() {
    const t = useTranslations("nav");

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0 },
    };

    return (
        <section className="relative min-h-[calc(100vh-5rem)] bg-background text-foreground transition-colors duration-300">
            {/* Background Decoration */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6">
                        <span className="gradient-text">{t("brands")}</span>
                    </h1>
                    <div className="w-24 h-1 bg-[#D4AF37] mx-auto rounded-full mb-8" />
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                        Sektörün öncü markalarıyla güvenilir ve uzun ömürlü çözümler üretiyoruz.
                        Projelerimizde kullandığımız partner markalar:
                    </p>
                </motion.div>

                {/* Brands Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
                >
                    {brands.map((brand) => (
                        <motion.div
                            key={brand.id}
                            variants={itemVariants}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className="group aspect-video bg-card border border-border rounded-2xl flex items-center justify-center p-6 hover:border-[#D4AF37]/50 transition-all duration-300 hover:shadow-[0_10px_40px_rgba(212,175,55,0.1)] relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500 opacity-70 group-hover:opacity-100">
                                <Image
                                    src={brand.logo}
                                    alt={`${brand.name} logo`}
                                    fill
                                    className="object-contain p-4"
                                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
