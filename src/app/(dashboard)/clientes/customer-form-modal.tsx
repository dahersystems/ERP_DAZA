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
import { createCustomer } from "@/actions/customers"
import { toast } from "sonner"

export function CustomerFormModal() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      document: formData.get("document") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      zipCode: formData.get("zipCode") as string,
      address: formData.get("address") as string,
    }

    const result = await createCustomer(data);

    if (result.success) {
      toast.success("Cliente criado com sucesso!");
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
        Novo Cliente
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Novo Cliente</DialogTitle>
          <DialogDescription>
            Adicione os dados do novo cliente para cadastrá-lo no ERP.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome Completo *</Label>
              <Input id="name" name="name" required placeholder="João da Silva" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="document">Documento (CPF/CNPJ) *</Label>
              <Input id="document" name="document" required placeholder="000.000.000-00" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="joao@email.com" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" name="phone" placeholder="(00) 00000-0000" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="zipCode">CEP</Label>
                <Input id="zipCode" name="zipCode" placeholder="00000-000" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Endereço</Label>
              <Input id="address" name="address" placeholder="Rua das Flores, 123" />
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
