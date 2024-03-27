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

export const parseValidationError = (
  obj: any
) => {
  // @ts-ignore
  return { errors: obj.error.flatten().fieldErrors };
};
