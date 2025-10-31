export const QUERY_KEYS = {
  CREATE_POST: "createPost",
  GET_ALL_POSTS: "getAllPosts",
  EDIT_POST: "editPost",
  SINGLE_POST: (id: string) => `post:${id}`,
  DELETE_POST: "deletePost",
  LIKE_POST:"likePost"
};
