import { db } from "./src/db";
import { products, customers } from "./src/db/schema";

async function seed() {
  console.log("Seeding data...");
  try {
    // Add a test product
    await db.insert(products).values({
      name: "Cabo HDMI 2.0 4K",
      sku: "CH-001",
      salePrice: "49.90",
      costPrice: "15.00",
      currentStock: 50,
    }).onConflictDoNothing();

    await db.insert(products).values({
      name: "Teclado Mecânico RGB",
      sku: "TM-RGB",
      salePrice: "299.00",
      costPrice: "120.00",
      currentStock: 15,
    }).onConflictDoNothing();

    // Add a test customer
    await db.insert(customers).values({
      name: "João da Silva",
      document: "123.456.789-00",
      email: "joao@example.com",
    }).onConflictDoNothing();

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Seeding failed:", error);
  }
}

seed();
