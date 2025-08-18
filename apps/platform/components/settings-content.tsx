"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { User, Shield, X, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { personalInfoSchema, passwordSchema, type PersonalInfoForm, type PasswordForm } from "@/types"

export function SettingsContent() {
  const [activeSettingsForm, setActiveSettingsForm] = useState<string | null>(null)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const personalInfoForm = useForm<PersonalInfoForm>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: "Leslie Alexander",
      email: "leslie.alexander@example.com",
      bio: "UI Designer apaixonada por criar experiências incríveis e ajudar causas sociais.",
    },
  })

  const passwordForm = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  const onSubmitPersonalInfo = (data: PersonalInfoForm) => {
    console.log("Informações pessoais atualizadas:", data)
    setActiveSettingsForm(null)
  }

  const onSubmitPassword = (data: PasswordForm) => {
    console.log("Senha alterada:", data)
    passwordForm.reset()
    setActiveSettingsForm(null)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Configurações do Usuário</h2>
        </CardHeader>
        <CardContent className="p-6">
          {activeSettingsForm === null ? (
            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                onClick={() => setActiveSettingsForm("personalInfo")}
              >
                <User className="w-4 h-4 mr-2" />
                Editar informações pessoais
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                onClick={() => setActiveSettingsForm("password")}
              >
                <Shield className="w-4 h-4 mr-2" />
                Alterar senha
              </Button>
            </div>
          ) : (
            <div>
              {/* Formulário de Informações Pessoais */}
              {activeSettingsForm === "personalInfo" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Editar Informações Pessoais</h3>
                    <Button variant="ghost" size="sm" onClick={() => setActiveSettingsForm(null)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  <form onSubmit={personalInfoForm.handleSubmit(onSubmitPersonalInfo)} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nome completo</label>
                      <Input {...personalInfoForm.register("name")} placeholder="Digite seu nome completo" />
                      {personalInfoForm.formState.errors.name && (
                        <p className="text-sm text-red-600 mt-1">{personalInfoForm.formState.errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <Input type="email" {...personalInfoForm.register("email")} placeholder="Digite seu email" />
                      {personalInfoForm.formState.errors.email && (
                        <p className="text-sm text-red-600 mt-1">{personalInfoForm.formState.errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Biografia</label>
                      <Textarea
                        {...personalInfoForm.register("bio")}
                        placeholder="Conte um pouco sobre você..."
                        rows={4}
                      />
                      {personalInfoForm.formState.errors.bio && (
                        <p className="text-sm text-red-600 mt-1">{personalInfoForm.formState.errors.bio.message}</p>
                      )}
                    </div>

                    <div className="flex space-x-3 pt-4">
                      <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                        Salvar alterações
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setActiveSettingsForm(null)}>
                        Cancelar
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {/* Formulário de Alteração de Senha */}
              {activeSettingsForm === "password" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Alterar Senha</h3>
                    <Button variant="ghost" size="sm" onClick={() => setActiveSettingsForm(null)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  <form onSubmit={passwordForm.handleSubmit(onSubmitPassword)} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Senha atual</label>
                      <div className="relative">
                        <Input
                          type={showCurrentPassword ? "text" : "password"}
                          {...passwordForm.register("currentPassword")}
                          placeholder="Digite sua senha atual"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                      {passwordForm.formState.errors.currentPassword && (
                        <p className="text-sm text-red-600 mt-1">
                          {passwordForm.formState.errors.currentPassword.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nova senha</label>
                      <div className="relative">
                        <Input
                          type={showNewPassword ? "text" : "password"}
                          {...passwordForm.register("newPassword")}
                          placeholder="Digite sua nova senha"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                      {passwordForm.formState.errors.newPassword && (
                        <p className="text-sm text-red-600 mt-1">{passwordForm.formState.errors.newPassword.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Confirmar nova senha</label>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          {...passwordForm.register("confirmPassword")}
                          placeholder="Confirme sua nova senha"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                      {passwordForm.formState.errors.confirmPassword && (
                        <p className="text-sm text-red-600 mt-1">
                          {passwordForm.formState.errors.confirmPassword.message}
                        </p>
                      )}
                    </div>

                    <div className="flex space-x-3 pt-4">
                      <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                        Alterar senha
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setActiveSettingsForm(null)}>
                        Cancelar
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
