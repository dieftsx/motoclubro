'use server';
/**
 * @fileOverview An AI agent that identifies motorcycles from images.
 *
 * - identifyMotorcycle - A function that handles the motorcycle identification process.
 * - IdentifyMotorcycleInput - The input type for the identifyMotorcycle function.
 * - IdentifyMotorcycleOutput - The return type for the identifyMotorcycle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdentifyMotorcycleInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a motorcycle, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type IdentifyMotorcycleInput = z.infer<typeof IdentifyMotorcycleInputSchema>;

const IdentifyMotorcycleOutputSchema = z.object({
  make: z.string().describe("The make (brand) of the motorcycle, e.g., 'Harley-Davidson'."),
  model: z.string().describe("The model of the motorcycle, e.g., 'Sportster Iron 883'."),
  year: z.string().describe("The manufacturing year of the motorcycle, e.g., '2021'."),
});
export type IdentifyMotorcycleOutput = z.infer<typeof IdentifyMotorcycleOutputSchema>;

export async function identifyMotorcycle(input: IdentifyMotorcycleInput): Promise<IdentifyMotorcycleOutput> {
  return identifyMotorcycleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'identifyMotorcyclePrompt',
  input: {schema: IdentifyMotorcycleInputSchema},
  output: {schema: IdentifyMotorcycleOutputSchema},
  prompt: `You are an expert in motorcycle identification. Analyze the provided image and identify the motorcycle's make, model, and year.

  Photo: {{media url=photoDataUri}}
  
  Provide only the requested information in the specified format. If you cannot determine a piece of information, respond with "Unknown".`,
});

const identifyMotorcycleFlow = ai.defineFlow(
  {
    name: 'identifyMotorcycleFlow',
    inputSchema: IdentifyMotorcycleInputSchema,
    outputSchema: IdentifyMotorcycleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
