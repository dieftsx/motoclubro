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
  topic: z.string().describe('The topic of the blog post.'),
  keywords: z.string().describe('Relevant keywords for the blog post, separated by commas.'),
});
export type GenerateBlogPostTitleAndDescriptionInput = z.infer<typeof GenerateBlogPostTitleAndDescriptionInputSchema>;

const GenerateBlogPostTitleAndDescriptionOutputSchema = z.object({
  title: z.string().describe('An engaging title for the blog post.'),
  description: z.string().describe('A compelling description for the blog post.'),
});
export type GenerateBlogPostTitleAndDescriptionOutput = z.infer<typeof GenerateBlogPostTitleAndDescriptionOutputSchema>;

export async function generateBlogPostTitleAndDescription(input: GenerateBlogPostTitleAndDescriptionInput): Promise<GenerateBlogPostTitleAndDescriptionOutput> {
  return generateBlogPostTitleAndDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBlogPostTitleAndDescriptionPrompt',
  input: {schema: GenerateBlogPostTitleAndDescriptionInputSchema},
  output: {schema: GenerateBlogPostTitleAndDescriptionOutputSchema},
  prompt: `You are a blog post title and description generator for a motorcycle club. Generate a title and description for a blog post based on the given topic and keywords.

Topic: {{{topic}}}
Keywords: {{{keywords}}}

Title:
Description: `,
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
