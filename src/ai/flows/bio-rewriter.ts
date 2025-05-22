// src/ai/flows/bio-rewriter.ts
'use server';

/**
 * @fileOverview Rewrites a biography or cover letter using AI to tailor the content with various writing tones or industry standards.
 *
 * - rewriteBio - A function that handles the biography rewriting process.
 * - RewriteBioInput - The input type for the rewriteBio function.
 * - RewriteBioOutput - The return type for the rewriteBio function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RewriteBioInputSchema = z.object({
  text: z.string().describe('The biography or cover letter text to rewrite.'),
  tone: z
    .string()
    .optional()
    .describe(
      'The desired tone for the rewritten text (e.g., professional, casual, formal).'
    ),
  industryStandards:
    z.string().optional().describe('The relevant industry standards to follow.'),
});

export type RewriteBioInput = z.infer<typeof RewriteBioInputSchema>;

const RewriteBioOutputSchema = z.object({
  rewrittenText: z.string().describe('The rewritten biography or cover letter text.'),
});

export type RewriteBioOutput = z.infer<typeof RewriteBioOutputSchema>;

export async function rewriteBio(input: RewriteBioInput): Promise<RewriteBioOutput> {
  return rewriteBioFlow(input);
}

const rewriteBioPrompt = ai.definePrompt({
  name: 'rewriteBioPrompt',
  input: {schema: RewriteBioInputSchema},
  output: {schema: RewriteBioOutputSchema},
  prompt: `Rewrite the following text to be more engaging and professional, tailoring it to the specified tone and industry standards.

Text: {{{text}}}

Tone: {{{tone}}}

Industry Standards: {{{industryStandards}}}

Rewritten Text:`, // Ensure the prompt ends with the expected output field.
});

const rewriteBioFlow = ai.defineFlow(
  {
    name: 'rewriteBioFlow',
    inputSchema: RewriteBioInputSchema,
    outputSchema: RewriteBioOutputSchema,
  },
  async input => {
    const {output} = await rewriteBioPrompt(input);
    return output!;
  }
);
