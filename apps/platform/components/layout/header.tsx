"use client"

import { Search, Bell, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

import donAiLogo from '@/public/images/don-ai-logo.svg'
import Image from "next/image"

export function Header() {
  return (
    <header className="fixed w-full z-50 bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between max-w-[1450px] mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src={donAiLogo} height={49} alt="DonAI Logo" />
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input placeholder="Buscar causas, ONGs..." className="pl-10 bg-gray-50 border-gray-200" />
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          <Link href="/profile/1" className="flex items-center space-x-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/professional-woman-diverse.png" />
              <AvatarFallback>LA</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium">João Tavares</p>
              <p className="text-xs text-gray-500">Administrador</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </Link>
        </div>
      </div>
    </header>
  )
}
