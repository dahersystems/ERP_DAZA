"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import { PAYMENT_COLORS, PAYMENT_LABELS } from "@/lib/payment-constants";

const BRL = (v: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

// ─── Daily Revenue Area Chart ────────────────────────────────────────────────
export function DailyRevenueChart({
  data,
}: {
  data: { date: string; total: number }[];
}) {
  const formatted = data.map((d) => ({
    ...d,
    label: new Date(d.date + "T12:00:00").toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
    }),
  }));

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
        Nenhuma venda nos últimos 30 dias.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={formatted} margin={{ top: 4, right: 20, left: 10, bottom: 0 }}>
        <defs>
          <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FF8C00" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#FF8C00" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
          axisLine={false}
          tickLine={false}
          interval="preserveStartEnd"
        />
        <YAxis
          tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`}
          tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
          axisLine={false}
          tickLine={false}
          width={55}
        />
        <Tooltip
          formatter={(val: any) => [BRL(Number(val)), "Receita"] as any}
          labelStyle={{ fontWeight: 600 }}
          contentStyle={{
            background: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: 8,
            fontSize: 12,
          }}
        />
        <Area
          type="monotone"
          dataKey="total"
          stroke="#FF8C00"
          strokeWidth={2.5}
          fill="url(#revenueGrad)"
          dot={false}
          activeDot={{ r: 5, fill: "#FF8C00" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// ─── Weekly Bar Chart (last 7 days grouped from daily data) ──────────────────
export function WeeklyBarChart({
  data,
}: {
  data: { date: string; total: number }[];
}) {
  const last7 = data.slice(-7).map((d) => ({
    ...d,
    label: new Date(d.date + "T12:00:00").toLocaleDateString("pt-BR", {
      weekday: "short",
    }),
  }));

  if (last7.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
        Sem dados.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={last7} margin={{ top: 4, right: 12, left: 10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`}
          tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
          axisLine={false}
          tickLine={false}
          width={55}
        />
        <Tooltip
          formatter={(val: any) => [BRL(Number(val)), "Receita"] as any}
          contentStyle={{
            background: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: 8,
            fontSize: 12,
          }}
        />
        <Bar dataKey="total" fill="#FF8C00" radius={[6, 6, 0, 0]} maxBarSize={48} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// ─── Payment Mix Donut Chart ─────────────────────────────────────────────────
export function PaymentMixChart({
  data,
}: {
  data: { method: string; total: number }[];
}) {
  const withLabels = data.map((d) => ({
    ...d,
    name: PAYMENT_LABELS[d.method] ?? d.method,
    fill: PAYMENT_COLORS[d.method] ?? "#94a3b8",
  }));

  if (withLabels.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
        Sem vendas este mês.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={withLabels}
          dataKey="total"
          nameKey="name"
          cx="50%"
          cy="45%"
          innerRadius="50%"
          outerRadius="70%"
          paddingAngle={3}
          label={false}
        >
          {withLabels.map((entry, i) => (
            <Cell key={i} fill={entry.fill} />
          ))}
        </Pie>
        <Legend
          iconType="circle"
          iconSize={9}
          formatter={(value) => (
            <span style={{ fontSize: 12, color: "hsl(var(--foreground))" }}>{value}</span>
          )}
        />
        <Tooltip
          formatter={(val: any) => [BRL(Number(val))] as any}
          contentStyle={{
            background: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: 8,
            fontSize: 12,
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
