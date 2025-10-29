'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SendHorizonal, LoaderCircle, Plus, Paperclip, X } from 'lucide-react';
import { FormEvent, useRef, useState, ChangeEvent } from 'react';
import { Badge } from '../ui/badge';
import { useToast } from '@/hooks/use-toast';

interface ChatInputProps {
  onMessageSubmit: (message: string, file?: File) => void;
  formAction: (formData: FormData) => void;
  input: string;
  setInput: (value: string) => void;
  file: File | null;
  setFile: (file: File | null) => void;
}

export function ChatInput({
  onMessageSubmit,
  formAction,
  input,
  setInput,
  file,
  setFile,
}: ChatInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('query') as string;

    if (!query.trim() && !file) return;

    onMessageSubmit(query, file ?? undefined);

    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (loadEvent) => {
          formData.append('docContent', loadEvent.target?.result as string);
          formAction(formData);
        };
        reader.readAsDataURL(file);
      } else {
        const reader = new FileReader();
        reader.onload = (loadEvent) => {
          formData.append('docContent', loadEvent.target?.result as string);
          formAction(formData);
        };
        reader.readAsText(file);
      }
    } else {
      formAction(formData);
    }

    setInput('');
    setFile(null);
    if(fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

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
        <SubmitButton />
      </form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="icon" disabled={pending}>
      {pending ? (
        <LoaderCircle className="h-5 w-5 animate-spin" />
      ) : (
        <SendHorizonal className="h-5 w-5" />
      )}
      <span className="sr-only">Send message</span>
    </Button>
  );
}
