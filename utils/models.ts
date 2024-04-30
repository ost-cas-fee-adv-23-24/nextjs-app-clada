/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface DeletedPost {
  /**
   * ULID
   * Universally Unique Lexicographically Sortable Identifier (e.g. 01GEESHPQQ4NJKNZJN9AKWQW6G)
   * @format ULID
   */
  id?: string;
}

export interface LikeInfo {
  /**
   * ULID
   * Universally Unique Lexicographically Sortable Identifier (e.g. 01GEESHPQQ4NJKNZJN9AKWQW6G)
   * @format ULID
   */
  postId?: string;
  /**
   * The userid of the user that liked the post.
   * @example "179944860378202369"
   */
  userId?: string | undefined;
}

/**
 * Post in Mumble. This is user generated content.
 * Posts can be deleted by the user who created them.
 */
export interface Post {
  /**
   * ULID
   * ID of the post, defined in the ULID format.
   * @format ulid
   * @example "01GDMMR85BEHP8AKV8ZGGM259K"
   */
  id: string;
  /**
   * Public user information. This information is publicly available to everyone.
   * It contains basic information such as the ID.
   */
  creator: PublicUser;
  /**
   * Text for the post. Can be undefined if the post is only a media post.
   * Can contain hashtags and mentions.
   * @example "Hello World! #newpost."
   */
  text?: string | undefined;
  /**
   * URL - if any - to the media object attached to this post.
   * @example "https://storage.googleapis.com/cas-fee-adv-mumble-api/1094b5e0-5f30-4f0b-a342-ae12936c42ff"
   */
  mediaUrl?: string | undefined;
  /**
   * If mediaUrl is set, this field contains the mime type of the media object.
   * @example "image/png"
   */
  mediaType?: string | undefined;
  /**
   * Number of total likes on this post.
   * @format int32
   * @example 42
   */
  likes?: number;
  /**
   * Indicates if the current user liked this post. If the call was made unauthorized,
   * this field is "undefined" or absent. Otherwise `true` indicates that the authorized user
   * liked this post.
   */
  likedBySelf?: boolean | undefined;
  /**
   * Number of total replies for this post.
   * @format int32
   * @example 42
   */
  replies?: number;
}

export interface PostBase {
  /**
   * ULID
   * ID of the post, defined in the ULID format.
   * @format ulid
   * @example "01GDMMR85BEHP8AKV8ZGGM259K"
   */
  id?: string;
  /**
   * Public user information. This information is publicly available to everyone.
   * It contains basic information such as the ID.
   */
  creator?: PublicUser;
  /**
   * Text for the post. Can be undefined if the post is only a media post.
   * Can contain hashtags and mentions.
   * @example "Hello World! #newpost."
   */
  text?: string | undefined;
  /**
   * URL - if any - to the media object attached to this post.
   * @example "https://storage.googleapis.com/cas-fee-adv-mumble-api/1094b5e0-5f30-4f0b-a342-ae12936c42ff"
   */
  mediaUrl?: string | undefined;
  /**
   * If mediaUrl is set, this field contains the mime type of the media object.
   * @example "image/png"
   */
  mediaType?: string | undefined;
  /**
   * Number of total likes on this post.
   * @format int32
   * @example 42
   */
  likes?: number;
  /**
   * Indicates if the current user liked this post. If the call was made unauthorized,
   * this field is "undefined" or absent. Otherwise `true` indicates that the authorized user
   * liked this post.
   */
  likedBySelf?: boolean | undefined;
}

/**
 * Paginated API result that contains arbitrary
 * data and an optional link for the next / previous page.
 */
export interface PostPaginatedResult {
  /**
   * The total count of results.
   * @format int32
   * @example 1337
   */
  count?: number;
  /** The data for this given page. */
  data?: Post[];
  /**
   * Link to next page. If this is undefined, there is no next page.
   * The link will contain pagination information (offset, limit).
   * If returned by a search, the link will not contain the search parameters.
   */
  next?: string | undefined;
  /**
   * Link to previous page. If this is undefined, there is no next page.
   * The link will contain pagination information (offset, limit).
   * If returned by a search, the link will not contain the search parameters.
   */
  previous?: string | undefined;
}

/**
 * Public user information. This information is publicly available to everyone.
 * It contains basic information such as the ID.
 */
