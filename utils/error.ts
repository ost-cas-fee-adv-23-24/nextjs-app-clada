import { SafeParseReturnType, z } from 'zod';

export class APIError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message);
  }
}

export class InternalServerError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export const parseValidationError = (
  obj: SafeParseReturnType<
    {
      text: string;
      media?: File | undefined;
    },
    {
      text: string;
      media?: File | undefined;
    }
  >
) => {
  // @ts-ignore
  return { errors: obj.error.flatten().fieldErrors };
};
