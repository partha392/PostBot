import { ChatInterface } from '@/components/chat/chat-interface';
import { ChatBackgroundPattern } from '@/components/chat/chat-background-pattern';

export default function ChatPage() {
  return (
    <div className="relative h-full">
      <ChatBackgroundPattern className="absolute inset-0 w-full h-full text-gray-200/50" />
      <div className="relative h-full">
        <ChatInterface />
      </div>
    </div>
  );
}
