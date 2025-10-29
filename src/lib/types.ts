import type { ReactNode } from 'react';

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: ReactNode;
  isTable?: boolean;
};

export type FormState = {
  message: string;
  isTable?: boolean;
  error?: string;
} | null;
