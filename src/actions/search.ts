"use server";

import { db } from "@/db";
import { products, customers } from "@/db/schema";
import { ilike, or } from "drizzle-orm";

export async function searchGlobal(query: string) {
  if (!query || query.length < 2) return { success: true, data: { products: [], customers: [] } };

  try {
    const [productsResult, customersResult] = await Promise.all([
      db
        .select({
          id: products.id,
          name: products.name,
          sku: products.sku,
          salePrice: products.salePrice,
        })
        .from(products)
        .where(
          or(
            ilike(products.name, `%${query}%`),
            ilike(products.sku, `%${query}%`)
          )
        )
        .limit(5),
      db
        .select({
          id: customers.id,
          name: customers.name,
          document: customers.document,
        })
        .from(customers)
        .where(
          or(
            ilike(customers.name, `%${query}%`),
            ilike(customers.document, `%${query}%`)
          )
        )
        .limit(5),
    ]);

    return {
      success: true,
      data: {
        products: productsResult,
        customers: customersResult,
      },
    };
  } catch (error) {
    console.error("Search error:", error);
    return { success: false, error: "Falha na busca global" };
  }
}
