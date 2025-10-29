import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot, User } from 'lucide-react';

interface ChatAvatarProps {
  role: 'user' | 'assistant';
}

export function ChatAvatar({ role }: ChatAvatarProps) {
  if (role === 'user') {
    return (
      <Avatar>
        <AvatarFallback className="bg-primary/10 text-primary">
          <User className="h-5 w-5" />
        </AvatarFallback>
      </Avatar>
    );
  }
  return (
    <Avatar>
      <AvatarFallback className="bg-accent text-accent-foreground">
        <Bot className="h-5 w-5" />
      </AvatarFallback>
    </Avatar>
  );
}
