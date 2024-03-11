const BASE_URL_API = 'https://mumble-api-prod-4cxdci3drq-oa.a.run.app';

export enum PAGE_ROUTES {
  HOME = '/',
  USER = '/user/:id',
  USER_LIKED = '/user/:id/liked',
  POSTS = '/post/:id',
}

export enum API_ROUTES {
  POSTS = '/posts',
  POSTS_ID = '/posts/:id',
  POSTS_ID_LIKES = '/posts/:id/likes',
  POSTS_ID_REPLIES = '/posts/:id/replies',
  POSTS_ID_MEDIA = '/posts/:id/media',
  USERS = '/users',
  USERS_ID = '/users/:id',
  USERS_ID_FOLLOWERS = '/users/:id/followers',
  USERS_ID_FOLLOWEES = '/users/:id/followees',
  USERS_AVATAR = '/users/avatar',
}

type Query =
  | Record<string, string | string[] | number | undefined>
  | undefined
  | null;
type Params = Record<string, string | null | undefined> | undefined | null;

/**
 * Service class for generating URLs for pages and APIs.
 */
export class RouteService {
  /**
   * Generates a URL for a page route.
   * @param route - The page route.
   * @param params - Optional parameters to be replaced in the route.
   * @param query - Optional query parameters to be appended to the URL.
   * @returns The generated URL.
   */
  public static page(
    route: PAGE_ROUTES,
    params?: Params,
    query?: Query
  ): string {
    return this._processUrl('', route, params, query);
  }
  /**
   * Generates a URL for an API route.
   * @param route - The API route.
   * @param params - Optional parameters to be replaced in the route.
   * @param query - Optional query parameters to be appended to the URL.
   * @returns The generated URL.
   */
  public static api(route: API_ROUTES, params?: Params, query?: Query): string {
    return this._processUrl(BASE_URL_API, route, params, query);
  }

  /**
   * Processes a URL by replacing placeholders in the route with actual values and appending query parameters.
   *
   * @param {string} baseUrl - The base URL to which the route should be appended.
   * @param {PAGE_ROUTES | API_ROUTES} route - The route to be processed, which may contain placeholders.
   * @param {TParams} params - An object containing values for the placeholders in the route.
   * @param {TQuery} query - An object containing query parameters to be appended to the URL.
   * @throws {TypeError} If the route does not start with '/'.
   * @returns {string} The processed URL with placeholders replaced by actual values and query parameters appended.
   */
  private static _processUrl(
    baseUrl: string,
    route: PAGE_ROUTES | API_ROUTES,
    params?: Params,
    query?: Query
  ): string {
    if (!route.startsWith('/')) {
      throw new TypeError(
        `Expect the first parameter to start with '/', you passed ${route}.`
      );
    }

    let formattedRoute: string = baseUrl + route;

    if (params) {
      Object.keys(params).forEach((key: string) => {
        if (formattedRoute.includes(`:${key}`)) {
          formattedRoute = formattedRoute.replace(
            `:${key}`,
            String(params[key])
          );
        }
      });
    }

    if (query) {
      const queryStr = this._objectToQuery(query);
      if (queryStr) formattedRoute += queryStr;
    }

    return formattedRoute;
  }

  /**
   * Converts an object to a query string.
   * @param obj - The object to be converted to a query string.
   * @returns The query string or null if the object is empty.
   */
  private static _objectToQuery(obj: Query): string | null {
    if (obj && Object.keys(obj).length > 0) {
      const query = Object.entries(obj).reduce(
        (previousValue, [key, value]) => {
          if (value === undefined || value === null) return previousValue;

          if (Array.isArray(value)) {
            const arrayParams = value.map(
              (item) => `${key}=${encodeURIComponent(String(item))}`
            );
            return previousValue
              ? `${previousValue}&${arrayParams.join('&')}`
              : `?${arrayParams.join('&')}`;
          }
          return previousValue
            ? `${previousValue}&${key}=${encodeURIComponent(String(value))}`
            : `?${key}=${encodeURIComponent(String(value))}`;
        },
        ''
      );
      return query || null;
    }

    return null;
  }
}
