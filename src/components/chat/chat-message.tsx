import type { Message } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ChatAvatar } from './chat-avatar';
import { MarkdownRenderer } from './markdown-renderer';
import { Card, CardContent } from '@/components/ui/card';

export function ChatMessage({ role, content, isTable }: Message) {
  const isAssistant = role === 'assistant';

  return (
    <div
      className={cn(
        'flex items-start gap-4',
        !isAssistant && 'flex-row-reverse'
      )}
    >
      <ChatAvatar role={role} />
      <div
        className={cn(
          'flex-1 space-y-2',
          !isAssistant ? 'text-right' : 'text-left'
        )}
      >
        {isAssistant ? (
          <Card className="bg-card">
            <CardContent className="p-4">
              <MarkdownRenderer content={content} isTable={isTable} />
            </CardContent>
          </Card>
        ) : (
          <div className="inline-block rounded-lg bg-primary text-primary-foreground px-4 py-2">
            <p className="text-base">{content}</p>
          </div>
        )}
      </div>
    </div>
  );
}
