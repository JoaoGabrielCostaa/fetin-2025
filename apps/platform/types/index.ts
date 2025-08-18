import * as z from "zod"

// Schemas de validação
export const commentSchema = z.object({
  comment: z.string().min(1, "Comentário não pode estar vazio").max(500, "Comentário muito longo"),
})

export const chatSchema = z.object({
  message: z.string().min(1, "Mensagem não pode estar vazia").max(1000, "Mensagem muito longa"),
})

export const personalInfoSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(50, "Nome muito longo"),
  email: z.string().email("Email inválido"),
  bio: z.string().max(500, "Biografia muito longa").optional(),
})

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Senha atual é obrigatória"),
    newPassword: z.string().min(8, "Nova senha deve ter pelo menos 8 caracteres"),
    confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Senhas não coincidem",
    path: ["confirmPassword"],
  })

// Tipos inferidos dos schemas
export type CommentForm = z.infer<typeof commentSchema>
export type ChatForm = z.infer<typeof chatSchema>
export type PersonalInfoForm = z.infer<typeof personalInfoSchema>
export type PasswordForm = z.infer<typeof passwordSchema>

// Interfaces para dados
export interface User {
  id: string
  name: string
  email: string
  bio?: string
  avatar: string
  role: string
}

export interface Post {
  id: string
  author: User
  content: string
  link?: string
  timestamp: string
  organization?: string
}

export interface NGO {
  id: string
  name: string
  description: string
  avatar: string
  views?: string
}

export interface Notification {
  id: string
  type: "donation" | "comment" | "follow" | "message"
  title: string
  description: string
  timestamp: string
  read: boolean
}
