import { ReactNode } from "react";
import { Package, ShieldCheck, Zap, BarChart3 } from "lucide-react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full lg:grid lg:grid-cols-2">
      {/* Lado Esquerdo - Branding (Impacto Visual) */}
      <div className="relative hidden flex-col bg-slate-900 p-12 text-white lg:flex overflow-hidden">
        {/* Camada de Gradiente e Textura */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-orange-600/20"
        />
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2v-4h4v-2H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Conteúdo do Branding */}
        <div className="relative z-20 flex items-center gap-2 text-2xl font-bold tracking-tighter">
          <div className="flex items-center justify-center bg-orange-500 w-10 h-10 rounded-xl shadow-lg shadow-orange-500/20">
            <Package className="h-6 w-6 text-white" />
          </div>
          <span>DAZA <span className="text-orange-500">ERP</span></span>
        </div>

        <div className="relative z-20 mt-auto max-w-lg">
          <h2 className="text-4xl font-bold leading-tight mb-8">
            Gerencie seu varejo com a precisão que ele merece.
          </h2>
          
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="mt-1 bg-slate-800 p-2 rounded-lg border border-slate-700">
                <Zap className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Alta Performance</h3>
                <p className="text-slate-400 text-sm">Vendas processadas em milissegundos com baixa automática.</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="mt-1 bg-slate-800 p-2 rounded-lg border border-slate-700">
                <ShieldCheck className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Segurança Avançada</h3>
                <p className="text-slate-400 text-sm">Seus dados protegidos com criptografia de ponta e autenticação Clerk.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="mt-1 bg-slate-800 p-2 rounded-lg border border-slate-700">
                <BarChart3 className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Visão em Tempo Real</h3>
                <p className="text-slate-400 text-sm">Dashboard inteligente com métricas de faturamento e estoque.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-20 mt-12 pt-8 border-t border-slate-800 text-slate-500 text-xs italic">
          Software de Gestão Profissional &copy; 2026 DAZA Systems.
        </div>
      </div>

      {/* Lado Direito - Formulário Profissional */}
      <div className="relative flex w-full flex-col bg-white dark:bg-slate-950">
        <div className="flex flex-1 items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-[420px] space-y-8">
            {/* Header Form (Visível especialmente em mobile) */}
            <div className="flex flex-col items-center space-y-2 text-center lg:items-start lg:text-left">
              <div className="lg:hidden flex mb-2 bg-orange-500 p-2 rounded-xl">
                <Package className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 italic lg:not-italic">
                Bem-vindo de volta
              </h1>
              <p className="text-slate-500 dark:text-slate-400">
                Insira suas credenciais para acessar o painel administrativo.
              </p>
            </div>

            {/* Container do Componente Clerk */}
            <div className="bg-white dark:bg-transparent rounded-2xl">
              {children}
            </div>

            {/* Footer Form */}
            <div className="pt-4 text-center text-xs text-slate-400 lg:text-left">
              Protegido por Clerk Security. Ao entrar você aceita nossos 
              <a href="#" className="underline hover:text-orange-500 px-1">Termos</a> 
              e 
              <a href="#" className="underline hover:text-orange-500 px-1">Privacidade</a>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
