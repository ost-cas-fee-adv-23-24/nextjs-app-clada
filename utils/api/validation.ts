import { UpdateUserData } from '../models';
import { schemaUser } from './validation.schema';

export const validate = (formData: FormData) => {
  const media = formData.get('media');
  if (media instanceof File && media.size === 0) {
    formData.delete('media');
  }
  const formValues = Object.fromEntries(formData.entries());
  return schemaUser.safeParse(formValues);
};

export const validateUser = (data: UpdateUserData) => {
  const formValues = Object.fromEntries(data.entries());
  return schemaUser.safeParse(formValues);
};
