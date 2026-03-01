"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Activity, ShieldCheck, Cpu, ArrowDownToLine, Unplug, ArrowUpToLine, DraftingCompass, ChevronLeft, ChevronRight } from "lucide-react";

const services = [
    { id: "og", slug: "orta-gerilim", icon: Activity, image: "/images/hizmetler/orta-gerilim.jpg" },
    { id: "kompanzasyon", slug: "kompanzasyon-sistemleri", icon: ShieldCheck, image: "/images/hizmetler/kompanzasyon-sistemleri.png" },
    { id: "otomasyon", slug: "otomasyon-sistemleri", icon: Cpu, image: "/images/hizmetler/otomasyon-sistemleri.jpg" },
    { id: "yeralti", slug: "yer-alti-kanal", icon: ArrowDownToLine, image: "/images/hizmetler/yer-alti-kanal.jpg" },
    { id: "enerji", slug: "enerji-hat", icon: Unplug, image: "/images/hizmetler/enerji-hat.jpg" },
    { id: "direk", slug: "direk-montaj", icon: ArrowUpToLine, image: "/images/hizmetler/direk-montaj.jpg" },
    { id: "proje", slug: "proje-cizimi", icon: DraftingCompass, image: "/images/hizmetler/proje-çizimi.jpg" },
];

const brands = [
    { id: "schneider", name: "Schneider Electric", logo: "/brands/schneider.png" },
    { id: "legrand", name: "Legrand", logo: "/brands/legrand.png" },
    { id: "chint", name: "Chint", logo: "/brands/chintelectronics.png" },
    { id: "adalpano", name: "Adalpano", logo: "/brands/adalpano.png" },
    { id: "forlife", name: "Forlife", logo: "/brands/forlife_professional.png" },
    { id: "hascelik", name: "Hasçelik Kablo", logo: "/brands/hascelik_kablo.png" },
    { id: "oznur", name: "Öznur Kablo", logo: "/brands/oznurkablo.png" },
    { id: "raychem", name: "Raychem", logo: "/brands/raychem.png" },
];

