import { httpRequest } from "@/utils/api/request"
import { validate } from "@/utils/api/validation"
import { parseValidationError } from "@/utils/error"
import { Post, PostPaginatedResult, ReplyPaginatedResult } from "@/utils/models"

type GetPostsParams = {
    newerThan?: string,
    olderThan?: string,
    text?: string,
    tags?: string[],
    creators?: string[],
    likedBy?: string[],
    offset?: number,
    limit?: number
}

export const GetPosts = async (queryParams?: GetPostsParams
) => {
    const response = await httpRequest<PostPaginatedResult>('/posts', {
        method: 'GET'
    }, queryParams)

    return response;
}

export const GetPostById = async (id: string) => {
    const response = await httpRequest<Post>(`/posts/${id}`, {
        method: 'GET'
    })

    return response;
}

export const GetPostReplies = async (id: string) => {
    const response = await httpRequest<ReplyPaginatedResult>(`/posts/${id}/replies`, {
        method: 'GET'
    })

    return response;
}

export const CreatePost = async (data: FormData) => {
    const validation = validate(data);

    if (!validation.success) {
        return Promise.reject(parseValidationError(validation));
    }

    await httpRequest<void>('/posts', {
        method: 'POST',
        body: data
    })
}

export const UpdatePost = async (id: string, data: FormData) => {
    const validation = validate(data)

    if (!validation.success) {
        return Promise.reject(parseValidationError(validation));
    }

    await httpRequest<void>(`/posts/${id}`, {
        method: 'PUT',
        body: data
    })
}

export const UpdateMedia = async (id: string, data: FormData) => {
    const validation = validate(data);

    if (!validation.success) {
        return Promise.reject(validation.error.flatten().fieldErrors)
    }

    await httpRequest(`/posts/${id}/media`, {
        method: 'PUT',
        body: data
    })
}

export const DeletePost = async (id: string) => {
    await httpRequest<void>(`/posts/${id}`, {
        method: 'DELETE'
    })
}

export const CreateReply = async (id: string, data: FormData) => {
    const validation = validate(data);

    if (!validation.success) {
        return Promise.reject(parseValidationError(validation))
    }

    await httpRequest<void>(`/posts/${id}/replies`, {
        method: 'POST',
        body: data
    })
}

export const UpdateLike = async (id: string, isAlreadyLikedByUser: boolean = false) => {
    await httpRequest(`/posts/${id}/likes`, {
        method: !isAlreadyLikedByUser ? 'PUT' : 'DELETE'
    })
} 