import {
    Activity,
    ArrowDownToLine,
    ArrowUpToLine,
    DraftingCompass,
    Unplug,
} from "lucide-react";

// The services and images shown on the published static site.
export const services = [
    {
        id: "og",
        slug: "orta-gerilim",
        icon: Activity,
        image: "/images/projeler/hakkari-beytussebap-154-kv-orta-gerilim-projesi/kirmizi-trafo.png",
    },
    {
        id: "yeralti",
        slug: "yer-alti-kanal",
        icon: ArrowDownToLine,
        image: "/images/hizmetler/yer-alti-kanal.jpg",
    },
    {
        id: "salt",
        slug: "salt-sahasi",
        icon: Unplug,
        image: "/images/hizmetler/enerji-hat.jpg",
    },
    {
        id: "enerji",
        slug: "enerji-nakil-hatlari",
        icon: ArrowUpToLine,
        image: "/images/hizmetler/direk-montaj.png",
    },
    {
        id: "proje",
        slug: "proje-cizimi",
        icon: DraftingCompass,
        image: "/images/hizmetler/proje-cizimi.png",
    },
] as const;
