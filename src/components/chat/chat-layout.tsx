import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  Plus,
  MessageSquare,
  Search,
  Book,
  Briefcase,
  Settings,
  CircleUser,
} from 'lucide-react';
import { PostBotLogo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const chatHistory = [
    'Rebuild BCA project',
    'NIELIT job fair',
    'Python',
    'AI singularity career survival',
    'CDAC HPC Class',
    'Fix MySQL key error',
    'Employment exchange form...',
  ];

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/chat">
                <Plus />
              </Link>
            </Button>
            <h2 className="text-lg font-semibold tracking-tight">New Chat</h2>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Search />
                Search chats
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Book />
                Library
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Briefcase />
                Projects
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>

          <SidebarGroup>
            <SidebarGroupLabel>Chats</SidebarGroupLabel>
            <SidebarMenu>
              {chatHistory.map((chat) => (
                <SidebarMenuItem key={chat}>
                  <SidebarMenuButton size="sm">{chat}</SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Settings />
                Settings
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <CircleUser />
                Profile
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
                <PostBotLogo className="h-8 w-8" />
                <h1 className="text-xl font-bold font-headline tracking-tight">
                    PostBot
                </h1>
            </div>
            <SidebarTrigger className="md:hidden"/>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
