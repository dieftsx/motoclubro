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
      "Uma foto de uma motocicleta, como um URI de dados que deve incluir um tipo MIME e usar codificação Base64. Formato esperado: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type IdentifyMotorcycleInput = z.infer<typeof IdentifyMotorcycleInputSchema>;

const IdentifyMotorcycleOutputSchema = z.object({
  make: z.string().describe("A marca da motocicleta, ex: 'Harley-Davidson'."),
  model: z.string().describe("O modelo da motocicleta, ex: 'Sportster Iron 883'."),
  year: z.string().describe("O ano de fabricação da motocicleta, ex: '2021'."),
});
export type IdentifyMotorcycleOutput = z.infer<typeof IdentifyMotorcycleOutputSchema>;

export async function identifyMotorcycle(input: IdentifyMotorcycleInput): Promise<IdentifyMotorcycleOutput> {
  return identifyMotorcycleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'identifyMotorcyclePrompt',
  input: {schema: IdentifyMotorcycleInputSchema},
  output: {schema: IdentifyMotorcycleOutputSchema},
  prompt: `Você é um especialista em identificação de motocicletas. Analise a imagem fornecida e identifique a marca, modelo e ano da motocicleta.

  Foto: {{media url=photoDataUri}}
  
  Forneça apenas as informações solicitadas no formato especificado. Se não conseguir determinar uma informação, responda com "Desconhecido".`,
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
