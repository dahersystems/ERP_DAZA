import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { UserButton } from "@clerk/nextjs"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full flex flex-col min-h-screen bg-background">
        <header className="flex h-14 items-center gap-4 border-b bg-background px-6 lg:h-[60px] justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="text-lg font-semibold text-foreground hidden sm:flex">ERP Genérico</h1>
          </div>
          <div className="flex items-center gap-4">
            <UserButton />
          </div>
        </header>
        <div className="flex-1 p-6 w-full">
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}
