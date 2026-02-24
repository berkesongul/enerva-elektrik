"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Zap, Activity, ShieldCheck, Cpu, Sun, ArrowDownToLine, Unplug, ArrowUpToLine, DraftingCompass } from "lucide-react";

export default function ServicesPage() {
    const t = useTranslations("servicesPage");

    const services = [
        { id: "ag", icon: Zap },
        { id: "og", icon: Activity },
        { id: "kompanzasyon", icon: ShieldCheck },
        { id: "otomasyon", icon: Cpu },
        { id: "ges", icon: Sun },
        { id: "yeralti", icon: ArrowDownToLine },
        { id: "enerji", icon: Unplug },
        { id: "direk", icon: ArrowUpToLine },
        { id: "proje", icon: DraftingCompass },
    ];

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
                                className="group relative bg-card border border-border rounded-2xl p-8 hover:border-[#D4AF37]/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-bl-full translate-x-1/2 -translate-y-1/2 transition-transform duration-500 group-hover:scale-150" />

                                <div className="relative z-10">
                                    <div className="w-14 h-14 rounded-xl bg-background border border-border flex items-center justify-center mb-6 group-hover:border-[#D4AF37] transition-colors duration-300 shadow-sm">
                                        <Icon className="w-6 h-6 text-[#D4AF37]" strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-[#D4AF37] transition-colors duration-300">
                                        {t(`items.${service.id}.title`)}
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {t(`items.${service.id}.desc`)}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
