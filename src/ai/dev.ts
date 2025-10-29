import { config } from 'dotenv';
config();

import '@/ai/flows/generate-comparison-table.ts';
import '@/ai/flows/classify-user-query.ts';
import '@/ai/flows/generate-structured-response.ts';
import '@/ai/flows/summarize-document.ts';
