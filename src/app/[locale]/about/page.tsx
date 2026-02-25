"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";

const galleryImages = [
    { src: "/images/hizmetler/orta-gerilim.jpg", alt: "Orta Gerilim Sistemleri" },
    { src: "/images/hizmetler/kompanzasyon-sistemleri.png", alt: "Kompanzasyon Sistemleri" },
    { src: "/images/hizmetler/otomasyon-sistemleri.jpg", alt: "Otomasyon Sistemleri" },
    { src: "/images/hizmetler/yer-alti-kanal.jpg", alt: "Yer Altı Kanal Sistemleri" },
    { src: "/images/hizmetler/enerji-hat.jpg", alt: "Enerji Hat Kurulumu" },
    { src: "/images/hizmetler/direk-montaj.jpg", alt: "Direk Montaj" },
    { src: "/images/hizmetler/proje-çizimi.jpg", alt: "Proje Çizimi" },
];

export default function AboutPage() {
    const t = useTranslations("aboutPage");

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="bg-background text-foreground transition-colors duration-300">
            {/* Hero Banner */}
            <section className="relative h-[45vh] min-h-[350px] flex items-center">
                <div className="absolute inset-0">
                    <img
                        src="/images/anasayfa/ana-sayfa-banner.jpg"
                        alt="Enerva Elektrik"
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
                            <span className="text-[#1B365D] dark:text-white">{t("title")}</span>
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* Introduction + Image */}
            <section className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:text-foreground first-letter:float-left first-letter:mr-3">
                                {t("p1")}
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {t("p2")}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <div className="rounded-2xl overflow-hidden shadow-lg">
                                        <img
                                            src="/images/hizmetler/orta-gerilim.jpg"
                                            alt="Orta Gerilim"
                                            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="rounded-2xl overflow-hidden shadow-lg">
                                        <img
                                            src="/images/hizmetler/otomasyon-sistemleri.jpg"
                                            alt="Otomasyon"
                                            className="w-full h-56 object-cover hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4 pt-8">
                                    <div className="rounded-2xl overflow-hidden shadow-lg">
                                        <img
                                            src="/images/hizmetler/kompanzasyon-sistemleri.png"
                                            alt="Kompanzasyon"
                                            className="w-full h-56 object-cover hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="rounded-2xl overflow-hidden shadow-lg">
                                        <img
                                            src="/images/hizmetler/enerji-hat.jpg"
                                            alt="Enerji Hat"
                                            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Decorative accent */}
                            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-[#D4AF37]/30 rounded-2xl -z-10" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Technology Section with Full-Width Image */}
            <section className="py-16 lg:py-24 bg-card/30 border-y border-border/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="order-2 lg:order-1"
                        >
                            <div className="relative rounded-2xl overflow-hidden shadow-xl">
                                <img
                                    src="/images/hizmetler/proje-çizimi.jpg"
                                    alt="Proje Çizimi"
                                    className="w-full h-80 object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1B365D]/60 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-[#D4AF37] flex items-center justify-center">
                                            <svg className="w-5 h-5 text-[#1B365D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                        </div>
                                        <span className="text-white font-semibold text-lg">{t("valuesTitle")}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6 order-1 lg:order-2"
                        >
                            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                                {t("techTitle")}
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {t("p3")}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                                {t("valuesTitle")}
                            </h2>
                            <div className="p-6 rounded-2xl bg-card border border-border relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <p className="relative z-10 text-lg text-muted-foreground leading-relaxed">
                                    {t("p4")}
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="relative rounded-2xl overflow-hidden shadow-xl">
                                <img
                                    src="/images/hizmetler/direk-montaj.jpg"
                                    alt="Direk Montaj"
                                    className="w-full h-80 object-cover"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Sustainability + Image */}
            <section className="py-16 lg:py-24 bg-card/30 border-y border-border/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="order-2 lg:order-1"
                        >
                            <div className="relative rounded-2xl overflow-hidden shadow-xl">
                                <img
                                    src="/images/hizmetler/yer-alti-kanal.jpg"
                                    alt="Yer Altı Kanal"
                                    className="w-full h-80 object-cover"
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6 order-1 lg:order-2"
                        >
                            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                                {t("sustainTitle")}
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {t("p5")}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Quote / Closing Statement */}
            <section className="py-16 lg:py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <div className="w-16 h-1 bg-[#D4AF37] mx-auto rounded-full mb-8" />
                        <blockquote className="text-xl lg:text-2xl text-foreground leading-relaxed font-medium italic mb-8">
                            &ldquo;{t("p6")}&rdquo;
                        </blockquote>
                        <div className="w-16 h-1 bg-[#D4AF37] mx-auto rounded-full" />
                    </motion.div>
                </div>
            </section>

            {/* Image Gallery */}
            <section className="pb-16 lg:pb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {galleryImages.map((img, index) => (
                            <motion.div
                                key={img.src}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: index * 0.05 }}
                                className={`rounded-xl overflow-hidden shadow-md ${index === 0 ? "col-span-2 row-span-2" : ""
                                    }`}
                            >
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    className={`w-full object-cover hover:scale-105 transition-transform duration-500 ${index === 0 ? "h-full min-h-[300px]" : "h-48"
                                        }`}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
