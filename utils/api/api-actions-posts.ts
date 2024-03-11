import { API_ROUTES, RouteService } from '../route-service';
import { APIServiceBase } from './api-service-base';

export const GET_POSTS = async () => {
  const res = await APIServiceBase._fetch(
    RouteService.api(API_ROUTES.POSTS, null)
  );

  console.log(res);
  return (await res.json()).data as Array<TPost | TReply>;
};
