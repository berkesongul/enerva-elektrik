"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createProject, updateProject } from "@/app/admin/actions/projects";
import { uploadImage } from "@/app/admin/actions/upload";
import { useAdminI18n } from "@/lib/admin-i18n";

const projectSchema = z.object({
    titleDe: z.string().min(1, "Required"),
    titleTr: z.string().min(1, "Required"),
    titleEn: z.string().min(1, "Required"),
    descriptionDe: z.string().min(1, "Required"),
    descriptionTr: z.string().min(1, "Required"),
    descriptionEn: z.string().min(1, "Required"),
    clientDe: z.string().optional(),
    clientTr: z.string().optional(),
    clientEn: z.string().optional(),
    category: z.enum(["HV", "MV", "POWER_SYSTEMS"]),
    year: z.coerce.number().optional(),
    location: z.string().optional(),
    isPublished: z.boolean(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectFormProps {
    initialData?: ProjectFormData & { id: string; mainImage?: string | null };
}

const inputClass =
    "bg-[#0d1117] border-slate-700 text-white placeholder:text-slate-600 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20";

export function ProjectForm({ initialData }: ProjectFormProps) {
    const router = useRouter();
    const { t } = useAdminI18n();
    const [loading, setLoading] = useState(false);
    const [mainImage, setMainImage] = useState<string>(
        initialData?.mainImage || ""
    );

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema) as any,
        defaultValues: initialData || {
            titleDe: "",
            titleTr: "",
            titleEn: "",
            descriptionDe: "",
            descriptionTr: "",
            descriptionEn: "",
            clientDe: "",
            clientTr: "",
            clientEn: "",
            category: "HV",
            year: new Date().getFullYear(),
            location: "",
            isPublished: false,
        },
    });

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const formData = new FormData();
        formData.append("file", file);
        try {
            const url = await uploadImage(formData);
            setMainImage(url);
        } catch {
            alert(t("form.uploadFailed"));
        }
    };

    const onSubmit = async (data: ProjectFormData) => {
        setLoading(true);
        try {
            if (initialData?.id) {
                await updateProject(initialData.id, { ...data, mainImage });
            } else {
                await createProject({ ...data, mainImage });
            }
            router.push("/admin/projects");
            router.refresh();
        } catch {
            alert(t("form.saveFailed"));
        } finally {
            setLoading(false);
        }
    };

    const langLabels = { de: "Deutsch", tr: "Türkçe", en: "English" };

    return (
        <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-6">
            <Card className="bg-[#161b22] border-slate-800">
                <CardHeader>
                    <CardTitle className="text-white text-lg">{t("form.contents")}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="de" className="w-full">
                        <TabsList className="bg-[#0d1117] border border-slate-800 mb-4">
                            <TabsTrigger value="de" className="data-[state=active]:bg-[#D4AF37]/10 data-[state=active]:text-[#D4AF37]">
                                🇩🇪 Deutsch
                            </TabsTrigger>
                            <TabsTrigger value="tr" className="data-[state=active]:bg-[#D4AF37]/10 data-[state=active]:text-[#D4AF37]">
                                🇹🇷 Türkçe
                            </TabsTrigger>
                            <TabsTrigger value="en" className="data-[state=active]:bg-[#D4AF37]/10 data-[state=active]:text-[#D4AF37]">
                                🇬🇧 English
                            </TabsTrigger>
                        </TabsList>

                        {(["de", "tr", "en"] as const).map((lang) => (
                            <TabsContent key={lang} value={lang} className="space-y-4">
                                <div>
                                    <Label className="text-slate-300">
                                        {t("form.title")} ({lang.toUpperCase()}) *
                                    </Label>
                                    <Input
                                        {...register(`title${lang.charAt(0).toUpperCase() + lang.slice(1)}` as keyof ProjectFormData)}
                                        className={inputClass}
                                        placeholder={`${t("form.title")} — ${langLabels[lang]}`}
                                    />
                                    {errors[`title${lang.charAt(0).toUpperCase() + lang.slice(1)}` as keyof ProjectFormData] && (
                                        <p className="text-red-400 text-xs mt-1">
                                            {String(errors[`title${lang.charAt(0).toUpperCase() + lang.slice(1)}` as keyof ProjectFormData]?.message)}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <Label className="text-slate-300">
                                        {t("form.description")} ({lang.toUpperCase()}) *
                                    </Label>
                                    <Textarea
                                        {...register(`description${lang.charAt(0).toUpperCase() + lang.slice(1)}` as keyof ProjectFormData)}
                                        className={`${inputClass} min-h-[120px]`}
                                        placeholder={`${t("form.description")} — ${langLabels[lang]}`}
                                    />
                                </div>
                                <div>
                                    <Label className="text-slate-300">
                                        {t("form.client")} ({lang.toUpperCase()})
                                    </Label>
                                    <Input
                                        {...register(`client${lang.charAt(0).toUpperCase() + lang.slice(1)}` as keyof ProjectFormData)}
                                        className={inputClass}
                                        placeholder={t("form.client")}
                                    />
                                </div>
                            </TabsContent>
                        ))}
                    </Tabs>
                </CardContent>
            </Card>

            <Card className="bg-[#161b22] border-slate-800">
                <CardHeader>
                    <CardTitle className="text-white text-lg">{t("form.details")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <Label className="text-slate-300">{t("form.category")} *</Label>
                            <Select
                                defaultValue={watch("category")}
                                onValueChange={(v) => setValue("category", v as "HV" | "MV" | "POWER_SYSTEMS")}
                            >
                                <SelectTrigger className={inputClass}>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-[#161b22] border-slate-800">
                                    <SelectItem value="HV">{t("form.categoryHV")}</SelectItem>
                                    <SelectItem value="MV">{t("form.categoryMV")}</SelectItem>
                                    <SelectItem value="POWER_SYSTEMS">{t("form.categoryPower")}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label className="text-slate-300">{t("projects.year")}</Label>
                            <Input type="number" {...register("year")} className={inputClass} placeholder="2024" />
                        </div>
                        <div>
                            <Label className="text-slate-300">{t("form.location")}</Label>
                            <Input {...register("location")} className={inputClass} placeholder="z.B. Istanbul" />
                        </div>
                    </div>

                    <div>
                        <Label className="text-slate-300">{t("form.mainImage")}</Label>
                        <div className="mt-2 flex items-center gap-4">
                            {mainImage && (
                                <img src={mainImage} alt="Preview" className="w-24 h-24 object-cover rounded-lg border border-slate-700" />
                            )}
                            <label className="cursor-pointer px-4 py-2 rounded-lg border border-dashed border-slate-700 text-slate-400 text-sm hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors">
                                {t("form.uploadImage")}
                                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                            </label>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            {...register("isPublished")}
                            id="isPublished"
                            className="w-4 h-4 rounded border-slate-700 bg-[#0d1117] text-[#D4AF37] focus:ring-[#D4AF37]/20"
                        />
                        <Label htmlFor="isPublished" className="text-slate-300 cursor-pointer">
                            {t("form.publish")}
                        </Label>
                    </div>
                </CardContent>
            </Card>

            <div className="flex items-center gap-4">
                <Button type="submit" disabled={loading} className="bg-[#D4AF37] hover:bg-[#e0c35c] text-[#1B365D] font-semibold">
                    {loading ? t("form.saving") : initialData ? t("form.saveChanges") : t("form.createProject")}
                </Button>
                <Button type="button" variant="ghost" className="text-slate-400 hover:text-white" onClick={() => router.push("/admin/projects")}>
                    {t("form.cancel")}
                </Button>
            </div>
        </form>
    );
}
