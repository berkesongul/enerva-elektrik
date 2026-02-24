"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function ProjectsClient({ initialProjects, locale, categories }: { initialProjects: any[], locale: string, categories: string[] }) {
    const t = useTranslations("nav");
    const [activeCategory, setActiveCategory] = useState("ALL");

    const filteredProjects = activeCategory === "ALL"
        ? initialProjects
        : initialProjects.filter(p => p.category === activeCategory);

    // Helper to get localized field based on locale
    const getLocalized = (project: any, field: string) => {
        const key = `${field}${locale.charAt(0).toUpperCase() + locale.slice(1)}`;
        return project[key] || project[`${field}De`] || "";
    };

    return (
        <div className="min-h-screen transition-colors duration-300">
            {/* Header Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/img/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] mix-blend-overlay opacity-20"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1B365D]/50 border border-[#D4AF37]/30 text-[#D4AF37] text-sm font-medium mb-6"
                    >
                        <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
                        {t("projects")}
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 tracking-tight text-foreground"
                    >
                        Unsere <span className="gradient-text">Projekte</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-muted-foreground max-w-2xl mx-auto"
                    >
                        Entdecken Sie unsere erfolgreich abgeschlossenen Projekte im Bereich Hochspannung, Mittelspannung und Energiesysteme.
                    </motion.p>
                </div>
            </section>

            {/* Filter Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
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
                                ? "bg-[#D4AF37] text-[#1B365D] shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                                : "bg-card text-muted-foreground border border-border hover:border-[#D4AF37]/50 hover:text-foreground"
                                }`}
                        >
                            {cat === "ALL" ? "Alle Projekte" : cat}
                        </button>
                    ))}
                </motion.div>
            </section>

            {/* Projects Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="group"
                        >
                            <Link href={`/${locale}/projects/${project.slug}`}>
                                <div className="bg-card border border-border rounded-2xl overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-500 hover:shadow-[0_10px_40px_rgba(27,54,93,0.3)]">
                                    <div className="relative h-64 overflow-hidden bg-slate-800">
                                        {project.mainImage ? (
                                            <img
                                                src={project.mainImage}
                                                alt={getLocalized(project, "title")}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-600">
                                                Kein Bild
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4 flex gap-2">
                                            <Badge className="bg-[#1B365D]/80 backdrop-blur-md text-[#D4AF37] border-none">
                                                {project.category}
                                            </Badge>
                                            {project.year && (
                                                <Badge className="bg-black/50 backdrop-blur-md text-white border-none">
                                                    {project.year}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-card-foreground mb-2 group-hover:text-[#D4AF37] transition-colors">
                                            {getLocalized(project, "title")}
                                        </h3>
                                        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                                            {getLocalized(project, "description")}
                                        </p>
                                        <div className="flex items-center text-[#D4AF37] font-medium text-sm">
                                            Details ansehen
                                            <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {filteredProjects.length === 0 && (
                    <div className="text-center py-20 text-slate-500">
                        Keine Projekte in dieser Kategorie gefunden.
                    </div>
                )}
            </section>
        </div>
    );
}
