"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertCircle, ArrowUpRight, PackageOpen } from "lucide-react"

const stockItems = [
  { id: 1, name: "Papel A4 Premium 75g", sku: "PAP-A4-001", stock: 12, min: 20 },
  { id: 2, name: "Caneta Esferográfica Azul (Cx)", sku: "CAN-BLU-010", stock: 3, min: 50 },
  { id: 3, name: "Grampeador Industrial Metálico", sku: "GRM-IND-M1", stock: 0, min: 5 },
  { id: 4, name: "Tonner Laserjet P1102w", sku: "TNR-HP-1102", stock: 2, min: 3 },
]

export function StockAlerts() {
  return (
    <div className="space-y-4">
      {stockItems.map((item) => (
        <div 
          key={item.id} 
          className="flex items-center justify-between p-3 border border-border/40 rounded-lg hover:bg-muted/30 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-md ${item.stock === 0 ? 'bg-destructive/10 text-destructive' : 'bg-orange-500/10 text-orange-600'}`}>
              {item.stock === 0 ? <AlertCircle className="w-4 h-4" /> : <PackageOpen className="w-4 h-4" />}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold uppercase tracking-tight text-foreground truncate max-w-[180px]">
                {item.name}
              </span>
              <span className="text-xs font-mono text-muted-foreground mt-0.5">SKU: {item.sku}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className={`text-lg font-bold ${item.stock <= (item.min / 2) ? 'text-destructive' : 'text-orange-600'}`}>
                {item.stock} <span className="text-xs font-medium text-muted-foreground uppercase ml-1">UN</span>
              </span>
              <div className="w-16 h-1 bg-muted rounded-full mt-1 overflow-hidden">
                <div 
                  className={`h-full ${item.stock === 0 ? 'bg-destructive' : 'bg-orange-500'}`} 
                  style={{ width: `${Math.min((item.stock / item.min) * 100, 100)}%` }} 
                />
              </div>
            </div>
            <Button variant="outline" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity border-border/60">
              <ArrowUpRight className="w-3 h-3" />
            </Button>
          </div>
        </div>
      ))}
      <Button variant="link" className="w-full text-sm font-semibold uppercase tracking-wider text-primary hover:text-primary/80">
        Ver Relatório de Compras Completo
      </Button>
    </div>
  )
}
