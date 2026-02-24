import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Inter, Outfit } from "next/font/google";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/shared/Navbar";
import WhatsAppWidget from "@/components/widgets/WhatsAppWidget";
import LanguageSwitcher from "@/components/widgets/LanguageSwitcher";

const inter = Inter({
    subsets: ["latin", "latin-ext"],
    variable: "--font-inter",
});

const outfit = Outfit({
    subsets: ["latin", "latin-ext"],
    variable: "--font-outfit",
});

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    const messages = (await import(`@/messages/${locale}.json`)).default;

    return (
        <html lang={locale} suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{
                    __html: `
                    (function() {
                        var theme = localStorage.getItem('theme');
                        if (theme === 'dark') {
                            document.documentElement.classList.add('dark');
                        }
                    })();
                `}} />
            </head>
            <body
                className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-background text-foreground transition-colors duration-300`}
            >
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <Navbar />
                    <main className="min-h-screen pt-16 lg:pt-20">{children}</main>
                    <WhatsAppWidget />
                    <LanguageSwitcher />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
