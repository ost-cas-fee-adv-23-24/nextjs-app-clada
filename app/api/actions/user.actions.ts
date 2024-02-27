'use server'
import { APIBase } from "@/utils/api/base";
import { ApiRoutes, RouteService } from "@/utils/api/route-service";
import { PublicUser } from "@/utils/models";

/**
 * @description Get users
 * @info GET-method
 */
export const GetUsers = async () => {
    const res = await APIBase.fetch(RouteService.api(ApiRoutes.Users), {
      method: 'GET',
    });
    return (await res.json()) as PublicUser;
};

/**
 * @description Get user by id
 * @info GET-method
 */
export const GetUserById = async (payload: { id: string }) => {
    const res = await APIBase.fetch(RouteService.api(ApiRoutes.UserId, { id: payload.id }), {
      method: 'GET',
    });
    return (await res.json()) as PublicUser;
};