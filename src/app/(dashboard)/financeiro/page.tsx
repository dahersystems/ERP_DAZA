import { getFinancialSummary } from "@/actions/financials";
import { PAYMENT_LABELS, PAYMENT_COLORS } from "@/lib/payment-constants";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Receipt,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { DailyRevenueChart, WeeklyBarChart, PaymentMixChart } from "@/components/dashboard/financials-charts";

const BRL = (v: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

export default async function FinanceiroPage() {
  const result = await getFinancialSummary();
  const data = result.success && result.data ? result.data : null;

  const growth = data?.growthPct ? parseFloat(data.growthPct) : null;
  const isPositive = growth !== null && growth >= 0;

  return (
    <div className="flex flex-col gap-8 max-w-[1600px] mx-auto w-full pb-12">
      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-border/40 pb-6">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Financeiro</h1>
        <p className="text-base text-muted-foreground">
          Fluxo de caixa, receita por forma de pagamento e desempenho mensal.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Faturamento Mensal */}
        <Card className="border-border/60 shadow-sm bg-card">
          <CardHeader className="pb-2 pt-6 px-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Faturamento Mensal
              </CardTitle>
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-primary" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="text-3xl font-bold text-foreground mt-2">
              {BRL(data?.currentMonthTotal ?? 0)}
            </div>
            {growth !== null ? (
              <div className={`flex items-center gap-1 mt-2 text-sm font-semibold ${isPositive ? "text-green-600" : "text-red-500"}`}>
                {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {isPositive ? "+" : ""}{growth}% vs mês anterior
              </div>
            ) : (
              <p className="text-xs text-muted-foreground mt-2">Primeiro mês de dados</p>
            )}
          </CardContent>
        </Card>

        {/* Ticket Médio */}
        <Card className="border-border/60 shadow-sm bg-card">
          <CardHeader className="pb-2 pt-6 px-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Ticket Médio
              </CardTitle>
              <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Receipt className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="text-3xl font-bold text-foreground mt-2">
              {BRL(data?.avgTicket ?? 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Média por pedido no mês atual
            </p>
          </CardContent>
        </Card>

        {/* Pedidos no Mês */}
        <Card className="border-border/60 shadow-sm bg-card">
          <CardHeader className="pb-2 pt-6 px-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Pedidos no Mês
              </CardTitle>
              <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <ShoppingCart className="w-4 h-4 text-orange-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="text-3xl font-bold text-foreground mt-2">
              {(data?.currentMonthCount ?? 0).toLocaleString("pt-BR")}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Pedidos concluídos neste mês
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Daily Revenue Area */}
        <Card className="lg:col-span-8 border-border/60 shadow-sm bg-card">
          <CardHeader className="p-7 border-b border-border/40">
            <CardTitle className="text-lg font-bold">Receita Diária</CardTitle>
            <CardDescription className="font-medium">Últimos 30 dias de faturamento</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[280px]">
              <DailyRevenueChart data={data?.dailyRevenue ?? []} />
            </div>
          </CardContent>
        </Card>

        {/* Payment Mix Donut */}
        <Card className="lg:col-span-4 border-border/60 shadow-sm bg-card">
          <CardHeader className="p-7 border-b border-border/40">
            <CardTitle className="text-lg font-bold">Mix de Pagamento</CardTitle>
            <CardDescription className="font-medium">Distribuição do mês atual</CardDescription>
          </CardHeader>
          <CardContent className="p-2">
            <div className="h-[280px]">
              <PaymentMixChart data={data?.paymentMix ?? []} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Bar */}
        <Card className="lg:col-span-5 border-border/60 shadow-sm bg-card">
          <CardHeader className="p-7 border-b border-border/40">
            <CardTitle className="text-lg font-bold">Últimos 7 Dias</CardTitle>
            <CardDescription className="font-medium">Comparativo diário desta semana</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[220px]">
              <WeeklyBarChart data={data?.dailyRevenue ?? []} />
            </div>
          </CardContent>
        </Card>

        {/* Top Sales Table */}
        <Card className="lg:col-span-7 border-border/60 shadow-sm bg-card">
          <CardHeader className="p-7 border-b border-border/40">
            <CardTitle className="text-lg font-bold">Maiores Vendas do Mês</CardTitle>
            <CardDescription className="font-medium">Top 10 pedidos por valor</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-muted/40">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-semibold h-10 pl-7">#</TableHead>
                  <TableHead className="font-semibold h-10">Valor</TableHead>
                  <TableHead className="font-semibold h-10">Pagamento</TableHead>
                  <TableHead className="font-semibold h-10">Data</TableHead>
                  <TableHead className="font-semibold h-10">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(data?.topSales ?? []).length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      Nenhuma venda este mês.
                    </TableCell>
                  </TableRow>
                ) : (
                  data!.topSales.map((sale) => (
                    <TableRow key={sale.id} className="hover:bg-muted/30">
                      <TableCell className="pl-7 text-muted-foreground text-sm">#{sale.id}</TableCell>
                      <TableCell className="font-bold text-foreground">
                        {BRL(Number(sale.totalAmount))}
                      </TableCell>
                      <TableCell>
                        <span
                          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold"
                          style={{
                            backgroundColor: `${PAYMENT_COLORS[sale.paymentMethod] ?? "#94a3b8"}20`,
                            color: PAYMENT_COLORS[sale.paymentMethod] ?? "#94a3b8",
                          }}
                        >
                          {PAYMENT_LABELS[sale.paymentMethod] ?? sale.paymentMethod}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {new Date(sale.createdAt).toLocaleDateString("pt-BR")}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            sale.status === "COMPLETED"
                              ? "border-green-500/40 text-green-600 bg-green-50 dark:bg-green-950/20"
                              : "border-red-500/40 text-red-600"
                          }`}
                        >
                          {sale.status === "COMPLETED" ? "Concluído" : sale.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
