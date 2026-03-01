"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

const navLinks = [
    { key: "home", href: "/" },
    { key: "about", href: "/about" },
    { key: "services", href: "/services" },
    { key: "projects", href: "/projects" },
    { key: "brands", href: "/brands" },
    { key: "blog", href: "/blog" },
    { key: "contact", href: "/contact" },
] as const;

export default function Footer() {
    const t = useTranslations("nav");
    const f = useTranslations("footer");

    return (
        <footer className="bg-card border-t border-border/50 pt-16 pb-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-12">
                    {/* Logo Section */}
                    <div className="flex flex-col items-center md:items-start">
                        <Link href="/" className="inline-block mb-4 hover:opacity-90 transition-opacity">
                            <Image
                                src="/images/enerva-logo.png"
                                alt="Enerva Elektrik"
                                width={180}
                                height={60}
                                className="h-12 w-auto"
                            />
                        </Link>
                        <p className="text-muted-foreground text-sm text-center md:text-left max-w-xs">
                            {f("company")} - Yüksek ve orta gerilim tekniğinde güvenilir ortağınız.
                        </p>
                    </div>

                    {/* Navigation Menu */}
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="text-foreground font-semibold mb-4 text-lg">Menü</h3>
                        <nav className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-3">
                            {navLinks.map(({ key, href }) => (
                                <Link
                                    key={key}
                                    href={href}
                                    className="text-muted-foreground hover:text-accent transition-colors text-sm font-medium"
                                >
                                    {t(key)}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} {f("company")}. {f("rights")}
                    </div>
                    <div className="text-sm text-muted-foreground flex flex-col items-center md:items-end gap-1">
                        <span>developed by <strong>berke songul</strong></span>
                        <a
                            href="https://berkesongul.github.io"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-foreground hover:text-accent transition-colors"
                        >
                            berkesongul.github.io
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
