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
import { Search } from "lucide-react"
import { getProducts, getCategories } from "@/actions/products"
import { ProductFormModal } from "./product-form-modal"
import { ExportButton } from "@/components/common/export-button"

export default async function ProdutosPage() {
  const [productsResult, categoriesResult] = await Promise.all([
    getProducts(),
    getCategories()
  ]);

  const products = productsResult.success && productsResult.data ? productsResult.data : [];
  const categories = categoriesResult.success && categoriesResult.data ? categoriesResult.data : [];

  // Prepare data for export
  const exportData = products.map(p => ({
    SKU: p.sku,
    Nome: p.name,
    Categoria: p.categoryName || "Sem Categoria",
    Preco_Custo: p.costPrice,
    Preco_Venda: p.salePrice,
    Estoque_Atual: p.currentStock,
    Alerta_Minimo: p.minStockAlert
  }));

  return (
    <div className="flex flex-col gap-6 max-w-[1400px] mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">Produtos</h2>
          <p className="text-muted-foreground mt-1">Gerencie seu catálogo de produtos e controle de estoque.</p>
        </div>
        <ProductFormModal categories={categories} />
      </div>

      <div className="bg-card border border-border/60 rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-border/60 flex flex-col sm:flex-row justify-between items-center bg-muted/20 gap-4">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar por nome, SKU..."
              className="pl-9 h-10 w-full bg-background border-input focus-visible:ring-primary shadow-sm"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <ExportButton data={exportData} filename="relatorio_produtos" />
            <Button variant="outline" className="border-border text-foreground hover:bg-muted w-full sm:w-auto h-10">
              Filtros Avançados
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-semibold text-secondary-foreground h-11">SKU</TableHead>
                <TableHead className="font-semibold text-secondary-foreground h-11">Nome</TableHead>
                <TableHead className="font-semibold text-secondary-foreground h-11">Categoria</TableHead>
                <TableHead className="font-semibold text-secondary-foreground h-11">Preço (R$)</TableHead>
                <TableHead className="font-semibold text-secondary-foreground h-11">Estoque</TableHead>
                <TableHead className="text-right font-semibold text-secondary-foreground h-11">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                    Nenhum produto cadastrado no catálogo.
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product) => (
                  <TableRow key={product.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-medium text-foreground py-4">{product.sku}</TableCell>
                    <TableCell className="text-muted-foreground py-4">{product.name}</TableCell>
                    <TableCell className="text-muted-foreground py-4">{product.categoryName || "-"}</TableCell>
                    <TableCell className="text-foreground font-medium py-4">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(product.salePrice))}
                    </TableCell>
                    <TableCell className="py-4">
                      {product.currentStock <= product.minStockAlert ? (
                        <Badge variant="outline" className="text-destructive border-destructive/30">
                          {product.currentStock} restante
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-green-600 border-green-600/30">
                          {product.currentStock} em estoque
                        </Badge>
                      )}
                    </TableCell>
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
