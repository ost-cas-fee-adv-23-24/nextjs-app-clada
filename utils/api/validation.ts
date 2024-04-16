import { UpdateUserData } from '../models';
import { schemaMumble, schemaUser, schemaUserAvatar } from './validation.schema';

export const validate = (formData: FormData) => {
  const media = formData.get('media');
  if (media instanceof File && media.size === 0) {
    formData.delete('media');
  }
  const formValues = Object.fromEntries(formData.entries());
  return schemaMumble.safeParse(formValues);
};

export const validateUser = (data: UpdateUserData) => {
  const formValues = Object.fromEntries(data.entries());
  return schemaUser.safeParse(formValues);
};

export const validateUserAvatar = (data: FormData) => {
  const media = data.get('media');
  if (media instanceof File && media.size === 0) {
    data.delete('media');
  }
  const formValues = Object.fromEntries(data.entries());
  return schemaUserAvatar.safeParse(formValues);
}
