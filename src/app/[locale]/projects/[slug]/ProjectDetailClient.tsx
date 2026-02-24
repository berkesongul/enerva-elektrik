"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function ProjectDetailClient({ project, locale }: { project: any, locale: string }) {
    const t = useTranslations("nav");

    const getLocalized = (field: string) => {
        const key = `${field}${locale.charAt(0).toUpperCase() + locale.slice(1)}`;
        return project[key] || project[`${field}De`] || "";
    };

    const title = getLocalized("title");
    const description = getLocalized("description");
    const client = getLocalized("client");
    const gallery = Array.isArray(project.gallery) ? project.gallery : [];

    return (
        <div className="min-h-screen pb-32 transition-colors duration-300">
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] flex items-end pb-20">
                <div className="absolute inset-0">
                    {project.mainImage ? (
                        <img
                            src={project.mainImage}
                            alt={title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-slate-900 border-b border-slate-800" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <Link
                            href={`/${locale}/projects`}
                            className="inline-flex items-center text-slate-400 hover:text-[#D4AF37] transition-colors mb-6 text-sm font-medium"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Zurück zu Projekten
                        </Link>

                        <div className="flex flex-wrap gap-3 mb-4">
                            <Badge className="bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 backdrop-blur-md px-3 py-1">
                                {project.category}
                            </Badge>
                            {project.year && (
                                <Badge className="bg-white/10 text-white border border-white/20 backdrop-blur-md px-3 py-1">
                                    {project.year}
                                </Badge>
                            )}
                            {project.location && (
                                <Badge className="bg-white/10 text-white border border-white/20 backdrop-blur-md px-3 py-1">
                                    <svg className="w-3.5 h-3.5 mr-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {project.location}
                                </Badge>
                            )}
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                            {title}
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-2 space-y-8"
                    >
                        <div className="prose dark:prose-invert prose-lg max-w-none prose-a:text-[#D4AF37]">
                            <div className="whitespace-pre-wrap font-light leading-relaxed">
                                {description}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-6"
                    >
                        {client && (
                            <div className="p-6 rounded-2xl bg-card border border-border">
                                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
                                    Kunde
                                </h3>
                                <p className="text-xl font-semibold text-card-foreground">
                                    {client}
                                </p>
                            </div>
                        )}

                        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1B365D] to-[#0a1526] border border-[#1B365D]/50 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-3xl" />
                            <h3 className="text-xl font-bold text-white mb-4 relative z-10">
                                Sie planen ein ähnliches Projekt?
                            </h3>
                            <p className="text-blue-100/70 text-sm mb-6 relative z-10">
                                Kontaktieren Sie uns für ein unverbindliches Beratungsgespräch.
                            </p>
                            <Link href={`/${locale}/contact`}>
                                <button className="w-full py-3 rounded-lg bg-[#D4AF37] text-[#1B365D] font-bold hover:bg-[#e0c35c] transition-colors relative z-10">
                                    Kontakt aufnehmen
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Image Gallery */}
                {gallery.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-20"
                    >
                        <h2 className="text-2xl font-bold text-foreground mb-8 border-b border-border pb-4">
                            Projektgalerie
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {gallery.map((img: string, idx: number) => (
                                <div key={idx} className="aspect-square rounded-xl overflow-hidden bg-slate-800 border border-slate-700/50 hover:border-[#D4AF37]/50 transition-colors group cursor-zoom-in">
                                    <img
                                        src={img}
                                        alt={`Gallery ${idx + 1}`}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </section>
        </div>
    );
}
