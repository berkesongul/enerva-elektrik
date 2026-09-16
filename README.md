#Enerva Elektrik — Kurumsal Web Sitesi

Enerva Elektrik'in kurumsal web sitesi. Yüksek gerilim, orta gerilim ve enerji sistemleri alanında hizmet veren firmamızın dijital vitrinidir.

> **Tech Stack:** Next.js 16 · React 19 · Prisma · PostgreSQL · next-intl · Framer Motion · Tailwind CSS 4 · Shadcn/ui

---

## İçindekiler

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

##  Özellikler

| Özellik | Açıklama |
|---------|----------|
|  **Çok Dilli (i18n)** | Türkçe, Almanca ve İngilizce tam destek |
|  **Light / Dark Mode** | Kullanıcı tercihi `localStorage`'da saklanır |
|  **Admin Paneli** | Auth.js ile korunan yönetim arayüzü |
|  **Projeler CRUD** | Kategori (HV, MV, Power Systems), galeri, çok dilli içerik |
|  **Blog CRUD** | Çok dilli blog yazıları, slug bazlı SEO-friendly URL'ler |
|  **Hizmetlerimiz** | AG, OG, enerji hatları, kompanzasyon ve daha fazlası |
|  **Hakkımızda** | Firma tanıtımı ve değerler |
|  **Markalar** | İş ortaklıkları ve partner marka logoları |
|  **Responsive** | Mobil, tablet ve masaüstü uyumlu |
|  **WhatsApp Widget** | Sabit WhatsApp iletişim butonu |
|  **Animasyonlar** | Framer Motion ile akıcı sayfa geçişleri |

---

