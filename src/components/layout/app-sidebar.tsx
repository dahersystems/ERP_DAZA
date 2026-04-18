"use client";

import { Home, Users, Package, ShoppingCart, BarChart3, Settings, Store } from "lucide-react";
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
    { title: "Relatórios", url: "/relatorios", icon: BarChart3 },
    { title: "Configurações", url: "/configuracoes", icon: Settings },
  ];

  return (
    <Sidebar variant="inset" className="bg-secondary text-secondary-foreground border-r border-[#005bb5]">
      <SidebarHeader className="border-b border-white/10 px-4 py-5 mb-2">
        <div className="flex items-center gap-3 font-extrabold text-xl tracking-tight px-2 text-white">
          <div className="bg-primary p-1.5 rounded-lg flex items-center justify-center shadow-sm">
            <Store className="size-5 text-white" />
          </div>
          <span>ERP VAREJO</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-1.5">
              {menuItems.map((item) => {
                const isActive = item.url === '/' 
                  ? pathname === '/' 
                  : pathname.startsWith(item.url);
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <Link 
                      href={item.url} 
                      className={`flex flex-row items-center gap-3 px-4 py-3.5 w-full rounded-xl transition-all duration-200 mt-1 ${
                        isActive 
                          ? "bg-primary text-white hover:bg-[#E67E00] font-semibold shadow-md" 
                          : "text-white/80 hover:bg-white/15 hover:text-white font-medium"
                      }`}
                    >
                      <item.icon className="size-5 shrink-0" />
                      <span className="text-[15px]">{item.title}</span>
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
