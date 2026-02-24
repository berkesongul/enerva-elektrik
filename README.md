# ⚡ Enerva Elektrik — Kurumsal Web Sitesi

Enerva Elektrik'in kurumsal web sitesi. Yüksek gerilim, orta gerilim ve enerji sistemleri alanında hizmet veren firmamızın dijital vitrinidir.

> **Tech Stack:** Next.js 16 · React 19 · Prisma · PostgreSQL · next-intl · Framer Motion · Tailwind CSS 4 · Shadcn/ui

---

## 📋 İçindekiler

- [Özellikler](#-özellikler)
- [Teknolojiler](#-teknolojiler)
- [Kurulum](#-kurulum)
- [Ortam Değişkenleri](#-ortam-değişkenleri)
- [Veritabanı](#-veritabanı)
- [Geliştirme](#-geliştirme)
- [Proje Yapısı](#-proje-yapısı)
- [Dil Desteği](#-dil-desteği-i18n)
- [Admin Paneli](#-admin-paneli)
- [Derleme ve Deploy](#-derleme-ve-deploy)

---

## ✨ Özellikler

| Özellik | Açıklama |
|---------|----------|
| 🌐 **Çok Dilli (i18n)** | Türkçe, Almanca ve İngilizce tam destek |
| 🎨 **Light / Dark Mode** | Kullanıcı tercihi `localStorage`'da saklanır |
| 🔐 **Admin Paneli** | Auth.js ile korunan yönetim arayüzü |
| 📁 **Projeler CRUD** | Kategori (HV, MV, Power Systems), galeri, çok dilli içerik |
| 📝 **Blog CRUD** | Çok dilli blog yazıları, slug bazlı SEO-friendly URL'ler |
| 🏭 **Hizmetlerimiz** | AG, OG, enerji hatları, kompanzasyon ve daha fazlası |
| 🏢 **Hakkımızda** | Firma tanıtımı ve değerler |
| 🤝 **Markalar** | İş ortaklıkları ve partner marka logoları |
| 📱 **Responsive** | Mobil, tablet ve masaüstü uyumlu |
| 💬 **WhatsApp Widget** | Sabit WhatsApp iletişim butonu |
| 🎭 **Animasyonlar** | Framer Motion ile akıcı sayfa geçişleri |

---

## 🛠 Teknolojiler

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **UI:** [React 19](https://react.dev/), [Tailwind CSS 4](https://tailwindcss.com/), [Shadcn/ui](https://ui.shadcn.com/)
- **Animasyon:** [Framer Motion](https://www.framer.com/motion/)
- **Veritabanı:** [PostgreSQL](https://www.postgresql.org/) + [Prisma ORM](https://www.prisma.io/)
- **Kimlik Doğrulama:** [Auth.js v5](https://authjs.dev/) (Credentials)
- **Uluslararasılaştırma:** [next-intl](https://next-intl.dev/)
- **Form:** React Hook Form + Zod
- **İkonlar:** [Lucide React](https://lucide.dev/)

---

## 🚀 Kurulum

### Gereksinimler

- Node.js **18+**
- PostgreSQL **14+**
- npm veya yarn

### Adımlar

```bash
# 1. Repoyu klonlayın
git clone https://github.com/berkesongul/enerva-elektrik.git
cd enerva-elektrik

# 2. Bağımlılıkları yükleyin
npm install

# 3. Ortam değişkenlerini ayarlayın
cp .env.example .env
# .env dosyasını düzenleyin (aşağıya bakın)

# 4. Veritabanını oluşturun
npx prisma db push

# 5. Admin kullanıcısını oluşturun (seed)
npx prisma db seed

# 6. Geliştirme sunucusunu başlatın
npm run dev
```

Tarayıcıda açın: [http://localhost:3000](http://localhost:3000)

---

## 🔑 Ortam Değişkenleri

Proje kökünde `.env` dosyası oluşturun:

```env
# Veritabanı
DATABASE_URL="postgresql://kullanici:sifre@localhost:5432/enerva_db"

# Auth.js
AUTH_SECRET="rastgele-guclu-bir-secret-key"
```

> ⚠️ `.env` dosyası `.gitignore` ile repo dışında tutulur. Asla commit etmeyin.

---

## 🗄 Veritabanı

Prisma ORM ile PostgreSQL kullanılmaktadır.

### Modeller

| Model | Açıklama |
|-------|----------|
| `Admin` | Yönetici kullanıcıları |
| `Project` | Projeler (HV, MV, Power Systems) — 3 dilli |
| `Blog` | Blog yazıları — 3 dilli, slug bazlı |
| `Settings` | Genel site ayarları (key-value) |

### Faydalı Komutlar

```bash
# Şemayı veritabanına uygula
npx prisma db push

# Prisma Studio (görsel DB yönetimi)
npx prisma studio

# Seed (admin kullanıcısı oluştur)
npx prisma db seed
```

---

## 💻 Geliştirme

```bash
# Geliştirme sunucusu (Turbopack)
npm run dev

# TypeScript tip kontrolü dahil derleme
npm run build

# Prodüksiyon sunucusu
npm start

# Lint kontrolü
npm run lint
```

---

## 📂 Proje Yapısı

```
enerva-elektrik/
├── prisma/
│   ├── schema.prisma          # Veritabanı şeması
│   └── seed.ts                # Admin seed script
├── public/
│   ├── brands/                # Marka logoları (PNG)
│   ├── img/                   # Statik görseller
│   └── uploads/               # Admin'den yüklenen dosyalar
├── src/
│   ├── app/
│   │   ├── [locale]/          # Çok dilli public sayfalar
│   │   │   ├── about/         # Hakkımızda
│   │   │   ├── blog/          # Blog listesi ve detay
│   │   │   ├── brands/        # Markalar
│   │   │   ├── contact/       # İletişim
│   │   │   ├── projects/      # Projeler listesi ve detay
│   │   │   ├── services/      # Hizmetlerimiz
│   │   │   ├── layout.tsx     # Locale layout (i18n provider)
│   │   │   └── page.tsx       # Ana sayfa
│   │   ├── admin/             # Admin paneli (korumalı)
│   │   │   ├── blog/          # Blog CRUD
│   │   │   ├── projects/      # Proje CRUD
│   │   │   ├── login/         # Giriş sayfası
│   │   │   └── layout.tsx     # Admin layout (sidebar)
│   │   ├── api/               # API rotaları
│   │   └── globals.css        # Global stiller & tema
│   ├── components/
│   │   ├── admin/             # Admin bileşenleri
│   │   ├── shared/            # Navbar, ortak bileşenler
│   │   ├── ui/                # Shadcn/ui bileşenleri
│   │   └── widgets/           # WhatsApp, LanguageSwitcher
│   ├── i18n/                  # next-intl yapılandırması
│   ├── lib/                   # Prisma client, yardımcılar
│   └── messages/              # Çeviri dosyaları (TR, EN, DE)
├── .env                       # Ortam değişkenleri (gitignore'da)
├── next.config.ts             # Next.js yapılandırması
├── package.json
└── tsconfig.json
```

---

## 🌍 Dil Desteği (i18n)

Site üç dili destekler:

| Dil | Kod | Rota |
|-----|-----|------|
| 🇩🇪 Almanca | `de` | `/de/...` (varsayılan) |
| 🇹🇷 Türkçe | `tr` | `/tr/...` |
| 🇬🇧 İngilizce | `en` | `/en/...` |

Çeviri dosyaları: `src/messages/{de,tr,en}.json`

Yeni bir çeviri anahtarı eklemek için her üç dosyayı da güncelleyin.

---

## 🔐 Admin Paneli

Admin paneline erişim: `/admin/login`

### Varsayılan Giriş Bilgileri

> Seed script çalıştırıldıktan sonra:

```
E-posta: admin@enerva.de
Şifre:   admin123
```

> ⚠️ Prodüksiyon ortamında şifreyi mutlaka değiştirin!

### Admin Özellikleri

- 📊 Dashboard (istatistik kartları)
- 📁 Proje Yönetimi (oluştur, düzenle, sil, yayınla)
- 📝 Blog Yönetimi (oluştur, düzenle, sil, yayınla)
- 🖼️ Görsel Yükleme (public/uploads)
- 🌐 3 dilli içerik düzenleme (DE / TR / EN sekmeleri)

---

## 🏗 Derleme ve Deploy

### Prodüksiyon Derlemesi

```bash
npm run build
npm start
```

### Docker (Opsiyonel)

Next.js `standalone` output modunda yapılandırılmıştır, kolayca Docker'a taşınabilir.

### Ortam Kontrol Listesi

- [ ] `DATABASE_URL` prodüksiyon veritabanına yönlendirildi
- [ ] `AUTH_SECRET` güçlü ve rastgele bir değerle ayarlandı
- [ ] Admin şifresi değiştirildi
- [ ] `npx prisma db push` prodüksiyon DB'de çalıştırıldı

---

## 📄 Lisans

Bu proje özel kullanım içindir. Tüm hakları saklıdır.

---

<p align="center">
  <strong>Enerva Elektrik</strong> · Elektrik Enerji Çözümleri ⚡
</p>
