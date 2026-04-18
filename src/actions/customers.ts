"use server";

import { db } from "@/db";
import { customers } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getCustomers() {
  try {
    const data = await db.select().from(customers).orderBy(desc(customers.createdAt));
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching customers:", error);
    return { success: false, error: "Falha ao buscar clientes" };
  }
}

export async function createCustomer(formData: any) {
  try {
    const [newCustomer] = await db.insert(customers).values({
      name: formData.name,
      document: formData.document,
      email: formData.email,
      phone: formData.phone,
      zipCode: formData.zipCode,
      address: formData.address,
    }).returning();
    
    revalidatePath("/clientes");
    return { success: true, data: newCustomer };
  } catch (error) {
    console.error("Error creating customer:", error);
    return { success: false, error: "Falha ao criar cliente" };
  }
}

export async function updateCustomer(id: number, formData: any) {
  try {
    const [updated] = await db.update(customers)
      .set({
        name: formData.name,
        document: formData.document,
        email: formData.email,
        phone: formData.phone,
        zipCode: formData.zipCode,
        address: formData.address,
        updatedAt: new Date(),
      })
      .where(eq(customers.id, id))
      .returning();

    revalidatePath("/clientes");
    return { success: true, data: updated };
  } catch (error) {
    console.error("Error updating customer:", error);
    return { success: false, error: "Falha ao atualizar cliente" };
  }
}

export async function deleteCustomer(id: number) {
  try {
    await db.delete(customers).where(eq(customers.id, id));
    revalidatePath("/clientes");
    return { success: true };
  } catch (error) {
    console.error("Error deleting customer:", error);
    return { success: false, error: "Falha ao deletar cliente. Talvez existam vendas associadas." };
  }
}
