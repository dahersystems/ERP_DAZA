import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const latestSales = [
  { id: "001", customer: "João Silva", status: "Pago", total: "R$ 450,00", date: "Hoje, 10:45" },
  { id: "002", customer: "Maria Oliveira", status: "Pendente", total: "R$ 1.200,50", date: "Hoje, 09:30" },
  { id: "003", customer: "Ricardo Santos", status: "Pago", total: "R$ 89,90", date: "Ontem, 18:20" },
  { id: "004", customer: "Carla Ferreira", status: "Cancelado", total: "R$ 350,00", date: "Ontem, 16:15" },
  { id: "005", customer: "Lucas Mendes", status: "Pago", total: "R$ 2.100,00", date: "16/04/2026" },
];

export function RecentSales() {
  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b border-border/50">
            <TableHead className="w-[100px] font-semibold text-sm uppercase tracking-wider text-muted-foreground">ID</TableHead>
            <TableHead className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Cliente</TableHead>
            <TableHead className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Status</TableHead>
            <TableHead className="text-right font-semibold text-sm uppercase tracking-wider text-muted-foreground">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {latestSales.map((sale) => (
            <TableRow key={sale.id} className="border-b border-border/40 hover:bg-muted/30 transition-colors">
              <TableCell className="font-mono text-sm">#{sale.id}</TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium text-foreground">{sale.customer}</span>
                  <span className="text-xs text-muted-foreground">{sale.date}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge 
                  variant={
                    sale.status === "Pago" ? "default" : 
                    sale.status === "Pendente" ? "secondary" : 
                    "destructive"
                  }
                  className={`text-xs uppercase font-semibold tracking-tight px-3 py-1 ${
                    sale.status === "Pago" ? "bg-primary/10 text-primary border-primary/20" : ""
                  }`}
                >
                  {sale.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right font-bold text-foreground">
                {sale.total}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
