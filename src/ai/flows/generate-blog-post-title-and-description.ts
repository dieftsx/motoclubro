'use server';
/**
 * @fileOverview An AI agent that generates blog post titles and descriptions.
 *
 * - generateBlogPostTitleAndDescription - A function that handles the blog post title and description generation process.
 * - GenerateBlogPostTitleAndDescriptionInput - The input type for the generateBlogPostTitleAndDescription function.
 * - GenerateBlogPostTitleAndDescriptionOutput - The return type for the generateBlogPostTitleAndDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBlogPostTitleAndDescriptionInputSchema = z.object({
  topic: z.string().describe('O tópico da postagem do blog.'),
  keywords: z.string().describe('Palavras-chave relevantes para a postagem do blog, separadas por vírgulas.'),
});
export type GenerateBlogPostTitleAndDescriptionInput = z.infer<typeof GenerateBlogPostTitleAndDescriptionInputSchema>;

const GenerateBlogPostTitleAndDescriptionOutputSchema = z.object({
  title: z.string().describe('Um título envolvente para a postagem do blog.'),
  description: z.string().describe('Uma descrição atraente para a postagem do blog.'),
});
export type GenerateBlogPostTitleAndDescriptionOutput = z.infer<typeof GenerateBlogPostTitleAndDescriptionOutputSchema>;

export async function generateBlogPostTitleAndDescription(input: GenerateBlogPostTitleAndDescriptionInput): Promise<GenerateBlogPostTitleAndDescriptionOutput> {
  return generateBlogPostTitleAndDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBlogPostTitleAndDescriptionPrompt',
  input: {schema: GenerateBlogPostTitleAndDescriptionInputSchema},
  output: {schema: GenerateBlogPostTitleAndDescriptionOutputSchema},
  prompt: `Você é um gerador de títulos e descrições de postagens de blog para um clube de motociclistas. Gere um título e uma descrição para uma postagem de blog com base no tópico e nas palavras-chave fornecidas.

Tópico: {{{topic}}}
Palavras-chave: {{{keywords}}}

Título:
Descrição: `,
});

const generateBlogPostTitleAndDescriptionFlow = ai.defineFlow(
  {
    name: 'generateBlogPostTitleAndDescriptionFlow',
    inputSchema: GenerateBlogPostTitleAndDescriptionInputSchema,
    outputSchema: GenerateBlogPostTitleAndDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
