"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function BlogClient({ initialBlogs, locale }: { initialBlogs: any[], locale: string }) {
    const t = useTranslations("nav");

    // Helper to get localized field based on locale
    const getLocalized = (blog: any, field: string) => {
        const key = `${field}${locale.charAt(0).toUpperCase() + locale.slice(1)}`;
        return blog[key] || blog[`${field}De`] || "";
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
                        {t("blog")}
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 tracking-tight text-foreground"
                    >
                        Aktuelles & <span className="gradient-text">Neuigkeiten</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-muted-foreground max-w-2xl mx-auto"
                    >
                        Bleiben Sie informiert über unsere neuesten Entwicklungen, Branchentrends und Insights im Bereich der Energietechnik.
                    </motion.p>
                </div>
            </section>

            {/* Blogs Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {initialBlogs.map((blog, index) => {
                        const slugKey = `slug${locale.charAt(0).toUpperCase() + locale.slice(1)}`;
                        const slug = blog[slugKey] || blog.slugDe;

                        return (
                            <motion.div
                                key={blog.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * index }}
                                className="group"
                            >
                                <Link href={`/${locale}/blog/${slug}`}>
                                    <div className="bg-card border border-border rounded-2xl overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-500 hover:shadow-[0_10px_40px_rgba(27,54,93,0.3)] h-full flex flex-col">
                                        <div className="relative h-56 overflow-hidden bg-slate-800 shrink-0">
                                            {blog.image ? (
                                                <img
                                                    src={blog.image}
                                                    alt={getLocalized(blog, "title")}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-600">
                                                    Kein Bild
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-6 flex-1 flex flex-col">
                                            <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                                                <span className="flex items-center">
                                                    <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    {new Date(blog.createdAt).toLocaleDateString(locale === "en" ? "en-US" : locale === "tr" ? "tr-TR" : "de-DE", {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </span>
                                            </div>

                                            <h3 className="text-xl font-bold text-card-foreground mb-3 group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                                                {getLocalized(blog, "title")}
                                            </h3>

                                            <div
                                                className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1"
                                                dangerouslySetInnerHTML={{ __html: getLocalized(blog, "content") }}
                                            />

                                            <div className="flex items-center text-[#D4AF37] font-medium text-sm mt-auto pt-4 border-t border-border">
                                                Weiterlesen
                                                <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

                {initialBlogs.length === 0 && (
                    <div className="text-center py-20 text-slate-500">
                        Keine Blogbeiträge gefunden.
                    </div>
                )}
            </section>
        </div>
    );
}
