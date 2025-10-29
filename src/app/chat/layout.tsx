import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { PostBotLogo } from '@/components/icons';

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      {/* The Sidebar component has been removed */}
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <PostBotLogo className="h-8 w-8" />
            <h1 className="text-xl font-bold font-headline tracking-tight">
              PostBot
            </h1>
          </div>
          <SidebarTrigger className="md:hidden" />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
