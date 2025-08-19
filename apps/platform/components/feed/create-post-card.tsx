"use client";

import type React from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon, Smile, MapPin, X } from "lucide-react";

const createPostSchema = z.object({
  content: z
    .string()
    .min(1, "O post não pode estar vazio")
    .max(1000, "Post muito longo (máximo 1000 caracteres)"),
  images: z
    .array(z.instanceof(File))
    .max(4, "Máximo 4 imagens por post")
    .optional(),
});

type CreatePostFormData = z.infer<typeof createPostSchema>;

export function CreatePostCard() {
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreatePostFormData>({
    resolver: zodResolver(createPostSchema),
  });

  const content = watch("content", "");

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validImages = files.filter((file) => {
      const isValidType = file.type.startsWith("image/");
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
      return isValidType && isValidSize;
    });

    const newImages = [...selectedImages, ...validImages].slice(0, 4);
    setSelectedImages(newImages);
    setValue("images", newImages);
  };

  const removeImage = (index: number) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(newImages);
    setValue("images", newImages);
  };

  const onSubmitPost = async (data: CreatePostFormData) => {
    console.log("[v0] Creating new post:", data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSelectedImages([]);
    setShowImageUpload(false);
    reset();
  };

  return (
    <Card className="w-full bg-white border border-gray-200 shadow-sm">
      <CardContent className="p-4 sm:p-6">
        <form onSubmit={handleSubmit(onSubmitPost)} className="space-y-4">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
              <AvatarImage src="/abstract-profile.png" />
              <AvatarFallback className="bg-[#E7F3F9] text-[#0C8BC0]">
                LA
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-[#181818] text-sm sm:text-base">
                Leslie Alexander
              </h3>
              <p className="text-xs text-[#666666]">UI Designer</p>
            </div>
          </div>

          <div className="space-y-2">
            <Textarea
              placeholder="O que você gostaria de compartilhar hoje?"
              className="resize-none border-[#C9C9C9] focus:border-[#0C8BC0] focus:ring-[#0C8BC0] min-h-[100px] text-sm sm:text-base"
              rows={4}
              {...register("content")}
            />
            {errors.content && (
              <p className="text-sm text-[#EF4444]">{errors.content.message}</p>
            )}
            <div className="flex justify-between items-center text-xs text-[#666666]">
              <span></span>
              <span className={content.length > 900 ? "text-[#EF4444]" : ""}>
                {content.length}/1000
              </span>
            </div>
          </div>

          {showImageUpload && (
            <div className="border-2 border-dashed border-[#C9C9C9] rounded-lg p-4 bg-[#F8F9FA]">
              <div className="text-center">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageSelect}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer inline-flex flex-col items-center justify-center p-4 hover:bg-[#E7F3F9] rounded-lg transition-colors"
                >
                  <ImageIcon className="w-8 h-8 text-[#666666] mb-2" />
                  <span className="text-sm text-[#666666]">
                    Clique para selecionar imagens
                  </span>
                  <span className="text-xs text-[#999999] mt-1">
                    Máximo 4 imagens, até 5MB cada
                  </span>
                </label>
              </div>

              {selectedImages.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {selectedImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(image) || "/placeholder.svg"}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-20 object-cover rounded-lg border border-[#C9C9C9]"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-[#EF4444] text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {errors.images && (
                <p className="text-sm text-[#EF4444] mt-2">
                  {errors.images.message}
                </p>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
            <div className="flex items-center space-x-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className={`p-2 ${showImageUpload ? "text-[#0C8BC0] bg-[#E7F3F9]" : "text-[#666666] hover:text-[#0C8BC0] hover:bg-[#E7F3F9]"}`}
                onClick={() => setShowImageUpload(!showImageUpload)}
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline text-sm">Foto</span>
                {selectedImages.length > 0 && (
                  <span className="ml-1 bg-[#0C8BC0] text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] h-[18px] flex items-center justify-center">
                    {selectedImages.length}
                  </span>
                )}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-[#666666] hover:text-[#0C8BC0] hover:bg-[#E7F3F9] p-2"
              >
                <Smile className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline text-sm">Emoji</span>
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-[#666666] hover:text-[#0C8BC0] hover:bg-[#E7F3F9] p-2"
              >
                <MapPin className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline text-sm">Local</span>
              </Button>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || !content.trim()}
              className="bg-[#0C8BC0] hover:bg-[#0A6F9A] text-white disabled:bg-[#C9C9C9] disabled:cursor-not-allowed px-6 py-2 w-full sm:w-auto"
            >
              {isSubmitting ? "Publicando..." : "Publicar"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
