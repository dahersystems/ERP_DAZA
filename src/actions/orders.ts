"use server";

import { db } from "@/db";
import { orders, orderItems, customers, products, inventoryTransactions } from "@/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getOrders() {
  try {
    const data = await db
      .select({
        id: orders.id,
        totalAmount: orders.totalAmount,
        paymentMethod: orders.paymentMethod,
        status: orders.status,
        nfeStatus: orders.nfeStatus,
        createdAt: orders.createdAt,
        customerName: customers.name,
      })
      .from(orders)
      .leftJoin(customers, eq(orders.customerId, customers.id))
      .orderBy(desc(orders.createdAt));

    return { success: true, data };
  } catch (error) {
    console.error("Error fetching orders:", error);
    return { success: false, error: "Falha ao buscar vendas" };
  }
}

export async function createOrder(data: {
  customerId: number;
  paymentMethod: string;
  items: { productId: number; quantity: number; unitPrice: string; subtotal: string }[];
  totalAmount: string;
}) {
  try {
    const result = await db.transaction(async (tx) => {
      // 1. Inserir Pedido
      const [newOrder] = await tx.insert(orders).values({
        customerId: data.customerId,
        paymentMethod: data.paymentMethod,
        totalAmount: data.totalAmount,
        status: "COMPLETED",
      }).returning();

      // 2. Inserir Itens
      const itemsToInsert = data.items.map(item => ({
        orderId: newOrder.id,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        subtotal: item.subtotal,
      }));

      await tx.insert(orderItems).values(itemsToInsert);
      
      // 3. Baixa de estoque e registro de transação
      for (const item of data.items) {
        // Reduzir estoque atual
        await tx.update(products)
          .set({ currentStock: sql`${products.currentStock} - ${item.quantity}` })
          .where(eq(products.id, item.productId));

        // Registrar na tabela de histórico
        await tx.insert(inventoryTransactions).values({
          productId: item.productId,
          type: "OUT",
          quantity: item.quantity,
          referenceId: newOrder.id,
          notes: `Venda registrada (Pedido #${newOrder.id})`,
        });
      }

      return newOrder;
    });
    
    revalidatePath("/vendas");
    revalidatePath("/produtos");
    return { success: true, data: result };
  } catch (error) {
    console.error("Error creating order:", error);
    return { success: false, error: "Falha ao registrar venda." };
  }
}
