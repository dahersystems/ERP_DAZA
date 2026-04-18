import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Search, Receipt } from "lucide-react"
import { getOrders } from "@/actions/orders"
import { getCustomers } from "@/actions/customers"
import { getProducts } from "@/actions/products"
import { PDVFormModal } from "./pdv-form-modal"
import { ExportButton } from "@/components/common/export-button"

export default async function VendasPage() {
  const [ordersResult, customersResult, productsResult] = await Promise.all([
    getOrders(),
    getCustomers(),
    getProducts()
  ]);

  const orders = ordersResult.success && ordersResult.data ? ordersResult.data : [];
  const customers = customersResult.success && customersResult.data ? customersResult.data : [];
  const products = productsResult.success && productsResult.data ? productsResult.data : [];

  // Prepare simple data for export
  const exportData = orders.map(o => ({
    ID: o.id,
    Cliente: o.customerName,
    Data: new Date(o.createdAt).toLocaleString('pt-BR'),
    Total: o.totalAmount,
    Status: o.status,
    Pagamento: o.paymentMethod,
    NFe: o.nfeStatus
  }));

  return (
    <div className="flex flex-col gap-6 max-w-[1400px] mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Vendas</h2>
          <p className="text-muted-foreground mt-1">Gerencie os pedidos, checkout e histórico de Notas Fiscais.</p>
        </div>
        <PDVFormModal customers={customers} products={products} />
      </div>

      <div className="bg-card border border-border/60 rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-border/60 flex flex-col sm:flex-row justify-between items-center bg-muted/20 gap-4">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar por ID, Cliente ou Status..."
              className="pl-9 h-10 w-full bg-background border-input focus-visible:ring-primary shadow-sm"
            />
          </div>
          <ExportButton data={exportData} filename="relatorio_vendas" />
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-semibold text-secondary-foreground h-11">Pedido</TableHead>
                <TableHead className="font-semibold text-secondary-foreground h-11">Cliente</TableHead>
                <TableHead className="font-semibold text-secondary-foreground h-11">Data</TableHead>
                <TableHead className="font-semibold text-secondary-foreground h-11">Total</TableHead>
                <TableHead className="font-semibold text-secondary-foreground h-11">Status</TableHead>
                <TableHead className="font-semibold text-secondary-foreground h-11">NF-e</TableHead>
                <TableHead className="text-right font-semibold text-secondary-foreground h-11">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                    Nenhuma venda registrada ainda.
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-medium text-foreground py-4">#{order.id}</TableCell>
                    <TableCell className="text-muted-foreground py-4">{order.customerName}</TableCell>
                    <TableCell className="text-muted-foreground py-4">
                      {new Date(order.createdAt).toLocaleString('pt-BR')}
                    </TableCell>
                    <TableCell className="text-foreground font-semibold py-4">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(order.totalAmount))}
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-transparent">
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge variant="outline" className="text-muted-foreground border-muted">
                        {order.nfeStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right py-4">
                      <Button variant="ghost" size="sm" className="text-secondary hover:text-primary hover:bg-primary/10">Ver Detalhes</Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

