"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export function ProjectsClient({ initialProjects, locale, categories }: { initialProjects: any[], locale: string, categories: string[] }) {
    const t = useTranslations("projectsPage");
    const nav = useTranslations("nav");
    const [activeCategory, setActiveCategory] = useState("ALL");

    const filteredProjects = activeCategory === "ALL"
        ? initialProjects
        : initialProjects.filter(p => p.category === activeCategory);

    const getLocalized = (project: any, field: string) => {
        const key = `${field}${locale.charAt(0).toUpperCase() + locale.slice(1)}`;
        return project[key] || project[`${field}De`] || "";
    };

    const categoryLabels: Record<string, string> = {
        ALL: t("allProjects"),
        HV: t("catHV"),
        MV: t("catMV"),
        POWER_SYSTEMS: t("catPower"),
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="bg-background text-foreground transition-colors duration-300">
            {/* Hero Banner */}
            <section className="relative h-[45vh] min-h-[350px] flex items-center">
                <div className="absolute inset-0">
                    <img
                        src="/images/anasayfa/ana-sayfa-banner.jpg"
                        alt="Enerva Elektrik Projeler"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/60 to-white/30 dark:from-[#0d1b2e]/80 dark:via-[#0d1b2e]/60 dark:to-[#0d1b2e]/30" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-white/20 dark:from-[#0d1b2e]/90 dark:via-transparent dark:to-[#0d1b2e]/20" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Image
                            src="/images/enerva-logo.png"
                            alt="Enerva Elektrik Logo"
                            width={160}
                            height={50}
                            className="h-14 lg:h-16 w-auto mb-6 drop-shadow-lg"
                            priority
                        />
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                            <span className="text-[#1B365D] dark:text-white">{nav("projects")}</span>
                        </h1>
                        <p className="mt-4 text-lg lg:text-xl text-muted-foreground max-w-2xl">
                            {t("subtitle")}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Category Filter */}
            <section className="py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap justify-center gap-3"
                    >
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeCategory === cat
                                    ? "bg-[#1B365D] dark:bg-[#D4AF37] text-white dark:text-[#1B365D] shadow-lg"
                                    : "bg-card text-muted-foreground border border-border hover:border-[#D4AF37]/50 hover:text-foreground"
                                    }`}
                            >
                                {categoryLabels[cat] || cat}
                            </button>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="py-8 pb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {filteredProjects.length > 0 ? (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredProjects.map((project) => (
                                <motion.div
                                    key={project.id}
                                    variants={itemVariants}
                                    className="group"
                                >
                                    <Link href={`/${locale}/projects/${project.slug}`}>
                                        <div className="bg-card border border-border rounded-2xl overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-500 hover:shadow-xl h-full flex flex-col">
                                            {/* Image */}
                                            <div className="relative h-60 overflow-hidden bg-muted shrink-0">
                                                {project.mainImage ? (
                                                    <img
                                                        src={project.mainImage}
                                                        alt={getLocalized(project, "title")}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
                                                        <svg className="w-10 h-10 mb-2 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        <span className="text-xs">{t("noImage")}</span>
                                                    </div>
                                                )}
                                                {/* Category + Year overlay */}
                                                <div className="absolute top-3 left-3 flex gap-2">
                                                    <span className="px-3 py-1 rounded-lg bg-[#1B365D]/85 backdrop-blur-sm text-[#D4AF37] text-xs font-semibold">
                                                        {categoryLabels[project.category] || project.category}
                                                    </span>
                                                    {project.year && (
                                                        <span className="px-3 py-1 rounded-lg bg-white/90 dark:bg-[#0d1b2e]/90 backdrop-blur-sm border border-border/50 text-xs font-medium text-foreground">
                                                            {project.year}
                                                        </span>
                                                    )}
                                                </div>
                                                {/* Location overlay */}
                                                {project.location && (
                                                    <div className="absolute bottom-3 left-3">
                                                        <span className="flex items-center gap-1 px-3 py-1 rounded-lg bg-white/90 dark:bg-[#0d1b2e]/90 backdrop-blur-sm border border-border/50 text-xs font-medium text-foreground">
                                                            <svg className="w-3 h-3 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                            {project.location}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="p-6 flex-1 flex flex-col">
                                                <h3 className="text-xl font-bold text-card-foreground mb-3 group-hover:text-[#D4AF37] transition-colors duration-300 line-clamp-2">
                                                    {getLocalized(project, "title")}
                                                </h3>

                                                <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
                                                    {getLocalized(project, "description")}
                                                </p>

                                                <div className="flex items-center text-[#D4AF37] font-semibold text-sm mt-auto pt-4 border-t border-border group-hover:gap-3 gap-2 transition-all duration-300">
                                                    {t("viewDetails")}
                                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-20"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 7.5h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                                </svg>
                            </div>
                            <p className="text-lg text-muted-foreground">{t("noProjects")}</p>
                        </motion.div>
                    )}
                </div>
            </section>
        </div>
    );
}
