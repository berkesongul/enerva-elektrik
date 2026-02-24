"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAdminI18n, type AdminLocale } from "@/lib/admin-i18n";

const localeOptions: { value: AdminLocale; flag: string }[] = [
    { value: "de", flag: "🇩🇪" },
    { value: "tr", flag: "🇹🇷" },
    { value: "en", flag: "🇬🇧" },
];

export default function LoginPage() {
    const router = useRouter();
    const { locale, setLocale, t } = useAdminI18n();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            setError(t("login.error"));
            setLoading(false);
        } else {
            router.push("/admin");
            router.refresh();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-[#0d1117]">
            {/* Language selector in corner */}
            <div className="fixed top-4 right-4 flex gap-1">
                {localeOptions.map((opt) => (
                    <button
                        key={opt.value}
                        onClick={() => setLocale(opt.value)}
                        className={`w-9 h-9 rounded-lg flex items-center justify-center text-base transition-all ${locale === opt.value
                                ? "bg-[#D4AF37]/20 border border-[#D4AF37]/40"
                                : "bg-[#161b22] border border-slate-800 hover:border-slate-600"
                            }`}
                    >
                        {opt.flag}
                    </button>
                ))}
            </div>

            <Card className="w-full max-w-md bg-[#161b22] border-slate-800">
                <CardHeader className="text-center space-y-3">
                    <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#e0c35c] flex items-center justify-center font-bold text-[#1B365D] text-xl">
                        E
                    </div>
                    <CardTitle className="text-xl text-white">{t("login.title")}</CardTitle>
                    <CardDescription className="text-slate-500">
                        {t("login.subtitle")}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                                {error}
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-slate-300">
                                {t("login.email")}
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@enerva.de"
                                required
                                className="bg-[#0d1117] border-slate-700 text-white placeholder:text-slate-600 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-slate-300">
                                {t("login.password")}
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="bg-[#0d1117] border-slate-700 text-white placeholder:text-slate-600 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20"
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#D4AF37] hover:bg-[#e0c35c] text-[#1B365D] font-semibold"
                        >
                            {loading ? t("login.loading") : t("login.submit")}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
