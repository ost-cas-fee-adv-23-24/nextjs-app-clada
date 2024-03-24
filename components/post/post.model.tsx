type TCreator = {
  id: string;
  username: string;
  avatarUrl: string;
};

type TPost = {
  id: string;
  creator: TCreator;
  text: string;
  mediaUrl: string | null;
  mediaType: string | null;
  likes: number;
  likedBySelf: boolean | null;
  replies: number;
};

type TReply = TPost & {
  parentId: string;
};
