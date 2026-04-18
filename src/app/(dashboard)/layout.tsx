import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { Button } from "@/components/ui/button"
import { UserButton } from "@clerk/nextjs"
import { SpotlightSearch } from "@/components/layout/spotlight-search"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full flex flex-col min-h-screen bg-background">
        <header className="flex h-14 items-center gap-4 border-b border-border/40 bg-background/50 backdrop-blur-md px-6 lg:h-[60px] justify-between sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground transition-colors" />
            <div className="h-4 w-px bg-border/60 mx-1 hidden sm:block" />
            <span className="text-sm font-bold text-foreground tracking-tight hidden sm:flex">
              DAZA <span className="text-primary ml-1">ERP</span>
            </span>
          </div>
          <div className="flex items-center gap-4 flex-1 justify-center max-w-xl mx-auto">
            <SpotlightSearch />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-muted/30 rounded-full border border-border/40">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">Online</span>
            </div>
            <UserButton afterSignOutUrl="/sign-in" />
          </div>
        </header>
        <div className="flex-1 p-6 w-full">
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}
