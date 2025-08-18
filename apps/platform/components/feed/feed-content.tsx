"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  HandCoins,
} from "lucide-react";

const commentSchema = z.object({
  comment: z
    .string()
    .min(1, "Comentário não pode estar vazio")
    .max(500, "Comentário muito longo"),
});

type CommentFormData = z.infer<typeof commentSchema>;

export function FeedContent() {
  const [showCommentForm, setShowCommentForm] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
  });

  const onSubmitComment = async (data: CommentFormData) => {
    console.log("[v0] Submitting comment:", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    reset();
    setShowCommentForm(null);
  };

  const posts = [
    {
      id: "1",
      author: {
        name: "Jane Cooper",
        role: "MÃO AMIGA",
        avatar: "/jane-cooper-portrait.png",
      },
      content:
        "Fala galera 👋\n\nSou da ONG Mão Amiga e nossa meta é levar alimentação e apoio a comunidades carentes. Estamos em uma missão para arrecadar R$ 50 mil até o final do mês, e com a sua ajuda, conseguimos! Bora dar uma mãozinha? 💛",
      link: "jane.design/doctorcare",
      timeAgo: "1h",
      likes: 24,
      comments: 8,
    },
    {
      id: "2",
      author: {
        name: "Devon Lane",
        role: "Dev Front-End",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content:
        "Fala pessoal 👋\n\nAqui é da ONG Juntos Somos Mais, e temos uma missão incrível: garantir educação de qualidade para crianças em comunidades rurais. Estamos com uma meta de arrecadar 100 mil livros até o fim do ano. Com vocês, chegamos lá! Vamos nessa? 📚",
      link: "devonlane.design",
      timeAgo: "2h",
      likes: 15,
      comments: 3,
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="flex flex-wrap sm:flex-nowrap gap-1 bg-white rounded-lg p-1 shadow-sm border border-gray-200">
        <Button
          variant="default"
          size="sm"
          className="flex-1 min-w-0 bg-[#0C8BC0] hover:bg-[#0A6F9A] text-white text-xs sm:text-sm"
        >
          Todas as causas
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 min-w-0 text-[#666666] hover:bg-[#E7F3F9] hover:text-[#0C8BC0] text-xs sm:text-sm"
        >
          ONGs que sigo
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 min-w-0 text-[#666666] hover:bg-[#E7F3F9] hover:text-[#0C8BC0] text-xs sm:text-sm"
        >
          Onde sou voluntário
        </Button>
      </div>

      {/* Posts */}
      {posts.map((post) => (
        <Card
          key={post.id}
          className="w-full bg-white border border-gray-200 shadow-sm"
        >
          <CardContent className="p-4 sm:p-6">
            {/* Post Header */}
            <div className="flex items-start justify-between mb-4 gap-3">
              <div className="flex items-center space-x-3 min-w-0 flex-1">
                <Avatar className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
                  <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-[#E7F3F9] text-[#0C8BC0] text-sm">
                    {post.author.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-[#181818] text-sm sm:text-base truncate">
                    {post.author.name}
                  </h3>
                  <Badge
                    variant="secondary"
                    className="text-xs bg-[#E7F3F9] text-[#0C8BC0] hover:bg-[#CEE8F2] mt-1"
                  >
                    {post.author.role}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-[#666666] flex-shrink-0">
                <span className="hidden sm:inline">
                  Publicado há {post.timeAgo}
                </span>
                <span className="sm:hidden">{post.timeAgo}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-6 h-6 sm:w-8 sm:h-8 hover:bg-[#F1F1F1]"
                >
                  <MoreHorizontal className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>
            </div>

            {/* Post Content */}
            <div className="mb-4">
              <p className="text-[#333333] whitespace-pre-line leading-relaxed text-sm sm:text-base">
                {post.content}
              </p>
              {post.link && (
                <a
                  href={`https://${post.link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0C8BC0] hover:text-[#0A6F9A] hover:underline text-sm mt-3 inline-block font-medium break-all"
                >
                  👉 {post.link}
                </a>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t border-[#E4E4E4]">
              <div className="flex items-center space-x-4 sm:space-x-6">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#666666] hover:text-[#EF4444] hover:bg-[#FEF2F2] p-2"
                >
                  <Heart className="w-4 h-4 mr-1 sm:mr-2" />
                  <span className="text-xs sm:text-sm">{post.likes}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#666666] hover:text-[#0C8BC0] hover:bg-[#E7F3F9] p-2"
                  onClick={() =>
                    setShowCommentForm(
                      showCommentForm === post.id ? null : post.id
                    )
                  }
                >
                  <MessageCircle className="w-4 h-4 mr-1 sm:mr-2" />
                  <span className="text-xs sm:text-sm">{post.comments}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#666666] hover:text-[#22C55E] hover:bg-[#F3F9F4] p-2"
                >
                  <Share2 className="w-4 h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline text-xs sm:text-sm">
                    Compartilhar
                  </span>
                </Button>
              </div>

              <Button size="lg" className="text-white w-full sm:w-auto">
                <HandCoins width={16} />
                Doar
              </Button>
            </div>

            {/* Comment Form */}
            {showCommentForm === post.id && (
              <div className="mt-4 pt-4 border-t border-[#E4E4E4]">
                <form
                  onSubmit={handleSubmit(onSubmitComment)}
                  className="space-y-3"
                >
                  <Textarea
                    placeholder="Nosso, adorei amigo! Parabéns"
                    className="resize-none border-[#C9C9C9] focus:border-[#0C8BC0] focus:ring-[#0C8BC0] w-full"
                    rows={3}
                    {...register("comment")}
                  />
                  {errors.comment && (
                    <p className="text-sm text-[#EF4444]">
                      {errors.comment.message}
                    </p>
                  )}

                  <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:space-x-2 sm:gap-0">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowCommentForm(null)}
                      className="border-[#C9C9C9] text-[#666666] hover:bg-[#F1F1F1] w-full sm:w-auto"
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      size="sm"
                      disabled={isSubmitting}
                      className="bg-[#0C8BC0] hover:bg-[#0A6F9A] text-white disabled:bg-[#C9C9C9] w-full sm:w-auto"
                    >
                      {isSubmitting ? "Publicando..." : "Publicar"}
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
