import { MSession, auth, signIn } from '@/app/api/auth/[...nextauth]/auth';

export class APIBase {
  public static fetch = async (input: RequestInfo, init?: RequestInit) => {
    const authHeader = await this.getAuthHeader();
    const res = await fetch(input, {
      headers: {
        ...init?.headers,
        ...authHeader,
      },
      ...init,
    });
    if (!res.ok) {
      if (res.status === 401) await signIn('zitadel');
      APIBase.handleError(res);
    }
    return res;
  };

  public static getAuthHeader = async (): Promise<HeadersInit> => {
    const session: MSession | null = await auth();
    if (!session) return {};
    return session ? { Authorization: `Bearer ${session.accessToken}` } : {};
  };

  /**
   * @description Handle API errors
   */
  public static handleError(response: Response) {
    console.error('API ERROR: ', {
      statusText: response.statusText,
      status: response.status,
      body: response.body,
      url: response.url,
    });
    throw new APIError(response.statusText, response.status);
  }
}

/**
 * @description Custom error class for API errors
 * @info All API errors should be thrown using this class
 */
export class APIError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message);
  }
}
