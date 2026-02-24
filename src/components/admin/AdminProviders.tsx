"use client";

import { AdminI18nProvider } from "@/lib/admin-i18n";

export function AdminProviders({ children }: { children: React.ReactNode }) {
    return <AdminI18nProvider>{children}</AdminI18nProvider>;
}
