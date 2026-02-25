"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export function HomeClient({
    recentProjects,
    latestNews,
    locale
}: {
    recentProjects: any[];
    latestNews: any[];
    locale: string;
}) {
    const t = useTranslations();

    // Helper to get localized field based on locale
    const getLocalized = (item: any, field: string) => {
        const key = `${field}${locale.charAt(0).toUpperCase() + locale.slice(1)}`;
        return item[key] || item[`${field}De`] || "";
    };

    return (
        <div className="relative overflow-hidden transition-colors duration-300">
            {/* Hero Section */}
            <section className="relative min-h-[calc(100vh-5rem)] flex items-center">
                {/* Banner Background Image */}
                <div className="absolute inset-0">
                    <img
                        src="/images/anasayfa/ana-sayfa-banner.jpg"
                        alt="Enerva Elektrik Banner"
                        className="w-full h-full object-cover"
                    />
                    {/* Theme-aware overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/55 to-white/25 dark:from-[#0d1b2e]/70 dark:via-[#0d1b2e]/55 dark:to-[#0d1b2e]/25" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/75 via-transparent to-white/20 dark:from-[#0d1b2e]/75 dark:via-transparent dark:to-[#0d1b2e]/20" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
                    <div className="max-w-3xl">
                        {/* Logo */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="mb-6"
                        >
                            <Image
                                src="/images/enerva-logo.png"
                                alt="Enerva Elektrik Logo"
                                width={180}
                                height={60}
                                className="h-14 sm:h-16 lg:h-20 w-auto drop-shadow-lg"
                                priority
                            />
                        </motion.div>

                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1B365D]/10 dark:bg-white/10 backdrop-blur-sm border border-[#D4AF37]/40 text-sm font-medium text-[#D4AF37] mb-8"
                        >
                            <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" />
                            Hoch- & Mittelspannungstechnik
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6"
                        >
                            <span className="text-[#1B365D] dark:text-white">
                                {t("hero.title").split(" ")[0]}
                            </span> {" "}
                            <span className="gradient-text">
                                {t("hero.title").split(" ").slice(1).join(" ")}
                            </span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-lg sm:text-xl text-[#1B365D]/80 dark:text-white/80 max-w-2xl mb-10 leading-relaxed"
                        >
                            {t("hero.subtitle")}
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="flex flex-col sm:flex-row gap-4 mb-20 lg:mb-32"
                        >
                            <Link
                                href="/services"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#e0c35c] text-[#1B365D] font-bold text-base rounded-xl hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-105"
                            >
                                {t("hero.cta")}
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                                    />
                                </svg>
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1B365D]/10 dark:bg-white/10 border border-[#1B365D]/20 dark:border-white/20 text-[#1B365D] dark:text-white font-semibold text-base rounded-xl hover:bg-[#1B365D]/20 dark:hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                            >
                                {t("nav.contact")}
                            </Link>
                        </motion.div>
                    </div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
                    >
                        {[
                            { value: "15+", label: "Jahre Erfahrung" },
                            { value: "500+", label: "Projekte" },
                            { value: "50+", label: "Kunden" },
                            { value: "24/7", label: "Support" },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2 + index * 0.1 }}
                                className="bg-[#1B365D]/10 dark:bg-white/10 border border-[#1B365D]/10 dark:border-white/15 backdrop-blur-md rounded-xl p-6 text-center hover:border-[#D4AF37]/40 transition-all duration-300"
                            >
                                <div className="text-2xl lg:text-3xl font-bold gradient-text mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-[#1B365D]/70 dark:text-white/70">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Recent Projects Section */}
            {recentProjects.length > 0 && (
                <section className="py-24 bg-card/10 border-y border-border/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                                    Neueste <span className="gradient-text">Projekte</span>
                                </h2>
                                <p className="text-muted-foreground max-w-2xl">
                                    Ein kleiner Einblick in unsere aktuellsten Arbeiten und erfolgreichen Umsetzungen.
                                </p>
                            </div>
                            <Link
                                href="/projects"
                                className="inline-flex items-center text-[#D4AF37] hover:text-[#e0c35c] font-medium transition-colors"
                            >
                                Alle Projekte ansehen
                                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {recentProjects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ delay: 0.1 * index }}
                                >
                                    <Link href={`/projects/${project.slug}`} className="group block h-full">
                                        <div className="bg-card border border-border rounded-2xl overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-500 h-full flex flex-col">
                                            <div className="relative h-48 overflow-hidden bg-muted shrink-0">
                                                {project.mainImage ? (
                                                    <img
                                                        src={project.mainImage}
                                                        alt={getLocalized(project, "title")}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                                        Kein Bild
                                                    </div>
                                                )}
                                                <div className="absolute top-4 left-4">
                                                    <Badge className="bg-[#1B365D]/80 backdrop-blur-md text-[#D4AF37] border-none">
                                                        {project.category}
                                                    </Badge>
                                                </div>
                                            </div>
                                            <div className="p-6 flex-1 flex flex-col bg-card">
                                                <h3 className="text-xl font-bold text-card-foreground mb-2 group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                                                    {getLocalized(project, "title")}
                                                </h3>
                                                <p className="text-muted-foreground text-sm line-clamp-2 flex-1">
                                                    {getLocalized(project, "description")}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Latest News Section */}
            {latestNews.length > 0 && (
                <section className="py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                                    Aktuelles aus dem <span className="gradient-text">Blog</span>
                                </h2>
                                <p className="text-muted-foreground max-w-2xl">
                                    Bleiben Sie auf dem Laufenden mit Nachrichten und Insights aus unserem Team.
                                </p>
                            </div>
                            <Link
                                href="/blog"
                                className="inline-flex items-center text-[#D4AF37] hover:text-[#e0c35c] font-medium transition-colors"
                            >
                                Zum Blog wandern
                                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {latestNews.map((blog, index) => {
                                const slugKey = `slug${locale.charAt(0).toUpperCase() + locale.slice(1)}`;
                                const slug = blog[slugKey] || blog.slugDe;

                                return (
                                    <motion.div
                                        key={blog.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ delay: 0.1 * index }}
                                    >
                                        <Link href={`/blog/${slug}`} className="group block focus:outline-none h-full">
                                            <div className="flex flex-col sm:flex-row gap-6 bg-card border border-border rounded-2xl p-4 hover:border-[#D4AF37]/50 transition-all duration-500 h-full">
                                                <div className="w-full sm:w-48 h-48 rounded-xl overflow-hidden bg-muted shrink-0">
                                                    {blog.image ? (
                                                        <img
                                                            src={blog.image}
                                                            alt={getLocalized(blog, "title")}
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-muted">
                                                            Kein Bild
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1 flex flex-col py-2">
                                                    <div className="text-sm font-medium text-[#D4AF37] mb-2">
                                                        {new Date(blog.createdAt).toLocaleDateString(locale === "en" ? "en-US" : locale === "tr" ? "tr-TR" : "de-DE", {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
                                                    </div>
                                                    <h3 className="text-xl font-bold text-card-foreground mb-3 group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                                                        {getLocalized(blog, "title")}
                                                    </h3>
                                                    <div className="flex items-center text-muted-foreground font-medium text-sm mt-auto group-hover:text-foreground transition-colors">
                                                        Weiterlesen
                                                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
