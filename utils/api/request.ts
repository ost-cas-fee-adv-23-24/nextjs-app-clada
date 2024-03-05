import { MSession, auth } from '@/app/api/auth/[...nextauth]/auth';
import { Config } from '@/config/env';
import { URL } from 'url';
import { APIError, InternalServerError } from '../error';
import { signIn } from 'next-auth/react';

type SearchParams = Record<string, string | number | boolean>[];

const getAuthHeader = async () => {
  const session: MSession | null = await auth();

  if (!session) {
    return null;
  }
  
  return session
    ? ({ Authorization: `Bearer ${session.accessToken}` } as HeadersInit)
    : null;
};

const handleRequestError = (response: Response) => {
  console.error('API ERROR: ', {
    statusText: response.statusText,
    status: response.status,
    body: response.body,
    url: response.url,
  });

  throw new APIError(response.statusText, response.status);
};

const processSlug = (slug: string, queryParams?: SearchParams) => {
  if (!Config.apiUrl) {
    throw new InternalServerError(
      'Base URL is not defined. Please check your local environment'
    );
  }

  const url = new URL(Config.apiUrl);
  url.pathname = slug;

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      url.searchParams.append(key, value.toString());
    }
  }

  return url;
};

/**
 *
 * @param slug The slug of the api endpoint. ex.: /users
 * @param init
 * @param queryParams
 * @returns Returns the api response in the specified type
 */
export const httpRequest = async <T>(
  slug: string,
  init?: RequestInit,
  queryParams?: SearchParams
) => {
  const authHeader = await getAuthHeader();
  const processedUrl = processSlug(slug, queryParams).toString();

  const res = await fetch(processedUrl.toString(), {
    headers: {
      ...init?.headers,
      ...authHeader,
    },
    ...init,
  });

  if (!res.ok) {
    if (res.status === 401) {
      await signIn('zitadel');
    }
    handleRequestError(res);
  }

  return res.json() as T;
};
