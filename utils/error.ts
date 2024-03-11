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

export const parseValidationError = (obj: z.SafeParseReturnType<{
  text: string;
  media?: File | undefined;
}, {
  text: string;
  media?: File | undefined;
}>) => {
  return { errors: obj.error.flatten().fieldErrors }
}
