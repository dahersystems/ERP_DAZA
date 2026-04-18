import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, TrendingUp, Users, Package } from "lucide-react"

export default function RelatoriosPage() {
  return (
    <div className="flex flex-col gap-6 max-w-[1400px] mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Relatórios</h2>
          <p className="text-muted-foreground mt-1">Análise de métricas, gráficos de faturamento e insights da loja.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Vendas e Receita
            </CardTitle>
            <CardDescription>Fluxo de caixa e faturamento diário</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-secondary hover:bg-[#005bb5] text-white">Gerar Relatório</Button>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              Movimentação de Estoque
            </CardTitle>
            <CardDescription>Entradas, saídas e previsões de ruptura</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-secondary hover:bg-[#005bb5] text-white">Gerar Relatório</Button>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Perfil de Clientes
            </CardTitle>
            <CardDescription>Análise de fidelidade e ticket médio</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-secondary hover:bg-[#005bb5] text-white">Gerar Relatório</Button>
          </CardContent>
        </Card>
      </div>

      {/* Mocking a visual area for a chart */}
      <div className="mt-4 bg-card border border-border/60 rounded-xl shadow-sm p-6 min-h-[400px] flex items-center justify-center flex-col gap-4 text-muted-foreground">
        <BarChart3 className="w-16 h-16 text-muted-foreground/30" />
        <p className="font-medium text-lg">Gráfico Resumo Anual</p>
        <p className="text-sm">Os gráficos de acompanhamento D3/Recharts serão renderizados nesta seção.</p>
      </div>
    </div>
  )
}
