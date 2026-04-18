import { StockAlerts } from "@/components/dashboard/stock-alerts"
import { RevenueChart, SalesChart } from "@/components/dashboard/dashboard-charts"
import { RecentSales } from "@/components/dashboard/recent-sales"
import { CRMHighlights } from "@/components/dashboard/crm-highlights"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Plus, 
  DollarSign, 
  ArrowUpRight, 
  Users, 
  TrendingUp,
  Download,
  Calendar,
  MessageCircle,
} from "lucide-react"

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-10 max-w-[1600px] mx-auto w-full pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/40 pb-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span className="text-base">Sábado, 18 de Abril de 2026</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="lg" className="h-12 px-6 font-semibold text-sm border-border">
            <Download className="w-4 h-4 mr-2" /> Exportar Relatório
          </Button>
          <Button size="lg" className="h-12 px-8 bg-primary hover:bg-primary/90 text-white font-bold text-sm shadow-md transition-all">
            <Plus className="w-5 h-5 mr-2" /> Nova Venda
          </Button>
        </div>
      </div>

      {/* Bento Grid Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-6">
        {/* Main Hero Card: Revenue */}
        <Card className="md:col-span-4 lg:col-span-12 xl:col-span-8 border-border/60 shadow-md bg-card overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <DollarSign className="w-32 h-32 rotate-12" />
          </div>
          <CardHeader className="p-8">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <CardTitle className="text-base font-semibold uppercase tracking-widest text-muted-foreground">Faturamento Mensal</CardTitle>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="text-6xl font-bold text-foreground">R$ 145.231,89</span>
              <span className="text-xl font-semibold text-green-600 flex items-center gap-1">
                <ArrowUpRight className="w-5 h-5" /> +24%
              </span>
            </div>
            <CardDescription className="text-base text-muted-foreground mt-2 font-medium">
              Performance superando a meta em <span className="text-foreground">R$ 12.000,00</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 border-t border-border/40 bg-muted/5">
            <div className="h-[350px] w-full pt-8 pr-8">
              <RevenueChart />
            </div>
          </CardContent>
        </Card>

        {/* Secondary Info Stack */}
        <div className="md:col-span-4 lg:col-span-6 xl:col-span-4 flex flex-col gap-6">
          {/* KPI 2: Ticket Médio */}
          <Card className="border-border/60 shadow-sm bg-card hover:border-primary/40 transition-colors">
            <CardHeader className="p-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Ticket Médio</CardTitle>
                <TrendingUp className="w-5 h-5 text-orange-500" />
              </div>
              <div className="mt-4">
                <div className="text-4xl font-bold text-foreground">R$ 185,20</div>
                <div className="flex items-center gap-1 mt-2 text-sm font-semibold text-green-600">
                  <ArrowUpRight className="w-4 h-4" /> +3.5% <span className="text-muted-foreground/60 font-normal ml-1">vs mês anterior</span>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* KPI 3: Novos Clientes */}
          <Card className="border-border/60 shadow-sm bg-card hover:border-primary/40 transition-colors">
            <CardHeader className="p-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Novos Clientes</CardTitle>
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div className="mt-4">
                <div className="text-4xl font-bold text-foreground">+182</div>
                <div className="flex items-center gap-1 mt-2 text-sm font-semibold text-green-600">
                  <ArrowUpRight className="w-4 h-4" /> +12% <span className="text-muted-foreground/60 font-normal ml-1">desde segunda-feira</span>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Stock Alerts Widget */}
          <Card className="flex-1 border-border/60 shadow-sm bg-card">
            <CardHeader className="p-6 border-b border-border/40">
              <CardTitle className="text-sm font-semibold uppercase tracking-wider flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-destructive rounded-full" />
                Alertas de Ruptura
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <StockAlerts />
            </CardContent>
          </Card>
        </div>

        {/* Sales Distribution Chart */}
        <Card className="md:col-span-4 lg:col-span-6 xl:col-span-5 border-border/60 shadow-sm bg-card">
          <CardHeader className="p-8 border-b border-border/40">
            <CardTitle className="text-lg font-bold">Distribuição por Categoria</CardTitle>
            <CardDescription className="text-sm font-medium">Volume de vendas proporcional</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <SalesChart />
          </CardContent>
        </Card>

        {/* CRM: Top Loyalty Customers */}
        <Card className="md:col-span-4 lg:col-span-6 xl:col-span-4 border-border/60 shadow-sm bg-card">
          <CardHeader className="p-6 border-b border-border/40 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-green-600" />
                Top Clientes Fidelidade
              </CardTitle>
              <CardDescription className="text-sm font-medium mt-1">Hover para contato rápido</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <CRMHighlights />
          </CardContent>
        </Card>

        {/* Recent Transactions Table */}
        <Card className="md:col-span-4 lg:col-span-12 xl:col-span-12 border-border/60 shadow-sm bg-card">
          <CardHeader className="p-8 border-b border-border/40 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold">Últimas Transações</CardTitle>
              <CardDescription className="text-sm font-medium">Monitoramento em tempo real</CardDescription>
            </div>
            <Button variant="ghost" className="text-sm font-bold text-primary">Ver Tudo</Button>
          </CardHeader>
          <CardContent className="p-4">
            <RecentSales />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

