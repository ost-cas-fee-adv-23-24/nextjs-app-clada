import { z } from 'zod';

// max file size 5mb
const maxFileSize = 5242880;

export const schema = z.object({
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

export const validate = (formData: FormData) => {
  const media = formData.get('media');
  if (media instanceof File && media.size === 0) {
    formData.delete('media');
  }
  const formValues = Object.fromEntries(formData.entries());
  return schema.safeParse(formValues);
};
