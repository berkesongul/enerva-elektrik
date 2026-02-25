"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { Activity, ShieldCheck, Cpu, ArrowDownToLine, Unplug, ArrowUpToLine, DraftingCompass } from "lucide-react";

const services = [
    { id: "og", slug: "orta-gerilim", icon: Activity, image: "/images/hizmetler/orta-gerilim.jpg" },
    { id: "kompanzasyon", slug: "kompanzasyon-sistemleri", icon: ShieldCheck, image: "/images/hizmetler/kompanzasyon-sistemleri.png" },
    { id: "otomasyon", slug: "otomasyon-sistemleri", icon: Cpu, image: "/images/hizmetler/otomasyon-sistemleri.jpg" },
    { id: "yeralti", slug: "yer-alti-kanal", icon: ArrowDownToLine, image: "/images/hizmetler/yer-alti-kanal.jpg" },
    { id: "enerji", slug: "enerji-hat", icon: Unplug, image: "/images/hizmetler/enerji-hat.jpg" },
    { id: "direk", slug: "direk-montaj", icon: ArrowUpToLine, image: "/images/hizmetler/direk-montaj.jpg" },
    { id: "proje", slug: "proje-cizimi", icon: DraftingCompass, image: "/images/hizmetler/proje-çizimi.jpg" },
];

export default function ServicesPage() {
    const t = useTranslations("servicesPage");

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
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <section className="relative min-h-[calc(100vh-5rem)] pb-32 bg-background text-foreground transition-colors duration-300">
            {/* Background Decoration */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl opacity-50 -translate-x-1/2" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6">
                        <span className="gradient-text">{t("title")}</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                        {t("subtitle")}
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {services.map((service) => {
                        const Icon = service.icon;
                        return (
                            <motion.div
                                key={service.id}
                                variants={itemVariants}
                            >
                                <Link
                                    href={`/services/${service.slug}`}
                                    className="group block h-full"
                                >
                                    <div className="relative bg-card border border-border rounded-2xl overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
                                        {/* Service Image */}
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={service.image}
                                                alt={t(`items.${service.id}.title`)}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                            <div className="absolute bottom-3 left-3">
                                                <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                                                    <Icon className="w-5 h-5 text-[#D4AF37]" strokeWidth={1.5} />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Service Info */}
                                        <div className="p-6 flex-1 flex flex-col">
                                            <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-[#D4AF37] transition-colors duration-300">
                                                {t(`items.${service.id}.title`)}
                                            </h3>
                                            <p className="text-muted-foreground leading-relaxed flex-1">
                                                {t(`items.${service.id}.desc`)}
                                            </p>
                                            <div className="mt-4 inline-flex items-center text-sm font-medium text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                {t("learnMore")}
                                                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
