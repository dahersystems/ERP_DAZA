import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Store, Shield, ReceiptText, Users } from "lucide-react"

export default function ConfiguracoesPage() {
  return (
    <div className="flex flex-col gap-6 max-w-[1400px] mx-auto w-full">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Configurações</h2>
        <p className="text-muted-foreground mt-1">Gerencie os dados da sua empresa, perfis de usuário e preferências de emissão.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_3fr] mt-2">
        <div className="flex flex-col gap-2">
          {/* Menu Lateral de Configurações */}
          <Button variant="ghost" className="justify-start font-semibold text-primary bg-primary/10">
            <Store className="w-4 h-4 mr-2" /> Minha Loja
          </Button>
          <Button variant="ghost" className="justify-start font-medium text-muted-foreground hover:text-foreground">
            <Users className="w-4 h-4 mr-2" /> Equipe e Perfis
          </Button>
          <Button variant="ghost" className="justify-start font-medium text-muted-foreground hover:text-foreground">
            <Shield className="w-4 h-4 mr-2" /> Permissões
          </Button>
          <Button variant="ghost" className="justify-start font-medium text-muted-foreground hover:text-foreground">
            <ReceiptText className="w-4 h-4 mr-2" /> Fiscal e NFe
          </Button>
        </div>

        <Card className="border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Dados da Empresa</CardTitle>
            <CardDescription>
              As informações abaixo serão usadas em recibos, e-mails e emissão de notas.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="razao" className="text-foreground">Razão Social</Label>
                <Input id="razao" defaultValue="Varejo ERP Genérico LTDA" className="border-input/70 focus-visible:ring-secondary shadow-sm" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cnpj" className="text-foreground">CNPJ</Label>
                <Input id="cnpj" defaultValue="12.345.678/0001-90" className="border-input/70 focus-visible:ring-secondary shadow-sm" />
              </div>
            </div>
            <Separator className="bg-border/50" />
            <div className="space-y-2">
              <Label htmlFor="address" className="text-foreground">Endereço Principal</Label>
              <Input id="address" defaultValue="Avenida Paulista, 1000 - São Paulo, SP" className="border-input/70 focus-visible:ring-secondary shadow-sm" />
            </div>
            <div className="flex justify-end pt-4">
              <Button className="bg-primary hover:bg-[#E67E00] text-primary-foreground px-8 shadow-sm">
                Salvar Alterações
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
