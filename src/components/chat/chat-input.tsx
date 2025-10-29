'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SendHorizonal, LoaderCircle, Plus, Paperclip, X } from 'lucide-react';
import { FormEvent, useRef, useState, ChangeEvent, useTransition } from 'react';
import { Badge } from '../ui/badge';
import { useToast } from '@/hooks/use-toast';

interface ChatInputProps {
  onMessageSubmit: (message: string, file?: File) => void;
}

export function ChatInput({
  onMessageSubmit,
}: ChatInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [input, setInput] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 1024 * 1024) { // 1MB limit
        toast({
          title: "File too large",
          description: "Please select a file smaller than 1MB.",
          variant: "destructive",
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = input;
    if (!query.trim() && !file) return;

    startTransition(() => {
        onMessageSubmit(query, file ?? undefined);
    });

    setInput('');
    setFile(null);
    if(fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    formRef.current?.reset();
  }

  return (
    <div className="flex flex-col gap-2">
      {file && (
        <div className="flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-2">
                <Paperclip className="h-4 w-4" />
                <span>{file.name}</span>
                <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full" onClick={() => setFile(null)}>
                    <X className="h-3 w-3"/>
                </Button>
            </Badge>
        </div>
      )}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex items-center gap-2 rounded-lg border p-2 bg-card"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*,text/plain,.md,.json"
        />
        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={() => fileInputRef.current?.click()}
        >
          <Plus className="h-5 w-5" />
          <span className="sr-only">Add file</span>
        </Button>
        <Input
          name="query"
          placeholder={file ? "Ask about the document..." : "Ask anything..."}
          className="flex-1 border-0 shadow-none focus-visible:ring-0"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoComplete="off"
        />
        <Button type="submit" size="icon" disabled={isPending}>
            {isPending ? (
                <LoaderCircle className="h-5 w-5 animate-spin" />
            ) : (
                <SendHorizonal className="h-5 w-5" />
            )}
            <span className="sr-only">Send message</span>
        </Button>
      </form>
    </div>
  );
}
