"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type AdminLocale = "de" | "tr" | "en";

const translations: Record<AdminLocale, Record<string, string>> = {
    de: {
        // Sidebar
        "nav.dashboard": "Dashboard",
        "nav.projects": "Projekte",
        "nav.blog": "Blog",
        "nav.settings": "Einstellungen",
        "nav.openWebsite": "Webseite öffnen",

        // Top bar
        "topbar.profile": "Profil",
        "topbar.signOut": "Abmelden",

        // Dashboard
        "dashboard.title": "Dashboard",
        "dashboard.welcome": "Willkommen im Enerva Admin-Bereich",
        "dashboard.projects": "Projekte",
        "dashboard.blogPosts": "Blog-Beiträge",
        "dashboard.published": "Veröffentlicht",
        "dashboard.quickActions": "Schnellaktionen",
        "dashboard.newProject": "Neues Projekt",
        "dashboard.addProject": "Projekt hinzufügen",
        "dashboard.newBlogPost": "Neuer Blog-Beitrag",
        "dashboard.writePost": "Beitrag schreiben",

        // Projects
        "projects.title": "Projekte",
        "projects.subtitle": "Verwalten Sie Ihre Projekte",
        "projects.new": "+ Neues Projekt",
        "projects.titleDe": "Titel (DE)",
        "projects.category": "Kategorie",
        "projects.year": "Jahr",
        "projects.status": "Status",
        "projects.actions": "Aktionen",
        "projects.edit": "Bearbeiten",
        "projects.empty": "Noch keine Projekte vorhanden",
        "projects.published": "Veröffentlicht",
        "projects.draft": "Entwurf",
        "projects.newTitle": "Neues Projekt",
        "projects.newSubtitle": "Erstellen Sie ein neues Projekt in allen 3 Sprachen",
        "projects.editTitle": "Projekt bearbeiten",

        // Blog
        "blog.title": "Blog",
        "blog.subtitle": "Verwalten Sie Ihre Blog-Beiträge",
        "blog.new": "+ Neuer Beitrag",
        "blog.titleDe": "Titel (DE)",
        "blog.created": "Erstellt",
        "blog.status": "Status",
        "blog.actions": "Aktionen",
        "blog.edit": "Bearbeiten",
        "blog.empty": "Noch keine Blog-Beiträge vorhanden",
        "blog.published": "Veröffentlicht",
        "blog.draft": "Entwurf",
        "blog.newTitle": "Neuer Blog-Beitrag",
        "blog.newSubtitle": "Erstellen Sie einen neuen Blog-Beitrag in allen 3 Sprachen",
        "blog.editTitle": "Beitrag bearbeiten",

        // Forms
        "form.contents": "Inhalte",
        "form.details": "Details",
        "form.settings": "Einstellungen",
        "form.title": "Titel",
        "form.description": "Beschreibung",
        "form.content": "Inhalt",
        "form.client": "Kunde",
        "form.category": "Kategorie",
        "form.categoryHV": "Hochspannung (HV)",
        "form.categoryMV": "Mittelspannung (MV)",
        "form.categoryPower": "Energiesysteme",
        "form.location": "Standort",
        "form.mainImage": "Hauptbild",
        "form.postImage": "Beitragsbild",
        "form.uploadImage": "Bild hochladen",
        "form.publish": "Veröffentlichen",
        "form.saving": "Wird gespeichert...",
        "form.saveChanges": "Änderungen speichern",
        "form.createProject": "Projekt erstellen",
        "form.createPost": "Beitrag erstellen",
        "form.cancel": "Abbrechen",
        "form.uploadFailed": "Bild-Upload fehlgeschlagen",
        "form.saveFailed": "Fehler beim Speichern",

        // Login
        "login.title": "Admin Login",
        "login.subtitle": "Melden Sie sich mit Ihren Admin-Zugangsdaten an",
        "login.email": "E-Mail",
        "login.password": "Passwort",
        "login.submit": "Anmelden",
        "login.loading": "Wird angemeldet...",
        "login.error": "Ungültige Anmeldedaten",
    },
    tr: {
        // Sidebar
        "nav.dashboard": "Gösterge Paneli",
        "nav.projects": "Projeler",
        "nav.blog": "Blog",
        "nav.settings": "Ayarlar",
        "nav.openWebsite": "Web sitesini aç",

        // Top bar
        "topbar.profile": "Profil",
        "topbar.signOut": "Çıkış Yap",

        // Dashboard
        "dashboard.title": "Gösterge Paneli",
        "dashboard.welcome": "Enerva Yönetim Paneline Hoş Geldiniz",
        "dashboard.projects": "Projeler",
        "dashboard.blogPosts": "Blog Yazıları",
        "dashboard.published": "Yayınlanan",
        "dashboard.quickActions": "Hızlı İşlemler",
        "dashboard.newProject": "Yeni Proje",
        "dashboard.addProject": "Proje ekle",
        "dashboard.newBlogPost": "Yeni Blog Yazısı",
        "dashboard.writePost": "Yazı yaz",

        // Projects
        "projects.title": "Projeler",
        "projects.subtitle": "Projelerinizi yönetin",
        "projects.new": "+ Yeni Proje",
        "projects.titleDe": "Başlık (DE)",
        "projects.category": "Kategori",
        "projects.year": "Yıl",
        "projects.status": "Durum",
        "projects.actions": "İşlemler",
        "projects.edit": "Düzenle",
        "projects.empty": "Henüz proje eklenmemiş",
        "projects.published": "Yayında",
        "projects.draft": "Taslak",
        "projects.newTitle": "Yeni Proje",
        "projects.newSubtitle": "3 dilde yeni bir proje oluşturun",
        "projects.editTitle": "Proje Düzenle",

        // Blog
        "blog.title": "Blog",
        "blog.subtitle": "Blog yazılarınızı yönetin",
        "blog.new": "+ Yeni Yazı",
        "blog.titleDe": "Başlık (DE)",
        "blog.created": "Oluşturulma",
        "blog.status": "Durum",
        "blog.actions": "İşlemler",
        "blog.edit": "Düzenle",
        "blog.empty": "Henüz blog yazısı eklenmemiş",
        "blog.published": "Yayında",
        "blog.draft": "Taslak",
        "blog.newTitle": "Yeni Blog Yazısı",
        "blog.newSubtitle": "3 dilde yeni bir blog yazısı oluşturun",
        "blog.editTitle": "Yazıyı Düzenle",

        // Forms
        "form.contents": "İçerikler",
        "form.details": "Detaylar",
        "form.settings": "Ayarlar",
        "form.title": "Başlık",
        "form.description": "Açıklama",
        "form.content": "İçerik",
        "form.client": "Müşteri",
        "form.category": "Kategori",
        "form.categoryHV": "Yüksek Gerilim (HV)",
        "form.categoryMV": "Orta Gerilim (MV)",
        "form.categoryPower": "Enerji Sistemleri",
        "form.location": "Konum",
        "form.mainImage": "Ana Görsel",
        "form.postImage": "Yazı Görseli",
        "form.uploadImage": "Görsel yükle",
        "form.publish": "Yayınla",
        "form.saving": "Kaydediliyor...",
        "form.saveChanges": "Değişiklikleri kaydet",
        "form.createProject": "Proje oluştur",
        "form.createPost": "Yazı oluştur",
        "form.cancel": "İptal",
        "form.uploadFailed": "Görsel yükleme başarısız",
        "form.saveFailed": "Kaydetme hatası",

        // Login
        "login.title": "Yönetici Girişi",
        "login.subtitle": "Yönetici bilgilerinizle giriş yapın",
        "login.email": "E-posta",
        "login.password": "Şifre",
        "login.submit": "Giriş Yap",
        "login.loading": "Giriş yapılıyor...",
        "login.error": "Geçersiz giriş bilgileri",
    },
    en: {
        // Sidebar
        "nav.dashboard": "Dashboard",
        "nav.projects": "Projects",
        "nav.blog": "Blog",
        "nav.settings": "Settings",
        "nav.openWebsite": "Open Website",

        // Top bar
        "topbar.profile": "Profile",
        "topbar.signOut": "Sign Out",

        // Dashboard
        "dashboard.title": "Dashboard",
        "dashboard.welcome": "Welcome to Enerva Admin Panel",
        "dashboard.projects": "Projects",
        "dashboard.blogPosts": "Blog Posts",
        "dashboard.published": "Published",
        "dashboard.quickActions": "Quick Actions",
        "dashboard.newProject": "New Project",
        "dashboard.addProject": "Add project",
        "dashboard.newBlogPost": "New Blog Post",
        "dashboard.writePost": "Write post",

        // Projects
        "projects.title": "Projects",
        "projects.subtitle": "Manage your projects",
        "projects.new": "+ New Project",
        "projects.titleDe": "Title (DE)",
        "projects.category": "Category",
        "projects.year": "Year",
        "projects.status": "Status",
        "projects.actions": "Actions",
        "projects.edit": "Edit",
        "projects.empty": "No projects yet",
        "projects.published": "Published",
        "projects.draft": "Draft",
        "projects.newTitle": "New Project",
        "projects.newSubtitle": "Create a new project in all 3 languages",
        "projects.editTitle": "Edit Project",

        // Blog
        "blog.title": "Blog",
        "blog.subtitle": "Manage your blog posts",
        "blog.new": "+ New Post",
        "blog.titleDe": "Title (DE)",
        "blog.created": "Created",
        "blog.status": "Status",
        "blog.actions": "Actions",
        "blog.edit": "Edit",
        "blog.empty": "No blog posts yet",
        "blog.published": "Published",
        "blog.draft": "Draft",
        "blog.newTitle": "New Blog Post",
        "blog.newSubtitle": "Create a new blog post in all 3 languages",
        "blog.editTitle": "Edit Post",

        // Forms
        "form.contents": "Contents",
        "form.details": "Details",
        "form.settings": "Settings",
        "form.title": "Title",
        "form.description": "Description",
        "form.content": "Content",
        "form.client": "Client",
        "form.category": "Category",
        "form.categoryHV": "High Voltage (HV)",
        "form.categoryMV": "Medium Voltage (MV)",
        "form.categoryPower": "Power Systems",
        "form.location": "Location",
        "form.mainImage": "Main Image",
        "form.postImage": "Post Image",
        "form.uploadImage": "Upload image",
        "form.publish": "Publish",
        "form.saving": "Saving...",
        "form.saveChanges": "Save changes",
        "form.createProject": "Create project",
        "form.createPost": "Create post",
        "form.cancel": "Cancel",
        "form.uploadFailed": "Image upload failed",
        "form.saveFailed": "Failed to save",

        // Login
        "login.title": "Admin Login",
        "login.subtitle": "Sign in with your admin credentials",
        "login.email": "Email",
        "login.password": "Password",
        "login.submit": "Sign In",
        "login.loading": "Signing in...",
        "login.error": "Invalid credentials",
    },
};

interface AdminI18nContextType {
    locale: AdminLocale;
    setLocale: (locale: AdminLocale) => void;
    t: (key: string) => string;
}

const AdminI18nContext = createContext<AdminI18nContextType | null>(null);

export function AdminI18nProvider({ children }: { children: ReactNode }) {
    const [locale, setLocaleState] = useState<AdminLocale>("de");

    useEffect(() => {
        const saved = localStorage.getItem("admin-locale") as AdminLocale;
        if (saved && translations[saved]) {
            setLocaleState(saved);
        }
    }, []);

    const setLocale = (newLocale: AdminLocale) => {
        setLocaleState(newLocale);
        localStorage.setItem("admin-locale", newLocale);
    };

    const t = (key: string): string => {
        return translations[locale][key] || translations["de"][key] || key;
    };

    return (
        <AdminI18nContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </AdminI18nContext.Provider>
    );
}

export function useAdminI18n() {
    const ctx = useContext(AdminI18nContext);
    if (!ctx) throw new Error("useAdminI18n must be used within AdminI18nProvider");
    return ctx;
}
