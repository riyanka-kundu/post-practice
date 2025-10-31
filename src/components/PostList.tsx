import { useAllPost, useDeletePost } from "@/hooks/posts";
import { toast } from "sonner";
import Post from "../components/Post";

const PostList = () => {
  const { data, isLoading, error } = useAllPost();

  const {
    mutateAsync: deletePost,
    isPending,
    error: deletePostError,
  } = useDeletePost();

  const handleDelete = async (id: string) => {
    await deletePost(id);
    toast.success("Post has not been deleted");
  };

  if (isLoading) return <p className="p-6 text-lg">Loading posts...</p>;

  if (error) return <p className="p-6 text-red-500">Failed to load posts.</p>;
  if (!isPending && deletePostError) {
    toast.error("Failed to delete pos");
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {data?.map((post) => (
        <Post
          key={post.id}
          post={post}
          onRemove={() => handleDelete(post.id)}
        />
      ))}

      {isPending && (
        <p className="text-center text-gray-500 mt-4">Deleting post...</p>
      )}
    </div>
  );
};

export default PostList;
