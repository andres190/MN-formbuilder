import { z } from 'zod';

export const blockTypeSchema = z.enum(['TEXT', 'CHOICE', 'CALCULATION']);

export const calculationExpressionSchema = z
  .string()
  .min(1)
  .regex(/^[0-9+\-*/().{}\s_a-zA-Z]+$/, 'Sólo se permiten operadores básicos y variables entre llaves.');

export const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  blocks: z
    .array(
      z.object({
        id: z.string().min(1),
        type: blockTypeSchema,
        label: z.string().optional(),
        config: z.record(z.any()).optional()
      })
    )
    .min(1)
});

export type FormInput = z.input<typeof formSchema>;
export type Form = z.output<typeof formSchema>;
