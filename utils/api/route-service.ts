import { Config } from "@/config/env";

const BASE_URL_API = Config.apiUrl;

export enum PageRoutes {
  Home = '/',
  User = '/user/:id',
  LikedByUser = '/user/:id/liked',
  Posts = '/post/:id',
}

export enum ApiRoutes {
  Posts = '/posts',
  Post = '/posts/:id',
  PostLikes = '/posts/:id/likes',
  PostReplies = '/posts/:id/replies',
  PostMedia = '/posts/:id/media',
  Users = '/users',
  UserId = '/users/:id',
  UserFollowers = '/users/:id/followers',
  UserFollowees = '/users/:id/followees',
  UserAvatar = '/users/avatar',
}

type TQuery = Record<string, string | string[] | number | undefined> | undefined | null;
type TParams = Record<string, string | null | undefined> | undefined | null;


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
  public static page(route: PageRoutes, params?: TParams, query?: TQuery): string {
    return this._processUrl('', route, params, query);
  }
  /**
   * Generates a URL for an API route.
   * @param route - The API route.
   * @param params - Optional parameters to be replaced in the route.
   * @param query - Optional query parameters to be appended to the URL.
   * @returns The generated URL.
   */
  public static api(route: ApiRoutes, params?: TParams, query?: TQuery): string {
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
    baseUrl: string | undefined,
    route: PageRoutes | ApiRoutes,
    params?: TParams,
    query?: TQuery,
  ): string {
    if(!baseUrl) {
        throw new Error('Base URL not defined');
    }

    if (!route.startsWith('/')) {
      throw new TypeError(`Expect the first parameter to start with '/', you passed ${route}.`);
    }

    let formattedRoute: string = baseUrl + route;

    if (params) {
      Object.keys(params).forEach((key: string) => {
        if (formattedRoute.includes(`:${key}`)) {
          formattedRoute = formattedRoute.replace(`:${key}`, String(params[key]));
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
  private static _objectToQuery(obj: TQuery): string | null {
    if (obj && Object.keys(obj).length > 0) {
      const query = Object.entries(obj).reduce((previousValue, [key, value]) => {
        if (value === undefined || value === null) return previousValue;

        if (Array.isArray(value)) {
          const arrayParams = value.map((item) => `${key}=${encodeURIComponent(String(item))}`);
          return previousValue ? `${previousValue}&${arrayParams.join('&')}` : `?${arrayParams.join('&')}`;
        }
        return previousValue
          ? `${previousValue}&${key}=${encodeURIComponent(String(value))}`
          : `?${key}=${encodeURIComponent(String(value))}`;
      }, '');
      return query || null;
    }

    return null;
  }
}

// TODO: LIVE POSTS
export enum PostEvents {
  created = 'postCreated',
  updated = 'postUpdated',
  deleted = 'postDeleted',
  liked = 'postLiked',
  unliked = 'postUnliked',
}

export function getPostEventSource() {
  return new EventSource(`${BASE_URL_API}/posts/_sse`);
}