export interface PublicUser {
  /**
   * ID of the user who created the post.
   * @example "179944860378202369"
   */
  id: string;
  /**
   * The username of the creator.
   * @example "max_muster"
   */
  username: string;
  /** If set, points to the avatar of the user. */
  avatarUrl?: string | undefined;
}

/** A reply to a post. */
export interface PostReply {
  /**
   * ULID
   * ID of the post, defined in the ULID format.
   * @format ulid
   * @example "01GDMMR85BEHP8AKV8ZGGM259K"
   */
  id: string;
  /**
   * Public user information. This information is publicly available to everyone.
   * It contains basic information such as the ID.
   */
  creator: PublicUser;
  /**
   * Text for the post. Can be undefined if the post is only a media post.
   * Can contain hashtags and mentions.
   * @example "Hello World! #newpost."
   */
  text?: string | undefined;
  /**
   * URL - if any - to the media object attached to this post.
   * @example "https://storage.googleapis.com/cas-fee-adv-mumble-api/1094b5e0-5f30-4f0b-a342-ae12936c42ff"
   */
  mediaUrl?: string | undefined;
  /**
   * If mediaUrl is set, this field contains the mime type of the media object.
   * @example "image/png"
   */
  mediaType?: string | undefined;
  /**
   * Number of total likes on this post.
   * @format int32
   * @example 42
   */
  likes?: number;
  /**
   * Indicates if the current user liked this post. If the call was made unauthorized,
   * this field is "undefined" or absent. Otherwise `true` indicates that the authorized user
   * liked this post.
   */
  likedBySelf?: boolean | undefined;
  /**
   * ULID
   * The ID of the parent post.
   * @format ULID
   */
  parentId?: string;
}

/**
 * Paginated API result that contains arbitrary
 * data and an optional link for the next / previous page.
 */
export interface ReplyPaginatedResult {
  /**
   * The total count of results.
   * @format int32
   * @example 1337
   */
  count?: number;
  /** The data for this given page. */
  data?: PostReply[];
  /**
   * Link to next page. If this is undefined, there is no next page.
   * The link will contain pagination information (offset, limit).
   * If returned by a search, the link will not contain the search parameters.
   */
  next?: string | undefined;
  /**
   * Link to previous page. If this is undefined, there is no next page.
   * The link will contain pagination information (offset, limit).
   * If returned by a search, the link will not contain the search parameters.
   */
  previous?: string | undefined;
}

/** Data that is used to patch a given post. */
export interface UpdatePostData {
  /**
   * Text for the post. If omitted, the text will not be updated.
   * If set to empty string, the text will be removed.
   */
  text?: string | undefined;
}

/** Model to update user data. */
export interface UpdateUserData extends FormData {
  /** If set, updates the firstname of the profile. */
  firstname?: string | undefined;
  /** If set, updates the lastname of the profile. */
  lastname?: string | undefined;
  /** If set, updates the username of the profile. */
  username?: string | undefined;
}

/**
 * User information inside Mumble. This information can only be fetched
 * when requested by an authenticated user.
 */
export interface User {
  /**
   * ID of the user who created the post.
   * @example "179944860378202369"
   */
  id: string;
  /**
   * The username of the creator.
   * @example "max_muster"
   */
  username: string;
  /** If set, points to the avatar of the user. */
  avatarUrl?: string | undefined;
  /** Firstname of the user. */
  firstname?: string | undefined;
  /** Lastname of the user. */
  lastname?: string | undefined;
}

export type PrivateUser = Omit<User, 'firstname' | 'lastname'>;

/**
 * Paginated API result that contains arbitrary
 * data and an optional link for the next / previous page.
 */
export interface UserPaginatedResult {
  /**
   * The total count of results.
   * @format int32
   * @example 1337
   */
  count?: number;
  /** The data for this given page. */
  data: User[];
  /**
   * Link to next page. If this is undefined, there is no next page.
   * The link will contain pagination information (offset, limit).
   * If returned by a search, the link will not contain the search parameters.
   */
  next?: string | undefined;
  /**
   * Link to previous page. If this is undefined, there is no next page.
   * The link will contain pagination information (offset, limit).
   * If returned by a search, the link will not contain the search parameters.
   */
  previous?: string | undefined;
}
