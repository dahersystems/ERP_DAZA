import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { db } from '@/db'
import { customers, products } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const runtime = 'edge';

const app = new Hono().basePath('/api')

app.get('/clientes', async (c) => {
  const allCustomers = await db.select().from(customers);
  return c.json(allCustomers)
})

app.post('/clientes', async (c) => {
  const body = await c.req.json();
  const newCustomer = await db.insert(customers).values(body).returning();
  return c.json(newCustomer[0], 201)
})

app.get('/produtos', async (c) => {
  const allProducts = await db.select().from(products);
  return c.json(allProducts)
})

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)
