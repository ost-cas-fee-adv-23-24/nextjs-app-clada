/**
 * @description Base class for API services
 * @info All API calls should be made through this class
 */
export class APIServiceBase {
  /**
   * @description Re-usable fetch method with auth header
   */
  public static _fetch = async (input: RequestInfo, init?: RequestInit) => {
    // TODO: remove delay before go live !
    // delay for testing loading states
    await new Promise((resolve) => setTimeout(resolve, 600));

    const res = await fetch(input, {
      headers: {
        ...init?.headers,
      },
      ...init,
    });
    if (!res.ok) {
      APIServiceBase._handleError(res);
    }
    return res;
  };

  /**
   * @description Handle API errors
   */
  public static _handleError(response: Response) {
    console.error('🔴 API ERROR: ', {
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
