"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";

const locales = [
    { code: "de", label: "DE", flag: "🇩🇪", name: "Deutsch" },
    { code: "tr", label: "TR", flag: "🇹🇷", name: "Türkçe" },
    { code: "en", label: "EN", flag: "🇬🇧", name: "English" },
] as const;

export default function LanguageSwitcher() {
    const t = useTranslations("widgets");
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const currentLocale = locales.find((l) => l.code === locale) ?? locales[0];


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const switchLocale = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale });
        setIsOpen(false);
    };

    return (
        <motion.div
            ref={ref}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 15 }}
            className="fixed bottom-6 left-6 z-40"
        >
            {/* Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute bottom-full mb-3 left-0 glass rounded-xl overflow-hidden shadow-xl shadow-black/30 min-w-[160px]"
                    >
                        <div className="p-1.5">
                            {locales.map((l) => (
                                <button
                                    key={l.code}
                                    onClick={() => switchLocale(l.code)}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${l.code === locale
                                            ? "bg-accent/10 text-accent"
                                            : "text-enerva-text-muted hover:text-white hover:bg-enerva-surface-light"
                                        }`}
                                >
                                    <span className="text-lg">{l.flag}</span>
                                    <span>{l.name}</span>
                                    {l.code === locale && (
                                        <svg
                                            className="w-4 h-4 ml-auto text-accent"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label={t("language")}
                title={t("language")}
                className="group relative flex items-center gap-2 px-4 py-2.5 rounded-full glass hover:bg-enerva-surface-light transition-all duration-300 hover:scale-105 shadow-lg shadow-black/20"
            >
                <span className="text-lg">{currentLocale.flag}</span>
                <span className="text-sm font-semibold text-white">
                    {currentLocale.label}
                </span>
                <motion.svg
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    className="w-3.5 h-3.5 text-secondary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 15l7-7 7 7"
                    />
                </motion.svg>
            </button>
        </motion.div>
    );
}
