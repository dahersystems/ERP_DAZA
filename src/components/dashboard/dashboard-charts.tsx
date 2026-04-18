"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";

const data = [
  { name: "Seg", vendas: 4000, faturamento: 2400 },
  { name: "Ter", vendas: 3000, faturamento: 1398 },
  { name: "Qua", vendas: 2000, faturamento: 9800 },
  { name: "Qui", vendas: 2780, faturamento: 3908 },
  { name: "Sex", vendas: 1890, faturamento: 4800 },
  { name: "Sáb", vendas: 2390, faturamento: 3800 },
  { name: "Dom", vendas: 3490, faturamento: 4300 },
];

export function RevenueChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E4E4E7" />
          <XAxis 
            dataKey="name" 
            stroke="#71717A" 
            fontSize={14} 
            tickLine={false} 
            axisLine={false} 
          />
          <YAxis 
            stroke="#71717A" 
            fontSize={14} 
            tickLine={false} 
            axisLine={false} 
            tickFormatter={(value) => `R$${value}`}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: '1px solid #E4E4E7', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Line
            type="monotone"
            dataKey="faturamento"
            stroke="#FF8C00"
            strokeWidth={3}
            dot={{ r: 4, fill: "#FF8C00", strokeWidth: 2, stroke: "#fff" }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function SalesChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E4E4E7" />
          <XAxis 
            dataKey="name" 
            stroke="#71717A" 
            fontSize={14} 
            tickLine={false} 
            axisLine={false} 
          />
          <YAxis 
            stroke="#71717A" 
            fontSize={14} 
            tickLine={false} 
            axisLine={false} 
          />
          <Tooltip 
            cursor={{ fill: '#F4F4F5' }}
            contentStyle={{ borderRadius: '8px', border: '1px solid #E4E4E7' }}
          />
          <Bar dataKey="vendas" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#1A1A1A" : "#27272A"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
