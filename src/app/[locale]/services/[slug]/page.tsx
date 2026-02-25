"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Activity, ShieldCheck, Cpu, ArrowDownToLine, Unplug, ArrowUpToLine, DraftingCompass } from "lucide-react";

const servicesData = [
    { id: "og", slug: "orta-gerilim", icon: Activity, image: "/images/hizmetler/orta-gerilim.jpg" },
    { id: "kompanzasyon", slug: "kompanzasyon-sistemleri", icon: ShieldCheck, image: "/images/hizmetler/kompanzasyon-sistemleri.png" },
    { id: "otomasyon", slug: "otomasyon-sistemleri", icon: Cpu, image: "/images/hizmetler/otomasyon-sistemleri.jpg" },
    { id: "yeralti", slug: "yer-alti-kanal", icon: ArrowDownToLine, image: "/images/hizmetler/yer-alti-kanal.jpg" },
    { id: "enerji", slug: "enerji-hat", icon: Unplug, image: "/images/hizmetler/enerji-hat.jpg" },
    { id: "direk", slug: "direk-montaj", icon: ArrowUpToLine, image: "/images/hizmetler/direk-montaj.jpg" },
    { id: "proje", slug: "proje-cizimi", icon: DraftingCompass, image: "/images/hizmetler/proje-çizimi.jpg" },
];

export default function ServiceDetailPage() {
    const t = useTranslations("servicesPage");
    const params = useParams();
    const slug = params.slug as string;

    const service = servicesData.find((s) => s.slug === slug);

    if (!service) {
        return (
            <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-background">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-foreground mb-4">404</h1>
                    <p className="text-muted-foreground mb-8">Service not found</p>
                    <Link
                        href="/services"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#e0c35c] text-[#1B365D] font-bold rounded-xl hover:shadow-lg transition-all"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {t("backToServices")}
                    </Link>
                </div>
            </div>
        );
    }

    const Icon = service.icon;

    // Get other services for the "Other Services" section
    const otherServices = servicesData.filter((s) => s.slug !== slug).slice(0, 3);

    return (
        <div className="bg-background text-foreground transition-colors duration-300">
            {/* Banner Section */}
            <section className="relative h-[50vh] min-h-[400px] flex items-center">
                {/* Banner Image */}
                <div className="absolute inset-0">
                    <img
                        src={service.image}
                        alt={t(`items.${service.id}.title`)}
                        className="w-full h-full object-cover"
                    />
                    {/* Theme-aware overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/60 to-white/30 dark:from-[#0d1b2e]/80 dark:via-[#0d1b2e]/60 dark:to-[#0d1b2e]/30" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-white/20 dark:from-[#0d1b2e]/90 dark:via-transparent dark:to-[#0d1b2e]/20" />
                </div>

                {/* Banner Content */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Back link */}
                        <Link
                            href="/services"
                            className="inline-flex items-center gap-2 text-sm font-medium text-[#1B365D]/70 dark:text-white/70 hover:text-[#D4AF37] transition-colors mb-6"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            {t("backToServices")}
                        </Link>

                        {/* Icon badge */}
                        <div className="w-14 h-14 rounded-xl bg-[#1B365D]/10 dark:bg-white/10 backdrop-blur-md border border-[#D4AF37]/30 flex items-center justify-center mb-6">
                            <Icon className="w-7 h-7 text-[#D4AF37]" strokeWidth={1.5} />
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight">
                            <span className="text-[#1B365D] dark:text-white">
                                {t(`items.${service.id}.title`)}
                            </span>
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16 lg:py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        {/* Short description */}
                        <p className="text-xl lg:text-2xl font-medium text-[#D4AF37] mb-8 leading-relaxed">
                            {t(`items.${service.id}.desc`)}
                        </p>

                        {/* Detailed content */}
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            <p className="text-foreground/80 leading-relaxed text-base lg:text-lg">
                                {t(`items.${service.id}.detail`)}
                            </p>
                        </div>
                    </motion.div>

                    {/* CTA Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="mt-16 p-8 bg-card border border-border rounded-2xl"
                    >
                        <p className="text-lg text-muted-foreground mb-6">
                            {t("contactCta")}
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#e0c35c] text-[#1B365D] font-bold text-base rounded-xl hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-105"
                        >
                            {t("contactButton")}
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Other Services Section */}
            <section className="py-16 lg:py-24 bg-card/30 border-t border-border/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-10">
                        {t("backToServices")}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {otherServices.map((otherService) => {
                            const OtherIcon = otherService.icon;
                            return (
                                <Link
                                    key={otherService.id}
                                    href={`/services/${otherService.slug}`}
                                    className="group block"
                                >
                                    <div className="bg-card border border-border rounded-2xl overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-500 hover:-translate-y-1">
                                        <div className="relative h-40 overflow-hidden">
                                            <img
                                                src={otherService.image}
                                                alt={t(`items.${otherService.id}.title`)}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                            <div className="absolute bottom-3 left-3">
                                                <div className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                                                    <OtherIcon className="w-4 h-4 text-[#D4AF37]" strokeWidth={1.5} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-5">
                                            <h3 className="text-lg font-bold text-foreground group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                                                {t(`items.${otherService.id}.title`)}
                                            </h3>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}
