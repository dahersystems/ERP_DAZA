"use client"

import * as React from "react"
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
  Users,
  Package,
  Search,
  Plus,
  ShoppingCart,
  TrendingUp,
} from "lucide-react"
import { useRouter } from "next/navigation"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { searchGlobal } from "@/actions/search"
import { toast } from "sonner"

export function SpotlightSearch() {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [results, setResults] = React.useState<{ products: any[]; customers: any[] }>({
    products: [],
    customers: [],
  })
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  React.useEffect(() => {
    const fetchResults = async () => {
      if (query.length < 2) {
        setResults({ products: [], customers: [] })
        return
      }

      setLoading(true)
      const res = await searchGlobal(query)
      if (res.success && res.data) {
        setResults(res.data)
      }
      setLoading(false)
    }

    const timer = setTimeout(fetchResults, 300)
    return () => clearTimeout(timer)
  }, [query])

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground bg-muted/50 border border-border/60 rounded-lg hover:bg-muted transition-colors w-full max-w-[300px] text-left"
      >
        <Search className="w-4 h-4" />
        <span className="flex-1">Buscar no sistema...</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog 
        open={open} 
        onOpenChange={setOpen}
        commandProps={{ shouldFilter: false }}
      >
        <CommandInput 
          placeholder="Procure por produtos, clientes ou SKU..." 
          value={query}
          onValueChange={setQuery}
        />
        <CommandList className="max-h-[80vh] min-h-[300px]">
          {loading && (
            <div className="py-6 text-center text-sm text-muted-foreground">
              Buscando...
            </div>
          )}

          {!loading && query.length >= 2 && results.products.length === 0 && results.customers.length === 0 && (
            <CommandEmpty>Nenhum resultado encontrado para "{query}".</CommandEmpty>
          )}
          
          {results.products.length > 0 && (
            <CommandGroup heading="Produtos">
              {results.products.map((product) => (
                <CommandItem
                  key={product.id}
                  onSelect={() => runCommand(() => router.push(`/produtos?search=${product.sku}`))}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-muted-foreground" />
                    <div className="flex flex-col">
                      <span className="font-medium">{product.name}</span>
                      <span className="text-xs text-muted-foreground">SKU: {product.sku}</span>
                    </div>
                  </div>
                  <span className="text-sm font-semibold">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(product.salePrice))}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {results.customers.length > 0 && (
            <CommandGroup heading="Clientes">
              {results.customers.map((customer) => (
                <CommandItem
                  key={customer.id}
                  onSelect={() => runCommand(() => router.push(`/clientes?search=${customer.document}`))}
                  className="flex items-center gap-2"
                >
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <div className="flex flex-col">
                    <span className="font-medium">{customer.name}</span>
                    <span className="text-xs text-muted-foreground">{customer.document}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          <CommandSeparator />
          
          <CommandGroup heading="Atalhos Rápidos">
            {[
              { icon: Plus, label: "Lançar Nova Venda", href: "/vendas" },
              { icon: TrendingUp, label: "Ver Relatório de Estoque", href: "/produtos" },
              { icon: Settings, label: "Configurações do Sistema", href: "/configuracoes" },
            ]
              .filter(action => query === "" || action.label.toLowerCase().includes(query.toLowerCase()))
              .map((action, i) => (
                <CommandItem key={i} onSelect={() => runCommand(() => router.push(action.href))}>
                  <action.icon className="mr-2 h-4 w-4" />
                  <span>{action.label}</span>
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