##  Teknolojiler

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **UI:** [React 19](https://react.dev/), [Tailwind CSS 4](https://tailwindcss.com/), [Shadcn/ui](https://ui.shadcn.com/)
- **Animasyon:** [Framer Motion](https://www.framer.com/motion/)
- **Veritabanı:** [PostgreSQL](https://www.postgresql.org/) + [Prisma ORM](https://www.prisma.io/)
- **Kimlik Doğrulama:** [Auth.js v5](https://authjs.dev/) (Credentials)
- **Uluslararasılaştırma:** [next-intl](https://next-intl.dev/)
- **Form:** React Hook Form + Zod
- **İkonlar:** [Lucide React](https://lucide.dev/)

---

##  Kurulum

### Gereksinimler

- Node.js **20.9+**
- PostgreSQL **16+**
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

# 4. Yerel veritabanını oluşturun (kendi PostgreSQL kullanıcı adınızı kullanın)
createdb enerva_elektrik_dev

# 5. Sürümlü şema değişikliklerini uygulayın
npm run db:migrate:dev

# 6. Admin hesabı ve örnek içerikleri oluşturun
npm run db:seed

# 7. Geliştirme sunucusunu başlatın
npm run dev
```

Tarayıcıda açın: [http://localhost:3000](http://localhost:3000)

---

## Ortam Değişkenleri

Proje kökünde `.env` dosyası oluşturun:

```env
# Veritabanı
DATABASE_URL="postgresql://kullanici:sifre@127.0.0.1:5432/enerva_elektrik_dev?schema=public"

# Auth.js
AUTH_SECRET="rastgele-guclu-bir-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Yalnızca yerel seed için
ADMIN_SEED_PASSWORD="guclu-bir-yerel-sifre"
```

>  `.env` dosyası `.gitignore` ile repo dışında tutulur. Asla commit etmeyin.

---

##  Veritabanı

Prisma ORM ile PostgreSQL kullanılmaktadır. Yerel veritabanı üretim veritabanından ayrıdır. Mac'te mevcut kullanıcıyla çalışan PostgreSQL bağlantısında şifre gerekmiyorsa URL'deki `:sifre` kısmını çıkarın. Şifrede URL için özel karakterler varsa yüzde kodlaması kullanın.

### Modeller

| Model | Açıklama |
|-------|----------|
| `Admin` | Yönetici kullanıcıları |
| `Project` | Projeler (HV, MV, Power Systems) — 3 dilli |
| `Blog` | Blog yazıları — 3 dilli, slug bazlı |
| `Settings` | Genel site ayarları (key-value) |

### Faydalı Komutlar

```bash
# Yerelde yeni migration oluştur ve uygula
npm run db:migrate:dev

# Prisma Studio (görsel DB yönetimi)
npx prisma studio

# Seed (admin hesabı ve örnek içerikler)
npm run db:seed
```

---

##  Geliştirme

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

## Proje Yapısı

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

## Dil Desteği (i18n)

Site üç dili destekler:

| Dil | Kod | Rota |
|-----|-----|------|
| 🇩🇪 Almanca | `de` | `/de/...` (varsayılan) |
| 🇹🇷 Türkçe | `tr` | `/tr/...` |
| 🇬🇧 İngilizce | `en` | `/en/...` |

Çeviri dosyaları: `src/messages/{de,tr,en}.json`

Yeni bir çeviri anahtarı eklemek için her üç dosyayı da güncelleyin.

---

##  Admin Paneli

Admin paneline erişim: `/admin/login`

### Yerel Giriş Bilgileri

> Seed script çalıştırıldıktan sonra:

```
E-posta: admin@enervaelektrik.com
Şifre:   .env içindeki ADMIN_SEED_PASSWORD
```

>  Yerel seed şifresini üretim ortamına taşımayın.

### Admin Özellikleri

- 📊Dashboard (istatistik kartları)
- Proje Yönetimi (oluştur, düzenle, sil, yayınla)
- Blog Yönetimi (oluştur, düzenle, sil, yayınla)
- Görsel Yükleme (public/uploads)
- 3 dilli içerik düzenleme (DE / TR / EN sekmeleri)

---

## Derleme ve Deploy

### Prodüksiyon Derlemesi

```bash
npm run build
npm start
```

### VPS üzerinde Docker

Docker Compose; Next.js uygulamasını, PostgreSQL 16'yı, migration adımını ve otomatik HTTPS sağlayan Caddy reverse proxy'yi birlikte çalıştırır. PostgreSQL verileri, admin panelinden yüklenen görseller ve TLS sertifikaları kalıcı volume'larda tutulur.

```bash
# Sunucuda repoyu klonladıktan sonra
cp deploy.env.example .env.production

# .env.production içindeki alan adı, e-posta ve şifreleri düzenleyin.
# DNS A kaydı sunucunun IP adresine yönlenmiş olmalıdır.

# Veritabanı migration'larını çalıştırıp sistemi başlatın
docker compose --env-file .env.production up -d --build

# İlk admin hesabını oluşturun
docker compose --env-file .env.production --profile tools run --rm admin-init

# Durumu ve logları kontrol edin
docker compose --env-file .env.production ps
docker compose --env-file .env.production logs -f app caddy
```

Yeni sürüm yayınlamak için:

```bash
git pull
docker compose --env-file .env.production up -d --build
```

Yedek alınması gereken volume'lar: `postgres_data`, `uploads` ve `caddy_data`.

### Ortam Kontrol Listesi

- [ ] Alan adının DNS kaydı VPS IP adresine yönlendirildi
- [ ] VPS güvenlik duvarında 22, 80 ve 443 portları açıldı
- [ ] `AUTH_SECRET` güçlü ve rastgele bir değerle ayarlandı
- [ ] PostgreSQL ve admin parolaları güçlü değerlerle ayarlandı
- [ ] İlk admin hesabı oluşturuldu
- [ ] PostgreSQL ve upload volume'ları için düzenli yedekleme kuruldu

---

##Lisans

Bu proje özel kullanım içindir. Tüm hakları saklıdır.

---

<p align="center">
  <strong>Enerva Elektrik</strong> · Elektrik Enerji Çözümleri
</p>
