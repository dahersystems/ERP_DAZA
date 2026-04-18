import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Search } from "lucide-react"
import { getCustomers } from "@/actions/customers"
import { CustomerFormModal } from "./customer-form-modal"

export default async function ClientesPage() {
  const customersResult = await getCustomers()
  const customers = customersResult.success && customersResult.data ? customersResult.data : []

  return (
    <div className="flex flex-col gap-6 max-w-[1400px] mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Clientes</h2>
          <p className="text-muted-foreground mt-1">Gerencie a carteira de clientes e pontos de fidelidade.</p>
        </div>
        <CustomerFormModal />
      </div>

      <div className="bg-card border border-border/60 rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-border/60 flex flex-col sm:flex-row justify-between items-center bg-muted/20 gap-4">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar por nome, CPF ou CNPJ..."
              className="pl-9 h-10 w-full bg-background border-input focus-visible:ring-primary shadow-sm"
            />
          </div>
          <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 w-full sm:w-auto h-10">
            Exportar CSV
          </Button>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-semibold text-secondary-foreground h-11">Nome</TableHead>
                <TableHead className="font-semibold text-secondary-foreground h-11">Documento</TableHead>
                <TableHead className="font-semibold text-secondary-foreground h-11">Email</TableHead>
                <TableHead className="font-semibold text-secondary-foreground h-11">Pontos Flex</TableHead>
                <TableHead className="text-right font-semibold text-secondary-foreground h-11">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                    Nenhum cliente cadastrado.
                  </TableCell>
                </TableRow>
              ) : (
                customers.map((customer) => (
                  <TableRow key={customer.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-medium text-foreground py-4">{customer.name}</TableCell>
                    <TableCell className="text-muted-foreground py-4">{customer.document}</TableCell>
                    <TableCell className="text-muted-foreground py-4">{customer.email || "-"}</TableCell>
                    <TableCell className="text-foreground font-bold py-4 text-primary">{customer.loyaltyPoints}</TableCell>
                    <TableCell className="text-right py-4">
                      <Button variant="ghost" size="sm" className="text-secondary hover:text-primary hover:bg-primary/10">Editar</Button>
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
