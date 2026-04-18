"use client"

import { MessageCircle } from "lucide-react"
import { normalizePhoneForWhatsApp } from "@/lib/utils"

interface WhatsAppButtonProps {
  phone: string
  name: string
  message?: string
}

export function WhatsAppButton({ phone, name, message }: WhatsAppButtonProps) {
  const digits = phone.replace(/\D/g, "")
  const isValidPhone = digits.length >= 10 && digits.length <= 11

  if (!isValidPhone) return null

  const normalizedPhone = normalizePhoneForWhatsApp(phone)
  const defaultMessage = message || `Olá, ${name}! Entramos em contato pelo sistema DAZA ERP.`
  const waUrl = `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(defaultMessage)}`

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      title={`Contatar ${name} via WhatsApp`}
      className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-semibold text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-950/20 transition-colors"
    >
      <MessageCircle className="w-3.5 h-3.5" />
      WhatsApp
    </a>
  )
}
