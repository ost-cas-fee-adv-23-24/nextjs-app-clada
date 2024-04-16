import { z } from 'zod';

const maxFileSize = 5242880;

export const schemaMumble = z.object({
  text: z
    .string({
      required_error: 'Text darf nicht leer sein.',
    })
    .min(1, { message: 'Text darf nicht leer sein.' }),
  media: z
    .instanceof(File)
    .refine((file) => file.size < maxFileSize, {
      message: 'Bild ist zu gross. (max: 5mb)',
    })
    .optional(),
});

export const schemaUserAvatar = z.object({
  media: z
    .instanceof(File)
    .refine((file) => file.size < maxFileSize, {
      message: 'Bild ist zu gross. (max: 5mb)',
    })
    .optional()
})

export const schemaUser = z.object({
  firstname: z
    .string({
      required_error: 'Vorname wird benötigt',
    })
    .min(1, { message: 'Vorname wird benötigt' }),
  lastname: z
    .string({
      required_error: 'Name wird benötigt',
    })
    .min(1, { message: 'Name wird benötigt' }),
  username: z
    .string({
      required_error: 'Benutzername wird benötigt',
    })
    .min(1, { message: 'Benutzername wird benötigt' }),
});
