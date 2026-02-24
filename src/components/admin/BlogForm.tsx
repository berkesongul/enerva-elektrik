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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createBlog, updateBlog } from "@/app/admin/actions/blog";
import { uploadImage } from "@/app/admin/actions/upload";
import { useAdminI18n } from "@/lib/admin-i18n";

const blogSchema = z.object({
    titleDe: z.string().min(1, "Required"),
    titleTr: z.string().min(1, "Required"),
    titleEn: z.string().min(1, "Required"),
    contentDe: z.string().min(1, "Required"),
    contentTr: z.string().min(1, "Required"),
    contentEn: z.string().min(1, "Required"),
    isPublished: z.boolean(),
});

type BlogFormData = z.infer<typeof blogSchema>;

interface BlogFormProps {
    initialData?: BlogFormData & { id: string; image?: string | null };
}

const inputClass =
    "bg-[#0d1117] border-slate-700 text-white placeholder:text-slate-600 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20";

export function BlogForm({ initialData }: BlogFormProps) {
    const router = useRouter();
    const { t } = useAdminI18n();
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState<string>(initialData?.image || "");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<BlogFormData>({
        resolver: zodResolver(blogSchema) as any,
        defaultValues: initialData || {
            titleDe: "",
            titleTr: "",
            titleEn: "",
            contentDe: "",
            contentTr: "",
            contentEn: "",
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
            setImage(url);
        } catch {
            alert(t("form.uploadFailed"));
        }
    };

    const onSubmit = async (data: BlogFormData) => {
        setLoading(true);
        try {
            if (initialData?.id) {
                await updateBlog(initialData.id, { ...data, image });
            } else {
                await createBlog({ ...data, image });
            }
            router.push("/admin/blog");
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
                                        {...register(`title${lang.charAt(0).toUpperCase() + lang.slice(1)}` as keyof BlogFormData)}
                                        className={inputClass}
                                        placeholder={`${t("form.title")} — ${langLabels[lang]}`}
                                    />
                                    {errors[`title${lang.charAt(0).toUpperCase() + lang.slice(1)}` as keyof BlogFormData] && (
                                        <p className="text-red-400 text-xs mt-1">
                                            {String(errors[`title${lang.charAt(0).toUpperCase() + lang.slice(1)}` as keyof BlogFormData]?.message)}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <Label className="text-slate-300">
                                        {t("form.content")} ({lang.toUpperCase()}) *
                                    </Label>
                                    <Textarea
                                        {...register(`content${lang.charAt(0).toUpperCase() + lang.slice(1)}` as keyof BlogFormData)}
                                        className={`${inputClass} min-h-[200px]`}
                                        placeholder={`${t("form.content")} — ${langLabels[lang]}`}
                                    />
                                </div>
                            </TabsContent>
                        ))}
                    </Tabs>
                </CardContent>
            </Card>

            <Card className="bg-[#161b22] border-slate-800">
                <CardHeader>
                    <CardTitle className="text-white text-lg">{t("form.settings")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label className="text-slate-300">{t("form.postImage")}</Label>
                        <div className="mt-2 flex items-center gap-4">
                            {image && (
                                <img src={image} alt="Preview" className="w-24 h-24 object-cover rounded-lg border border-slate-700" />
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
                    {loading ? t("form.saving") : initialData ? t("form.saveChanges") : t("form.createPost")}
                </Button>
                <Button type="button" variant="ghost" className="text-slate-400 hover:text-white" onClick={() => router.push("/admin/blog")}>
                    {t("form.cancel")}
                </Button>
            </div>
        </form>
    );
}
