import { getCustomers } from "@/actions/customers"
import { MessageCircle, Star, Trophy, Users } from "lucide-react"
import { normalizePhoneForWhatsApp } from "@/lib/utils"

export async function CRMHighlights() {
  const result = await getCustomers()
  const allCustomers = result.success && result.data ? result.data : []

  // Top 5 by loyalty points
  const topCustomers = [...allCustomers]
    .sort((a, b) => (b.loyaltyPoints || 0) - (a.loyaltyPoints || 0))
    .slice(0, 5)

  if (topCustomers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 gap-2 text-center">
        <Users className="w-8 h-8 text-muted-foreground/40" />
        <p className="text-sm text-muted-foreground">Nenhum cliente cadastrado ainda.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {topCustomers.map((customer, index) => {
        const digits = (customer.phone || "").replace(/\D/g, "")
        const hasWhatsApp = digits.length >= 10
        const normalizedPhone = hasWhatsApp ? normalizePhoneForWhatsApp(customer.phone!) : null
        const waUrl = normalizedPhone
          ? `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(`Olá, ${customer.name}! Entramos em contato pelo sistema DAZA ERP.`)}`
          : null

        return (
          <div
            key={customer.id}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/40 transition-colors group"
          >
            {/* Rank Badge */}
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0
              ${index === 0 ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30" :
                index === 1 ? "bg-slate-100 text-slate-600 dark:bg-slate-800" :
                index === 2 ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30" :
                "bg-muted text-muted-foreground"}`}>
              {index === 0 ? <Trophy className="w-3.5 h-3.5" /> : index + 1}
            </div>

            {/* Customer Info */}
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-sm font-semibold text-foreground truncate">{customer.name}</span>
              <span className="text-xs text-muted-foreground">{customer.document}</span>
            </div>

            {/* Loyalty Points */}
            <div className="flex items-center gap-1 text-primary shrink-0">
              <Star className="w-3 h-3 fill-primary" />
              <span className="text-xs font-bold">{customer.loyaltyPoints}</span>
            </div>

            {/* WhatsApp Button */}
            {waUrl ? (
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={`Contatar ${customer.name} via WhatsApp`}
                className="shrink-0 w-7 h-7 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 hover:bg-green-200 dark:hover:bg-green-900/40 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
            ) : (
              <div className="w-7 h-7 shrink-0" /> /* Spacer */
            )}
          </div>
        )
      })}
    </div>
  )
}
