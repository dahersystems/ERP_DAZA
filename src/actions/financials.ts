"use server";

import { db } from "@/db";
import { orders } from "@/db/schema";
import { gte, sql } from "drizzle-orm";



export async function getFinancialSummary() {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const startOf30DaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // KPIs do mês atual
    const [monthStats] = await db
      .select({
        total: sql<number>`COALESCE(SUM(CAST(${orders.totalAmount} AS NUMERIC)), 0)`,
        count: sql<number>`COUNT(*)`,
      })
      .from(orders)
      .where(gte(orders.createdAt, startOfMonth));

    // KPIs do mês anterior (para comparação %)
    const [lastMonthStats] = await db
      .select({
        total: sql<number>`COALESCE(SUM(CAST(${orders.totalAmount} AS NUMERIC)), 0)`,
        count: sql<number>`COUNT(*)`,
      })
      .from(orders)
      .where(
        sql`${orders.createdAt} >= ${startOfLastMonth} AND ${orders.createdAt} < ${startOfMonth}`
      );

    // Receita diária dos últimos 30 dias
    const dailyRevenue = await db
      .select({
        date: sql<string>`DATE(${orders.createdAt})`,
        total: sql<number>`COALESCE(SUM(CAST(${orders.totalAmount} AS NUMERIC)), 0)`,
        count: sql<number>`COUNT(*)`,
      })
      .from(orders)
      .where(gte(orders.createdAt, startOf30DaysAgo))
      .groupBy(sql`DATE(${orders.createdAt})`)
      .orderBy(sql`DATE(${orders.createdAt}) ASC`);

    // Distribuição por método de pagamento (mês atual)
    const paymentMix = await db
      .select({
        method: orders.paymentMethod,
        total: sql<number>`COALESCE(SUM(CAST(${orders.totalAmount} AS NUMERIC)), 0)`,
        count: sql<number>`COUNT(*)`,
      })
      .from(orders)
      .where(gte(orders.createdAt, startOfMonth))
      .groupBy(orders.paymentMethod);

    // Top 10 maiores vendas do mês (para a tabela)
    const topSales = await db
      .select({
        id: orders.id,
        totalAmount: orders.totalAmount,
        paymentMethod: orders.paymentMethod,
        status: orders.status,
        createdAt: orders.createdAt,
      })
      .from(orders)
      .where(gte(orders.createdAt, startOfMonth))
      .orderBy(sql`CAST(${orders.totalAmount} AS NUMERIC) DESC`)
      .limit(10);

    const currentTotal = Number(monthStats?.total ?? 0);
    const lastTotal = Number(lastMonthStats?.total ?? 0);
    const currentCount = Number(monthStats?.count ?? 0);
    const growthPct =
      lastTotal > 0
        ? (((currentTotal - lastTotal) / lastTotal) * 100).toFixed(1)
        : null;

    return {
      success: true,
      data: {
        currentMonthTotal: currentTotal,
        currentMonthCount: currentCount,
        avgTicket: currentCount > 0 ? currentTotal / currentCount : 0,
        growthPct,
        dailyRevenue: dailyRevenue.map((d) => ({
          date: d.date,
          total: Number(d.total),
          count: Number(d.count),
        })),
        paymentMix: paymentMix.map((p) => ({
          method: p.method,
          total: Number(p.total),
          count: Number(p.count),
        })),
        topSales,
      },
    };
  } catch (error) {
    console.error("Error fetching financials:", error);
    return { success: false, error: "Falha ao buscar dados financeiros" };
  }
}
