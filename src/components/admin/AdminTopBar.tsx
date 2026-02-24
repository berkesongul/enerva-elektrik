"use client";

import { signOut } from "next-auth/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAdminI18n, type AdminLocale } from "@/lib/admin-i18n";

const localeOptions: { value: AdminLocale; flag: string; label: string }[] = [
    { value: "de", flag: "🇩🇪", label: "Deutsch" },
    { value: "tr", flag: "🇹🇷", label: "Türkçe" },
    { value: "en", flag: "🇬🇧", label: "English" },
];

interface AdminTopBarProps {
    user: {
        name?: string | null;
        email?: string | null;
    };
}

export function AdminTopBar({ user }: AdminTopBarProps) {
    const { locale, setLocale, t } = useAdminI18n();

    const initials = user.name
        ? user.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
        : "A";

    const currentFlag = localeOptions.find((o) => o.value === locale)?.flag || "🇩🇪";

    return (
        <header className="h-16 border-b border-slate-800 bg-[#161b22] flex items-center justify-between px-6">
            {/* Mobile menu placeholder */}
            <div className="lg:hidden">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#e0c35c] flex items-center justify-center font-bold text-[#1B365D] text-sm">
                    E
                </div>
            </div>

            <div className="hidden lg:block" />

            <div className="flex items-center gap-4">
                {/* Language Switcher */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-700 hover:border-slate-600 bg-[#0d1117] text-sm transition-colors">
                            <span className="text-base">{currentFlag}</span>
                            <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="end"
                        className="w-40 bg-[#161b22] border-slate-800"
                    >
                        {localeOptions.map((option) => (
                            <DropdownMenuItem
                                key={option.value}
                                onClick={() => setLocale(option.value)}
                                className={`cursor-pointer ${locale === option.value
                                        ? "text-[#D4AF37] bg-[#D4AF37]/5"
                                        : "text-slate-400 focus:text-white focus:bg-slate-800"
                                    }`}
                            >
                                <span className="text-base mr-2">{option.flag}</span>
                                {option.label}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* User dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium text-white">{user.name}</p>
                                <p className="text-xs text-slate-500">{user.email}</p>
                            </div>
                            <Avatar className="h-9 w-9 border border-slate-700">
                                <AvatarFallback className="bg-[#D4AF37]/20 text-[#D4AF37] text-sm font-semibold">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="end"
                        className="w-48 bg-[#161b22] border-slate-800"
                    >
                        <DropdownMenuItem className="text-slate-400 focus:text-white focus:bg-slate-800">
                            {t("topbar.profile")}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-slate-800" />
                        <DropdownMenuItem
                            className="text-red-400 focus:text-red-300 focus:bg-slate-800 cursor-pointer"
                            onClick={() => signOut({ callbackUrl: "/admin/login" })}
                        >
                            {t("topbar.signOut")}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
