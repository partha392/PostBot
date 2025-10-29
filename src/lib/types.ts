export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isTable?: boolean;
};

export type FormState = {
  message: string;
  isTable?: boolean;
  error?: string;
} | null;
