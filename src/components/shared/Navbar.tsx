"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { User, Sun, Moon } from "lucide-react";

const navLinks = [
    { key: "home", href: "/" },
    { key: "about", href: "/about" },
    { key: "services", href: "/services" },
    { key: "projects", href: "/projects" },
    { key: "brands", href: "/brands" },
    { key: "blog", href: "/blog" },
    { key: "contact", href: "/contact" },
] as const;

export default function Navbar() {
    const t = useTranslations("nav");
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Check initial theme from html class
        setIsDarkMode(document.documentElement.classList.contains("dark"));

        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleTheme = () => {
        const html = document.documentElement;
        if (isDarkMode) {
            html.classList.remove("dark");
            localStorage.setItem("theme", "light");
        } else {
            html.classList.add("dark");
            localStorage.setItem("theme", "dark");
        }
        setIsDarkMode(!isDarkMode);
    };

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass shadow-lg shadow-black/20" : "bg-transparent"
                }`}
        >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-accent-light flex items-center justify-center font-bold text-primary text-xl transition-transform group-hover:scale-110">
                                E
                            </div>
                            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-accent to-accent-light opacity-0 group-hover:opacity-40 blur-md transition-opacity" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-bold text-foreground tracking-tight">
                                ENERVA
                            </span>
                            <span className="text-[10px] font-medium text-enerva-text-muted tracking-[0.2em] uppercase -mt-1">
                                Elektrik
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map(({ key, href }) => {
                            const isActive =
                                pathname === href ||
                                (href !== "/" && pathname.startsWith(href));
                            return (
                                <Link
                                    key={key}
                                    href={href}
                                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isActive
                                        ? "text-accent"
                                        : "text-enerva-text-muted hover:text-white"
                                        }`}
                                >
                                    {t(key)}
                                    {isActive && (
                                        <motion.div
                                            layoutId="navbar-indicator"
                                            className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-accent to-accent-light rounded-full"
                                            transition={{
                                                type: "spring",
                                                stiffness: 350,
                                                damping: 30,
                                            }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden lg:flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2.5 text-enerva-text-muted hover:text-accent bg-transparent hover:bg-enerva-surface rounded-full transition-all"
                            aria-label="Toggle Theme"
                        >
                            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        <a
                            href="/admin/login"
                            className="p-2.5 text-enerva-text-muted hover:text-accent bg-transparent hover:bg-enerva-surface rounded-full transition-all"
                            aria-label="Admin Login"
                        >
                            <User size={20} />
                        </a>

                        <Link
                            href="/contact"
                            className="px-5 py-2.5 bg-gradient-to-r from-accent to-accent-light text-primary font-semibold text-sm rounded-lg hover:shadow-lg hover:shadow-accent/20 transition-all duration-200 hover:scale-105"
                        >
                            {t("contact")}
                        </Link>
                    </div>

                    {/* Mobile Actions & Toggle */}
                    <div className="flex items-center gap-2 lg:hidden">
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-enerva-text-muted hover:text-accent bg-transparent hover:bg-enerva-surface rounded-full transition-all"
                            aria-label="Toggle Theme"
                        >
                            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        <a
                            href="/admin/login"
                            className="p-2 text-enerva-text-muted hover:text-accent bg-transparent hover:bg-enerva-surface rounded-full transition-all"
                            aria-label="Admin Login"
                        >
                            <User size={20} />
                        </a>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-enerva-surface-light transition-colors"
                            aria-label="Toggle menu"
                        >
                            <div className="flex flex-col gap-1.5 w-5">
                                <motion.span
                                    animate={
                                        isOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }
                                    }
                                    className="block h-0.5 w-full bg-secondary rounded-full origin-center"
                                />
                                <motion.span
                                    animate={
                                        isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }
                                    }
                                    className="block h-0.5 w-full bg-secondary rounded-full"
                                />
                                <motion.span
                                    animate={
                                        isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }
                                    }
                                    className="block h-0.5 w-full bg-secondary rounded-full origin-center"
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="lg:hidden glass border-t border-primary/20 overflow-hidden"
                    >
                        <div className="px-4 py-6 space-y-1">
                            {navLinks.map(({ key, href }, index) => {
                                const isActive =
                                    pathname === href ||
                                    (href !== "/" && pathname.startsWith(href));
                                return (
                                    <motion.div
                                        key={key}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Link
                                            href={href}
                                            className={`block px-4 py-3 rounded-lg text-base font-medium transition-all ${isActive
                                                ? "bg-accent/10 text-accent border-l-2 border-accent"
                                                : "text-enerva-text-muted hover:text-white hover:bg-enerva-surface-light"
                                                }`}
                                        >
                                            {t(key)}
                                        </Link>
                                    </motion.div>
                                );
                            })}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="pt-4"
                            >
                                <Link
                                    href="/contact"
                                    className="block w-full text-center px-5 py-3 bg-gradient-to-r from-accent to-accent-light text-primary font-semibold rounded-lg"
                                >
                                    {t("contact")}
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
