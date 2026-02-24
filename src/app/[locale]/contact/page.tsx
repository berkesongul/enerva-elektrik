"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function ContactPage() {
    const t = useTranslations("nav");

    return (
        <section className="relative min-h-[calc(100vh-5rem)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
                >
                    <span className="gradient-text">{t("contact")}</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-enerva-text-muted max-w-2xl"
                >
                    Seite in Bearbeitung...
                </motion.p>
            </div>
        </section>
    );
}
