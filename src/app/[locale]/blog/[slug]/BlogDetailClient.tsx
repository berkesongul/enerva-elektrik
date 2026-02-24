"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function BlogDetailClient({ blog, locale }: { blog: any, locale: string }) {
    const t = useTranslations("nav");

    const getLocalized = (field: string) => {
        const key = `${field}${locale.charAt(0).toUpperCase() + locale.slice(1)}`;
        return blog[key] || blog[`${field}De`] || "";
    };

    const title = getLocalized("title");
    const content = getLocalized("content");

    return (
        <div className="min-h-screen pb-32 transition-colors duration-300">
            {/* Hero Section */}
            <section className="relative pt-32 pb-12 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#1B365D]/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <Link
                            href={`/${locale}/blog`}
                            className="inline-flex items-center text-slate-400 hover:text-[#D4AF37] transition-colors mb-8 text-sm font-medium"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Zurück zur Übersicht
                        </Link>

                        <div className="flex items-center gap-4 mb-6">
                            <Badge className="bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 backdrop-blur-md px-3 py-1">
                                Neuigkeiten
                            </Badge>
                            <span className="flex items-center text-sm text-muted-foreground">
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

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                            {title}
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* Featured Image */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden bg-slate-800 border border-slate-700/50 shadow-2xl"
                >
                    {blog.image ? (
                        <img
                            src={blog.image}
                            alt={title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground bg-card">
                            <svg className="w-12 h-12 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-sm">Kein Beitragsbild</span>
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Content Section */}
            <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="prose dark:prose-invert prose-lg max-w-none 
                               prose-p:leading-relaxed 
                               prose-headings:font-bold
                               prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-[#D4AF37]
                               prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                               prose-a:text-[#D4AF37] prose-a:no-underline hover:prose-a:underline
                               prose-strong:font-bold
                               prose-li:marker:text-[#D4AF37]
                               prose-blockquote:border-l-[#D4AF37] prose-blockquote:bg-card prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-lg prose-blockquote:italic
                               prose-img:rounded-xl"
                    dangerouslySetInnerHTML={{ __html: content }}
                />

                {/* Share/Actions Footer */}
                <div className="mt-20 pt-8 border-t border-border flex items-center justify-between">
                    <div className="flex gap-4">
                        <button className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                            </svg>
                        </button>
                        <button className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
