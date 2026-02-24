"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function AboutPage() {
    const t = useTranslations("aboutPage");

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <section className="relative min-h-[calc(100vh-5rem)] bg-background text-foreground transition-colors duration-300">
            {/* Background Decoration */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-1/4 w-full max-w-lg h-96 bg-[#D4AF37]/10 rounded-full blur-3xl opacity-50 -translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                        <span className="gradient-text">{t("title")}</span>
                    </h1>
                    <div className="w-24 h-1 bg-[#D4AF37] mx-auto rounded-full" />
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8 text-lg md:text-xl text-muted-foreground leading-relaxed"
                >
                    <motion.p variants={itemVariants} className="first-letter:text-5xl first-letter:font-bold first-letter:text-foreground first-letter:float-left first-letter:mr-3">{t("p1")}</motion.p>
                    <motion.p variants={itemVariants}>{t("p2")}</motion.p>
                    <motion.p variants={itemVariants}>{t("p3")}</motion.p>

                    <motion.div variants={itemVariants} className="my-12 p-8 rounded-2xl bg-card border border-border relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <h3 className="text-2xl font-bold text-foreground mb-4 relative z-10">Değerlerimiz</h3>
                        <p className="relative z-10">{t("p4")}</p>
                    </motion.div>

                    <motion.p variants={itemVariants}>{t("p5")}</motion.p>
                    <motion.p variants={itemVariants} className="border-l-4 border-[#D4AF37] pl-6 italic font-medium">{t("p6")}</motion.p>
                </motion.div>
            </div>
        </section>
    );
}
