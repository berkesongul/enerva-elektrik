"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ContactPage() {
    const t = useTranslations("contactPage");
    const nav = useTranslations("nav");

    const contactInfo = [
        {
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
            ),
            title: t("phone"),
            value: "+90 (___) ___ __ __",
            href: "tel:+90",
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
            ),
            title: t("email"),
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
            title: t("address"),
            value: t("addressValue"),
            href: "#map",
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: t("workingHours"),
            value: t("workingHoursValue"),
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    // Google Maps embed URL — Placeholder konum, gerçek adres ile değiştirin
    const mapEmbedUrl =
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3060.0!2d32.85!3d39.92!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDU1JzEyLjAiTiAzMsKwNTEnMDAuMCJF!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str";

    // Google Maps yol tarifi URL'si — Gerçek koordinatları buraya girin
    const directionsUrl =
        "https://www.google.com/maps/dir/?api=1&destination=39.92,32.85";

    return (
        <div className="bg-background text-foreground transition-colors duration-300">
            {/* Hero Banner */}
            <section className="relative h-[45vh] min-h-[350px] flex items-center">
                <div className="absolute inset-0">
                    <img
                        src="/images/anasayfa/ana-sayfa-banner.jpg"
                        alt="Enerva Elektrik İletişim"
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
                            <span className="text-[#1B365D] dark:text-white">{nav("contact")}</span>
                        </h1>
                        <p className="mt-4 text-lg lg:text-xl text-muted-foreground max-w-2xl">
                            {t("subtitle")}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {contactInfo.map((item, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="group relative p-6 rounded-2xl bg-card border border-border overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-500 hover:shadow-lg"
                            >
                                {/* Hover glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10">
                                    <div className="w-12 h-12 rounded-xl bg-[#1B365D] dark:bg-[#D4AF37] flex items-center justify-center text-white dark:text-[#1B365D] mb-4 group-hover:scale-110 transition-transform duration-300">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                                        {item.title}
                                    </h3>
                                    {item.href ? (
                                        <a
                                            href={item.href}
                                            className="text-foreground font-medium hover:text-[#D4AF37] transition-colors duration-300 text-sm leading-relaxed"
                                        >
                                            {item.value}
                                        </a>
                                    ) : (
                                        <p className="text-foreground font-medium text-sm leading-relaxed">
                                            {item.value}
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Contact Form + Info */}
            <section className="py-16 lg:py-24 bg-card/30 border-y border-border/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Left: Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                                {t("formTitle")}
                            </h2>
                            <p className="text-muted-foreground mb-8">
                                {t("formSubtitle")}
                            </p>

                            <form className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-1.5">
                                            {t("nameLabel")}
                                        </label>
                                        <input
                                            type="text"
                                            placeholder={t("namePlaceholder")}
                                            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-all duration-300"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-1.5">
                                            {t("emailLabel")}
                                        </label>
                                        <input
                                            type="email"
                                            placeholder={t("emailPlaceholder")}
                                            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-all duration-300"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1.5">
                                        {t("subjectLabel")}
                                    </label>
                                    <input
                                        type="text"
                                        placeholder={t("subjectPlaceholder")}
                                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-all duration-300"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1.5">
                                        {t("messageLabel")}
                                    </label>
                                    <textarea
                                        rows={5}
                                        placeholder={t("messagePlaceholder")}
                                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-all duration-300 resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#1B365D] hover:bg-[#264a7a] dark:bg-[#D4AF37] dark:hover:bg-[#e0c35c] text-white dark:text-[#1B365D] font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#1B365D]/20 dark:hover:shadow-[#D4AF37]/20 active:scale-[0.98]"
                                >
                                    {t("sendButton")}
                                </button>
                            </form>
                        </motion.div>

                        {/* Right: Additional Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-8"
                        >
                            {/* Why Contact Us */}
                            <div className="p-6 rounded-2xl bg-card border border-border relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold text-foreground mb-4">
                                        {t("whyContactTitle")}
                                    </h3>
                                    <ul className="space-y-3">
                                        {[t("reason1"), t("reason2"), t("reason3"), t("reason4")].map(
                                            (reason, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <div className="w-5 h-5 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <svg className="w-3 h-3 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                    <span className="text-muted-foreground text-sm leading-relaxed">
                                                        {reason}
                                                    </span>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            </div>

                            {/* Social / Direct Contact Card */}
                            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1B365D] to-[#0f2340] text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#D4AF37]/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold mb-3">
                                        {t("directContactTitle")}
                                    </h3>
                                    <p className="text-white/70 text-sm mb-5 leading-relaxed">
                                        {t("directContactDesc")}
                                    </p>

                                    <a
                                        href="https://wa.me/90"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium transition-all duration-300 hover:shadow-lg text-sm"
                                    >
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                        WhatsApp
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Google Maps Section */}
            <section id="map" className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-10"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
                            {t("mapTitle")}
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            {t("mapSubtitle")}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Map Container */}
                        <div className="rounded-2xl overflow-hidden shadow-xl border border-border">
                            <iframe
                                src={mapEmbedUrl}
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="w-full"
                                title="Enerva Elektrik Konum"
                            />
                        </div>

                        {/* Directions Button */}
                        <div className="mt-6 flex justify-center">
                            <a
                                href={directionsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#1B365D] hover:bg-[#264a7a] dark:bg-[#D4AF37] dark:hover:bg-[#e0c35c] text-white dark:text-[#1B365D] font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-[#1B365D]/20 dark:hover:shadow-[#D4AF37]/20 active:scale-[0.98]"
                            >
                                <svg
                                    className="w-6 h-6 group-hover:scale-110 transition-transform duration-300"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                                    />
                                </svg>
                                {t("directionsButton")}
                                <svg
                                    className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
