"use client";

import { Home, Users, Package, ShoppingCart, BarChart3, Settings, Store, TrendingUp } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AppSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { title: "Dashboard", url: "/", icon: Home },
    { title: "Clientes", url: "/clientes", icon: Users },
    { title: "Produtos", url: "/produtos", icon: Package },
    { title: "Vendas", url: "/vendas", icon: ShoppingCart },
    { title: "Financeiro", url: "/financeiro", icon: TrendingUp },
    { title: "Relatórios", url: "/relatorios", icon: BarChart3 },
    { title: "Configurações", url: "/configuracoes", icon: Settings },
  ];

  return (
    <Sidebar variant="inset" className="bg-sidebar text-sidebar-foreground border-r border-border/10">
      <SidebarHeader className="border-b border-white/5 px-4 py-6 mb-2">
        <div className="flex items-center gap-3 font-bold text-xl tracking-tighter px-2 text-white">
          <div className="bg-primary p-1.5 rounded-md flex items-center justify-center">
            <Store className="size-5 text-white" />
          </div>
          <span>DAZA<span className="text-primary">ERP</span></span>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-1">
              {menuItems.map((item) => {
                const isActive = item.url === '/' 
                  ? pathname === '/' 
                  : pathname.startsWith(item.url);
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <Link 
                      href={item.url} 
                      className={`flex flex-row items-center gap-3 px-4 py-3 w-full rounded-lg transition-all duration-200 ${
                        isActive 
                          ? "bg-primary text-white font-semibold" 
                          : "text-white/60 hover:bg-white/5 hover:text-white font-medium"
                      }`}
                    >
                      <item.icon className={`size-5 shrink-0 ${isActive ? "text-white" : "text-primary/70"}`} />
                      <span className="text-sm">{item.title}</span>
                    </Link>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
