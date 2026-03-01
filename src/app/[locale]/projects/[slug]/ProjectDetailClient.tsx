"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";

export function ProjectDetailClient({ project, locale }: { project: any, locale: string }) {
    const t = useTranslations("projectsPage");

    const getLocalized = (field: string) => {
        const key = `${field}${locale.charAt(0).toUpperCase() + locale.slice(1)}`;
        return project[key] || project[`${field}De`] || "";
    };

    const title = getLocalized("title");
    const description = getLocalized("description");
    const client = getLocalized("client");
    const gallery = Array.isArray(project.gallery) ? project.gallery : [];

    return (
        <div className="bg-background text-foreground min-h-screen pb-32 transition-colors duration-300">
            {/* Hero Banner */}
            <section className="relative h-[45vh] min-h-[350px] flex items-end">
                <div className="absolute inset-0">
                    {project.mainImage ? (
                        <img
                            src={project.mainImage}
                            alt={title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <img
                            src="/images/anasayfa/ana-sayfa-banner.jpg"
                            alt="Enerva Elektrik"
                            className="w-full h-full object-cover"
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-white/20 dark:from-[#0d1b2e] dark:via-[#0d1b2e]/60 dark:to-[#0d1b2e]/20" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link
                            href={`/${locale}/projects`}
                            className="inline-flex items-center text-muted-foreground hover:text-[#D4AF37] transition-colors mb-6 text-sm font-medium"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            {t("backToProjects")}
                        </Link>

                        <div className="flex flex-wrap gap-3 mb-4">
                            <span className="px-3 py-1 rounded-lg bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-semibold">
                                {project.category}
                            </span>
                            {project.year && (
                                <span className="px-3 py-1 rounded-lg bg-card/80 backdrop-blur-sm border border-border text-xs font-medium text-foreground">
                                    {project.year}
                                </span>
                            )}
                            {project.location && (
                                <span className="flex items-center gap-1 px-3 py-1 rounded-lg bg-card/80 backdrop-blur-sm border border-border text-xs font-medium text-foreground">
                                    <svg className="w-3 h-3 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {project.location}
                                </span>
                            )}
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                            {title}
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-2 space-y-8"
                    >
                        <div className="prose dark:prose-invert prose-lg max-w-none prose-a:text-[#D4AF37] prose-p:text-muted-foreground prose-headings:text-foreground">
                            <div className="whitespace-pre-wrap leading-relaxed">
                                {description}
                            </div>
                        </div>
                    </motion.div>

                    {/* Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-6"
                    >
                        {/* Client Card */}
                        {client && (
                            <div className="p-6 rounded-2xl bg-card border border-border relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative z-10">
                                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                                        {t("client")}
                                    </h3>
                                    <p className="text-xl font-bold text-card-foreground">
                                        {client}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* CTA Card */}
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1B365D] to-[#0f2340] text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#D4AF37]/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-3">
                                    {t("ctaTitle")}
                                </h3>
                                <p className="text-white/70 text-sm mb-6 leading-relaxed">
                                    {t("ctaDesc")}
                                </p>
                                <Link href={`/${locale}/contact`}>
                                    <button className="w-full py-3 rounded-xl bg-[#D4AF37] hover:bg-[#e0c35c] text-[#1B365D] font-bold transition-all duration-300 hover:shadow-lg active:scale-[0.98]">
                                        {t("ctaButton")}
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Image Gallery */}
                {gallery.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-16"
                    >
                        <h2 className="text-2xl font-bold text-foreground mb-8 pb-4 border-b border-border">
                            {t("gallery")}
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {gallery.map((img: string, idx: number) => (
                                <div key={idx} className="aspect-square rounded-xl overflow-hidden bg-muted border border-border hover:border-[#D4AF37]/50 transition-colors duration-300 group">
                                    <img
                                        src={img}
                                        alt={`${title} - ${idx + 1}`}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Back button */}
                <div className="mt-16 pt-8 border-t border-border">
                    <Link
                        href={`/${locale}/projects`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1B365D] hover:bg-[#264a7a] dark:bg-[#D4AF37] dark:hover:bg-[#e0c35c] text-white dark:text-[#1B365D] font-semibold transition-all duration-300 text-sm"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        {t("backToProjects")}
                    </Link>
                </div>
            </section>
        </div>
    );
}
