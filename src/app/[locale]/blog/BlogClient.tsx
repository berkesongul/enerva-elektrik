"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export function BlogClient({ initialBlogs, locale }: { initialBlogs: any[], locale: string }) {
    const t = useTranslations("blogPage");
    const nav = useTranslations("nav");

    const getLocalized = (blog: any, field: string) => {
        const key = `${field}${locale.charAt(0).toUpperCase() + locale.slice(1)}`;
        return blog[key] || blog[`${field}De`] || "";
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
                        alt="Enerva Elektrik Blog"
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
                            <span className="text-[#1B365D] dark:text-white">{nav("blog")}</span>
                        </h1>
                        <p className="mt-4 text-lg lg:text-xl text-muted-foreground max-w-2xl">
                            {t("subtitle")}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {initialBlogs.length > 0 ? (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {initialBlogs.map((blog) => {
                                const slugKey = `slug${locale.charAt(0).toUpperCase() + locale.slice(1)}`;
                                const slug = blog[slugKey] || blog.slugDe;

                                return (
                                    <motion.div
                                        key={blog.id}
                                        variants={itemVariants}
                                        className="group"
                                    >
                                        <Link href={`/${locale}/blog/${slug}`}>
                                            <div className="bg-card border border-border rounded-2xl overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-500 hover:shadow-xl h-full flex flex-col">
                                                {/* Image */}
                                                <div className="relative h-56 overflow-hidden bg-muted shrink-0">
                                                    {blog.image ? (
                                                        <img
                                                            src={blog.image}
                                                            alt={getLocalized(blog, "title")}
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
                                                    {/* Date overlay */}
                                                    <div className="absolute top-3 left-3">
                                                        <div className="px-3 py-1.5 rounded-lg bg-white/90 dark:bg-[#0d1b2e]/90 backdrop-blur-sm border border-border/50 text-xs font-medium text-foreground">
                                                            <span className="flex items-center gap-1.5">
                                                                <svg className="w-3.5 h-3.5 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                </svg>
                                                                {new Date(blog.createdAt).toLocaleDateString(
                                                                    locale === "en" ? "en-US" : locale === "tr" ? "tr-TR" : "de-DE",
                                                                    { year: "numeric", month: "long", day: "numeric" }
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Content */}
                                                <div className="p-6 flex-1 flex flex-col">
                                                    <h3 className="text-xl font-bold text-card-foreground mb-3 group-hover:text-[#D4AF37] transition-colors duration-300 line-clamp-2">
                                                        {getLocalized(blog, "title")}
                                                    </h3>

                                                    <div
                                                        className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1 leading-relaxed"
                                                        dangerouslySetInnerHTML={{ __html: getLocalized(blog, "content") }}
                                                    />

                                                    <div className="flex items-center text-[#D4AF37] font-semibold text-sm mt-auto pt-4 border-t border-border group-hover:gap-3 gap-2 transition-all duration-300">
                                                        {t("readMore")}
                                                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-20"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                </svg>
                            </div>
                            <p className="text-lg text-muted-foreground">{t("noPosts")}</p>
                        </motion.div>
                    )}
                </div>
            </section>
        </div>
    );
}
