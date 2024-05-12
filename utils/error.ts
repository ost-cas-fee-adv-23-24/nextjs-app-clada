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
    [key: string]: string[];
  };
};

export const parseValidationError = (obj: any) => {
  // @ts-ignore
  return { errors: obj.error.flatten().fieldErrors } as ValidationError;
};

export const isError = (data?: ValidationError) => {
  return Object.keys(data?.errors ?? {}).length > 0;
};
