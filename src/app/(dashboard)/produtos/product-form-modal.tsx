"use client";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { useState } from "react"
import { createProduct } from "@/actions/products"
import { toast } from "sonner"

export function ProductFormModal({ categories }: { categories: any[] }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      sku: formData.get("sku") as string,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      categoryId: formData.get("categoryId") as string,
      costPrice: formData.get("costPrice") as string,
      salePrice: formData.get("salePrice") as string,
      currentStock: formData.get("currentStock") as string,
    }

    const result = await createProduct(data);

    if (result.success) {
      toast.success("Produto cadastrado com sucesso!");
      setOpen(false);
    } else {
      toast.error(result.error);
    }

    setLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button className="bg-primary hover:bg-[#E67E00] text-primary-foreground h-11 px-6 shadow-sm" />}>
        <Plus className="w-4 h-4 mr-2" />
        Novo Produto
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Novo Produto</DialogTitle>
          <DialogDescription>
            Adicione os dados do novo produto ao catálogo.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="sku">SKU *</Label>
                <Input id="sku" name="sku" required placeholder="SKU-001" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="currentStock">Estoque Inicial</Label>
                <Input id="currentStock" name="currentStock" type="number" defaultValue="0" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Nome do Produto *</Label>
              <Input id="name" name="name" required placeholder="Mouse Gamer XYZ" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Input id="description" name="description" placeholder="Uma breve descrição..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="costPrice">Preço de Custo *</Label>
                <Input id="costPrice" name="costPrice" step="0.01" type="number" required placeholder="0.00" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="salePrice">Preço de Venda *</Label>
                <Input id="salePrice" name="salePrice" step="0.01" type="number" required placeholder="0.00" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="categoryId">Categoria</Label>
              <select 
                id="categoryId" 
                name="categoryId" 
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Selecione...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id.toString()}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button type="submit" disabled={loading} className="bg-primary hover:bg-[#E67E00] text-white">
              {loading ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