export function HomeClient({
    recentProjects,
    latestNews,
    locale
}: {
    recentProjects: any[];
    latestNews: any[];
    locale: string;
}) {
    const t = useTranslations("hero");
    const n = useTranslations("nav");
    const h = useTranslations("homePage");
    const st = useTranslations("servicesPage");
    const ct = useTranslations("contactPage");

    const [currentSlide, setCurrentSlide] = useState(0);

    // Filter services that have images for the slider (we use the first 6)
    const sliderImages = services.slice(0, 6).map(s => s.image);

    // Try to get slides array from translations, fallback to empty array to avoid errors
    const slides = (() => {
        try {
            // we use raw to get the array of objects if next-intl supports it
            return t.raw("slides") as { title: string, subtitle: string }[];
        } catch (e) {
            return [];
        }
    })();


    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
        }, 7000); // 7 seconds

        return () => clearInterval(timer);
    }, [sliderImages.length]);

    const getLocalized = (item: any, field: string) => {
        const key = `${field}${locale.charAt(0).toUpperCase() + locale.slice(1)}`;
        return item[key] || item[`${field}De`] || "";
    };

    const sectionHeader = (
        title: string,
        subtitle: string,
        linkHref: string,
        linkText: string
    ) => (
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
                    {title}
                </h2>
                <p className="text-muted-foreground max-w-2xl leading-relaxed">
                    {subtitle}
                </p>
            </div>
            <Link
                href={linkHref}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1B365D] dark:bg-[#D4AF37] text-white dark:text-[#1B365D] font-semibold text-sm hover:shadow-lg transition-all duration-300 shrink-0"
            >
                {linkText}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </Link>
        </div>
    );

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="relative overflow-hidden transition-colors duration-300">

            {/* ══════════════════════════════════════════════
                HERO SECTION
            ══════════════════════════════════════════════ */}
            <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center text-center">
                <div className="absolute inset-0 bg-black/80 dark:bg-black/90 z-0">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={currentSlide}
                            src={sliderImages[currentSlide]}
                            alt="Enerva Elektrik Banner Slide"
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="w-full h-full object-cover absolute inset-0"
                        />
                    </AnimatePresence>
                    {/* Reduced opacity overlays for better visibility of slides while keeping text readable */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/40 to-black/50 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b2e]/60 via-transparent to-transparent z-10" />
                </div>

                <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full flex flex-col items-center">
                    <div className="max-w-4xl flex flex-col items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="mb-8"
                        >
                            <Image
                                src="/images/enerva-logo.png"
                                alt="Enerva Elektrik Logo"
                                width={240}
                                height={80}
                                className="h-16 sm:h-20 lg:h-24 w-auto drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
                                priority
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-black/40 backdrop-blur-md border border-[#D4AF37]/50 text-sm sm:text-md font-semibold text-[#f0cf5f] mb-10 shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                        >
                            <span className="w-2.5 h-2.5 bg-[#D4AF37] rounded-full animate-pulse shadow-[0_0_8px_#D4AF37]" />
                            {h("badge")}
                        </motion.div>

                        <div className="min-h-[160px] sm:min-h-[200px] flex flex-col justify-center items-center w-full relative">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`text-${currentSlide}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                    className="flex flex-col items-center w-full"
                                >
                                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight mb-6 text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] px-4">
                                        {slides[currentSlide]?.title ? (
                                            <>
                                                <span>{slides[currentSlide].title.split(" ")[0]}</span>{" "}
                                                <span className="text-[#D4AF37] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                                    {slides[currentSlide].title.split(" ").slice(1).join(" ")}
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Elektrik Enerji</span>{" "}
                                                <span className="text-[#D4AF37] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                                    Çözümleri
                                                </span>
                                            </>
                                        )}
                                    </h1>

                                    <p className="text-lg sm:text-2xl text-gray-100 max-w-3xl mb-10 leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-medium px-4">
                                        {slides[currentSlide]?.subtitle || "Yüksek ve orta gerilim tekniğinde güvenilir ortağınız"}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col sm:flex-row gap-4 mt-8 lg:mt-12 mb-20 lg:mb-32 z-20"
                        >
                            <Link
                                href="/services"
                                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-gradient-to-r from-[#D4AF37] to-[#e0c35c] text-[#1B365D] font-bold text-lg rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_25px_rgba(212,175,55,0.6)] transition-all duration-300 hover:scale-105"
                            >
                                {t("cta")}
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold text-base rounded-xl hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                            >
                                {n("contact")}
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
                            { value: "15+", label: h("statYears") },
                            { value: "500+", label: h("statProjects") },
                            { value: "50+", label: h("statClients") },
                            { value: "24/7", label: h("statSupport") },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2 + index * 0.1 }}
                                className="bg-white/10 border border-white/15 backdrop-blur-md rounded-xl p-6 text-center hover:border-[#D4AF37]/50 transition-all duration-300 shadow-lg"
                            >
                                <div className="text-2xl lg:text-3xl font-bold text-[#D4AF37] drop-shadow-md mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-sm font-medium text-white/90 drop-shadow-sm">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Slider Controls */}
                <button
                    onClick={prevSlide}
                    className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-black/30 text-white/80 hover:bg-black/60 hover:text-white backdrop-blur-sm border border-white/10 transition-all duration-300"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-black/30 text-white/80 hover:bg-black/60 hover:text-white backdrop-blur-sm border border-white/10 transition-all duration-300"
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
                </button>
            </section>

            {/* ══════════════════════════════════════════════
                ABOUT PREVIEW
            ══════════════════════════════════════════════ */}
            <section className="py-20 lg:py-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                    >
                        {/* Image */}
                        <div className="relative h-[400px] rounded-2xl overflow-hidden border border-border">
                            <img
                                src="/images/anasayfa/ana-sayfa-banner.jpg"
                                alt="Enerva Elektrik Hakkımızda"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                            <div className="absolute bottom-6 left-6">
                                <Image
                                    src="/images/enerva-logo.png"
                                    alt="Enerva Logo"
                                    width={120}
                                    height={40}
                                    className="h-10 w-auto drop-shadow-lg"
                                />
                            </div>
                        </div>

                        {/* Text */}
                        <div>

                            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                                {h("aboutTitle")}
                            </h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                {h("aboutP1")}
                            </p>
                            <p className="text-muted-foreground leading-relaxed mb-8">
                                {h("aboutP2")}
                            </p>
                            <Link
                                href="/about"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1B365D] dark:bg-[#D4AF37] text-white dark:text-[#1B365D] font-semibold text-sm hover:shadow-lg transition-all duration-300"
                            >
                                {h("seeMore")}
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section >

            {/* ══════════════════════════════════════════════
                SERVICES PREVIEW
            ══════════════════════════════════════════════ */}
            < section className="py-20 lg:py-28 bg-card/30 border-y border-border/50" >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {sectionHeader(
                        h("servicesTitle"),
                        h("servicesSubtitle"),
                        "/services",
                        h("seeMore")
                    )}

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {services.slice(0, 4).map((service) => {
                            const Icon = service.icon;
                            return (
                                <motion.div key={service.id} variants={itemVariants}>
                                    <Link href={`/services/${service.slug}`} className="group block h-full">
                                        <div className="bg-card border border-border rounded-2xl overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-500 h-full flex flex-col">
                                            <div className="relative h-40 overflow-hidden">
                                                <img
                                                    src={service.image}
                                                    alt={st(`items.${service.id}.title`)}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                                <div className="absolute bottom-3 left-3">
                                                    <div className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                                                        <Icon className="w-4 h-4 text-[#D4AF37]" strokeWidth={1.5} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-5 flex-1 flex flex-col">
                                                <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                                                    {st(`items.${service.id}.title`)}
                                                </h3>
                                                <p className="text-muted-foreground text-sm line-clamp-2 flex-1">
                                                    {st(`items.${service.id}.desc`)}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section >

            {/* ══════════════════════════════════════════════
                PROJECTS PREVIEW
            ══════════════════════════════════════════════ */}
            < section className="py-20 lg:py-28" >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {sectionHeader(
                        h("projectsTitle"),
                        h("projectsSubtitle"),
                        "/projects",
                        h("seeMore")
                    )}

                    {recentProjects.length > 0 ? (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-6"
                        >
                            {recentProjects.map((project) => (
                                <motion.div key={project.id} variants={itemVariants}>
                                    <Link href={`/projects/${project.slug}`} className="group block h-full">
                                        <div className="bg-card border border-border rounded-2xl overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-500 h-full flex flex-col">
                                            <div className="relative h-52 overflow-hidden bg-muted shrink-0">
                                                {project.mainImage ? (
                                                    <img
                                                        src={project.mainImage}
                                                        alt={getLocalized(project, "title")}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                                        <svg className="w-10 h-10 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                    </div>
                                                )}
                                                {project.category && (
                                                    <div className="absolute top-3 left-3">
                                                        <span className="px-3 py-1 rounded-lg bg-[#1B365D]/85 backdrop-blur-sm text-[#D4AF37] text-xs font-semibold">
                                                            {project.category}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-6 flex-1 flex flex-col bg-card">
                                                <h3 className="text-lg font-bold text-card-foreground mb-2 group-hover:text-[#D4AF37] transition-colors line-clamp-2">
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
                        </motion.div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                                <svg className="w-7 h-7 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 7.5h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" /></svg>
                            </div>
                            <p className="text-muted-foreground">{h("noProjectsYet")}</p>
                        </div>
                    )}
                </div>
            </section >

            {/* ══════════════════════════════════════════════
                BRANDS PREVIEW
            ══════════════════════════════════════════════ */}
            < section className="py-20 lg:py-28 bg-card/30 border-y border-border/50" >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {sectionHeader(
                        h("brandsTitle"),
                        h("brandsSubtitle"),
                        "/brands",
                        h("seeMore")
                    )}

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
                    >
                        {brands.map((brand) => (
                            <motion.div
                                key={brand.id}
                                variants={itemVariants}
                                whileHover={{ y: -4 }}
                                className="group aspect-video bg-card border border-border rounded-2xl flex items-center justify-center p-6 hover:border-[#D4AF37]/50 transition-all duration-300 hover:shadow-lg relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500 opacity-70 group-hover:opacity-100">
                                    <Image
                                        src={brand.logo}
                                        alt={`${brand.name} logo`}
                                        fill
                                        className="object-contain p-4"
                                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section >

            {/* ══════════════════════════════════════════════
                BLOG PREVIEW
            ══════════════════════════════════════════════ */}
            < section className="py-20 lg:py-28" >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {sectionHeader(
                        h("blogTitle"),
                        h("blogSubtitle"),
                        "/blog",
                        h("seeMore")
                    )}

                    {latestNews.length > 0 ? (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-8"
                        >
                            {latestNews.map((blog) => {
                                const slugKey = `slug${locale.charAt(0).toUpperCase() + locale.slice(1)}`;
                                const slug = blog[slugKey] || blog.slugDe;

                                return (
                                    <motion.div key={blog.id} variants={itemVariants}>
                                        <Link href={`/blog/${slug}`} className="group block h-full">
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
                                                            <svg className="w-8 h-8 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1 flex flex-col py-2">
                                                    <div className="text-sm font-medium text-[#D4AF37] mb-2">
                                                        {new Date(blog.createdAt).toLocaleDateString(locale === "en" ? "en-US" : locale === "tr" ? "tr-TR" : "de-DE", {
                                                            year: 'numeric', month: 'long', day: 'numeric'
                                                        })}
                                                    </div>
                                                    <h3 className="text-xl font-bold text-card-foreground mb-3 group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                                                        {getLocalized(blog, "title")}
                                                    </h3>
                                                    <div className="flex items-center text-muted-foreground font-medium text-sm mt-auto group-hover:text-foreground transition-colors">
                                                        {h("readMore")}
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
                        </motion.div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                                <svg className="w-7 h-7 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                            </div>
                            <p className="text-muted-foreground">{h("noBlogsYet")}</p>
                        </div>
                    )}
                </div>
            </section >

            {/* ══════════════════════════════════════════════
                CONTACT SECTION (at the bottom)
            ══════════════════════════════════════════════ */}
            < section className="py-20 lg:py-28 bg-gradient-to-b from-card/30 to-background border-t border-border/50" >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-center mb-12"
                    >

                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
                            {h("contactTitle")}
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            {ct("subtitle")}
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
                    >
                        {/* Contact Cards */}
                        {[
                            {
                                icon: (
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                    </svg>
                                ),
                                title: ct("phone"),
                                value: "+90 (___) ___ __ __",
                                href: "tel:+90",
                            },
                            {
                                icon: (
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                    </svg>
                                ),
                                title: ct("email"),
                                value: "info@enervaelektrik.com",
                                href: "mailto:info@enervaelektrik.com",
                            },
                            {
                                icon: (
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                    </svg>
                                ),
                                title: ct("address"),
                                value: ct("addressValue"),
                            },
                            {
                                icon: (
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ),
                                title: ct("workingHours"),
                                value: ct("workingHoursValue"),
                            },
                        ].map((item, index) => (
                            <motion.div key={index} variants={itemVariants}>
                                {item.href ? (
                                    <a href={item.href} className="block">
                                        <div className="bg-card border border-border rounded-2xl p-6 hover:border-[#D4AF37]/50 transition-all duration-300 h-full group">
                                            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-4 group-hover:bg-[#D4AF37]/20 transition-colors">
                                                {item.icon}
                                            </div>
                                            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                                                {item.title}
                                            </h4>
                                            <p className="text-foreground font-medium">
                                                {item.value}
                                            </p>
                                        </div>
                                    </a>
                                ) : (
                                    <div className="bg-card border border-border rounded-2xl p-6 h-full">
                                        <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-4">
                                            {item.icon}
                                        </div>
                                        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                                            {item.title}
                                        </h4>
                                        <p className="text-foreground font-medium">
                                            {item.value}
                                        </p>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Map + CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 lg:grid-cols-5 gap-6"
                    >
                        <div className="lg:col-span-3 rounded-2xl overflow-hidden border border-border min-h-[300px] flex">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3060.0!2d32.85!3d39.92!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDU1JzEyLjAiTiAzMsKwNTEnMDAuMCJF!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
                                className="w-full h-full border-0 flex-1"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>

                        <div className="lg:col-span-2 flex flex-col gap-6 h-full">
                            {/* WhatsApp CTA */}
                            <div className="bg-gradient-to-br from-[#25D366]/10 to-[#25D366]/5 border border-[#25D366]/30 rounded-2xl p-6 flex-1 flex flex-col justify-center">
                                <div className="w-12 h-12 rounded-xl bg-[#25D366]/20 flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-foreground mb-2">{ct("directContactTitle")}</h3>
                                <p className="text-muted-foreground text-sm mb-4">{ct("directContactDesc")}</p>
                                <a
                                    href="https://wa.me/90"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold transition-all"
                                >
                                    WhatsApp
                                </a>
                            </div>

                            {/* Contact CTA */}
                            <div className="bg-gradient-to-br from-[#1B365D] to-[#0f2340] rounded-2xl p-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                                <div className="relative z-10">
                                    <h3 className="text-lg font-bold text-white mb-2">{h("contactCta")}</h3>
                                    <p className="text-white/60 text-sm mb-4">{ct("formSubtitle")}</p>
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#D4AF37] hover:bg-[#e0c35c] text-[#1B365D] font-bold transition-all"
                                    >
                                        {h("goToContact")}
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section >
        </div >
    );
}
