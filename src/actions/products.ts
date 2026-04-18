"use server";

import { db } from "@/db";
import { products, categories } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getProducts() {
  try {
    const data = await db
      .select({
        id: products.id,
        sku: products.sku,
        name: products.name,
        description: products.description,
        costPrice: products.costPrice,
        salePrice: products.salePrice,
        currentStock: products.currentStock,
        minStockAlert: products.minStockAlert,
        categoryName: categories.name,
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .orderBy(desc(products.createdAt));

    return { success: true, data };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { success: false, error: "Falha ao buscar produtos" };
  }
}

export async function getCategories() {
  try {
    const data = await db.select().from(categories).orderBy(desc(categories.createdAt));
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { success: false, error: "Falha ao buscar categorias" };
  }
}

export async function createProduct(formData: any) {
  try {
    const [newProduct] = await db.insert(products).values({
      sku: formData.sku,
      name: formData.name,
      description: formData.description,
      categoryId: formData.categoryId ? parseInt(formData.categoryId) : undefined,
      costPrice: formData.costPrice,
      salePrice: formData.salePrice,
      currentStock: parseInt(formData.currentStock) || 0,
    }).returning();
    
    revalidatePath("/produtos");
    return { success: true, data: newProduct };
  } catch (error) {
    console.error("Error creating product:", error);
    return { success: false, error: "Falha ao criar produto. Verifique se o SKU já existe." };
  }
}
