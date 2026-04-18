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
import { Plus, Trash, ShoppingCart } from "lucide-react"
import { useState, useMemo } from "react"
import { createOrder } from "@/actions/orders"
import { toast } from "sonner"

export function PDVFormModal({ customers, products }: { customers: any[]; products: any[] }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const [customerId, setCustomerId] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("PIX")
  
  const [selectedProductId, setSelectedProductId] = useState("")
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  
  const [cart, setCart] = useState<{product: any; quantity: number}[]>([])

  const totalAmount = useMemo(() => {
    return cart.reduce((acc, item) => acc + (Number(item.product.salePrice) * item.quantity), 0)
  }, [cart])

  const addToCart = () => {
    if (!selectedProductId || selectedQuantity <= 0) return;
    
    const product = products.find(p => p.id.toString() === selectedProductId);
    if (!product) return;

    setCart(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + selectedQuantity }
            : item
        );
      }
      return [...prev, { product, quantity: selectedQuantity }];
    });
    
    setSelectedProductId("");
    setSelectedQuantity(1);
  }

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.product.id !== productId))
  }

  async function handleCheckout() {
    if (!customerId) return toast.error("Selecione um cliente.")
    if (cart.length === 0) return toast.error("Adicione produtos ao carrinho.")

    setLoading(true);

    const orderData = {
      customerId: parseInt(customerId),
      paymentMethod,
      totalAmount: totalAmount.toString(),
      items: cart.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
        unitPrice: item.product.salePrice.toString(),
        subtotal: (Number(item.product.salePrice) * item.quantity).toString(),
      }))
    }

    const result = await createOrder(orderData);

    if (result.success) {
      toast.success("Venda registrada com sucesso!");
      setOpen(false);
      setCart([]);
      setCustomerId("");
    } else {
      toast.error(result.error);
    }

    setLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button className="bg-primary hover:bg-[#E67E00] text-primary-foreground h-11 px-6 shadow-sm" />}>
        <Plus className="w-4 h-4 mr-2" />
        Nova Venda (PDV)
      </DialogTrigger>
      <DialogContent className="sm:max-w-[95vw] md:max-w-[1200px] h-[95vh] max-h-[95vh] flex flex-col overflow-hidden">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2 text-2xl font-bold">
            <ShoppingCart className="w-5 h-5 text-primary" />
            Nova Venda (PDV)
          </DialogTitle>
          <DialogDescription>
            Selecione o cliente, adicione produtos ao carrinho e feche o pedido.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4 flex-1 overflow-y-auto pr-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="customerId">Cliente *</Label>
              <select 
                id="customerId" 
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="">Selecione um cliente...</option>
                {customers.map((c) => (
                  <option key={c.id} value={c.id.toString()}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="paymentMethod">Método de Pagamento *</Label>
              <select 
                id="paymentMethod" 
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="PIX">PIX</option>
                <option value="CARTAO_CREDITO">Cartão de Crédito</option>
                <option value="CARTAO_DEBITO">Cartão de Débito</option>
                <option value="DINHEIRO">Dinheiro</option>
              </select>
            </div>
          </div>

          <div className="border border-border/60 rounded-xl p-4 bg-muted/10 space-y-4">
            <h4 className="font-semibold text-secondary">Adicionar Produtos</h4>
            <div className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="grid gap-2 flex-1">
                <Label>Produto</Label>
                <select 
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <option value="">Buscar Produto...</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id.toString()}>{p.name} - R$ {p.salePrice}</option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2 w-full sm:w-24">
                <Label>Qtd</Label>
                <Input type="number" min="1" value={selectedQuantity} onChange={e => setSelectedQuantity(parseInt(e.target.value))} />
              </div>
              <Button type="button" onClick={addToCart} className="bg-secondary text-white hover:bg-secondary/90 w-full sm:w-auto">
                Inserir
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-secondary">Carrinho ({cart.length} itens)</h4>
            {cart.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">Carrinho vazio</p>
            ) : (
              <div className="border border-border/60 rounded-xl divide-y divide-border/60">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 hover:bg-muted/30">
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-muted-foreground">{item.quantity}x R$ {item.product.salePrice}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-semibold">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(item.product.salePrice) * item.quantity)}
                      </p>
                      <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.product.id)} className="text-destructive hover:bg-red-50 hover:text-destructive">
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex justify-between items-center bg-muted/30 p-4 rounded-xl border border-border/60">
              <span className="text-lg font-medium text-secondary">Total da Venda</span>
              <span className="text-2xl font-bold text-primary">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalAmount)}
              </span>
            </div>
          </div>

        </div>
        <DialogFooter className="flex-shrink-0 pt-4 mt-auto">
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button type="button" onClick={handleCheckout} disabled={loading || cart.length === 0 || !customerId} className="bg-primary hover:bg-[#E67E00] text-white px-8">
            {loading ? "Processando..." : "Finalizar Venda"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
