export type PostType = {
  id: string;
  title: string;
  body: string;
  creatorName: string;
  tags: string | string[];
  likeCount: number;
  //   images:string[]
};

export type CreatePostType = Omit<PostType, "id" | "likeCount">;
export type EditPostType = Partial<Omit<PostType, "id" | "likeCount">>;
