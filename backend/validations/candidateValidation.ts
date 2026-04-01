import { z } from 'zod';

export const candidateSchema = z.object({
  firstName: z.string().min(2, { message: "Le prénom doit avoir au moins 2 caractères" }),
  lastName: z.string().min(2, { message: "Le nom doit avoir au moins 2 caractères" }),
  email: z.string().email({ message: "Ceci n'est pas une adresse email valide" }),
});
