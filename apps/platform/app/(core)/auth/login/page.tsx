"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "E-mail é obrigatório")
    .email("Digite um e-mail válido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  keepSession: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function DonAiLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      keepSession: false,
    },
  });

  const keepSession = watch("keepSession");

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      console.log("[v0] Login data:", data);
      // Simular login
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // Redirecionar para dashboard
      window.location.href = "/";
    } catch (error) {
      console.error("[v0] Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Seja bem-vindo!
        </h2>
        <p className="text-gray-600 text-sm">
          Preencha corretamente os campos abaixo para efetuar o login.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Campo E-mail */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            E-mail *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              {...register("email")}
              type="email"
              placeholder="Digite seu e-mail"
              className="pl-10 h-12 border-gray-300 focus:border-primary-500 focus:ring-primary-500"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Campo Senha */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Senha *
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua senha"
              className="pl-10 pr-10 h-12 border-gray-300 focus:border-primary-500 focus:ring-primary-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Opções */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="keepSession"
              checked={keepSession}
              onCheckedChange={(checked) => setValue("keepSession", !!checked)}
            />
            <label htmlFor="keepSession" className="text-sm text-gray-700">
              Manter sessão
            </label>
          </div>
          <Link
            href="/forgot-password"
            className="text-sm text-primary-600 hover:text-primary-700 hover:underline"
          >
            Esqueceu sua senha? Clique aqui.
          </Link>
        </div>

        {/* Botão Login */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
        >
          {isLoading ? "Entrando..." : "Login"}
        </Button>

        {/* Link cadastro */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Ainda não possui cadastro?{" "}
            <Link
              href="/auth/register"
              className="text-primary-600 hover:text-primary-700 hover:underline font-medium"
            >
              Clique aqui.
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
