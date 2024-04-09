import { SafeParseReturnType } from 'zod';

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

export type ValidationError = {
  errors: {
    [key: string]: string[]
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
  return { errors: obj.error.flatten().fieldErrors } as ValidationError;
};

export const hasError = (data?: ValidationError) => {
  return Object.keys(data?.errors ?? {}).length > 0;
}