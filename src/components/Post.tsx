import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useLikePost } from "@/hooks/posts";
import { Loader2, SquarePen, ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import type { PostType } from "../type";
import DeleteAlert from "./DeleteAlert";
import { Button } from "./ui/button";

type PostProps = {
  post: PostType;
  onRemove: () => void;
};

const Post = ({ post, onRemove }: PostProps) => {
  const { mutateAsync: likePost, isPending, error } = useLikePost();

  if (!isPending && error) {
    toast.error("Something went wrong....");
  }

  return (
    <Card className="shadow-md border rounded-lg min-w-90">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{post.title}</CardTitle>
        <CardDescription className="text-gray-700">{post.body}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Creator:</span> {post.creatorName}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Likes:</span> {post.likeCount}
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {Array.isArray(post.tags) ? (
            post.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-sky-100 text-sky-700 text-xs px-2 py-1 rounded-md"
              >
                #{tag}
              </span>
            ))
          ) : (
            <span className="bg-sky-100 text-sky-700 text-xs px-2 py-1 rounded-md">
              #{post.tags}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between pt-4">
        <Button
          variant="ghost"
          className="flex gap-2 items-center"
          disabled={isPending}
          onClick={async () => {
            await likePost(post.id);
            toast.success("Post liked successfully");
          }}
        >
          {isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span className="sr-only">Loading</span>
            </>
          ) : (
            <>
              <ThumbsUp className="size-4" />
              <span className="sr-only">Like</span>
            </>
          )}
        </Button>
        {/* Edit Button */}
        <Link
          to={`/edit-post/${post.id}`}
          className="px-3 py-2 flex gap-2 items-center bg-sky-600 hover:bg-sky-700 text-white uppercase rounded-lg text-sm transition"
        >
          <SquarePen className="size-4" />
          <span>Edit</span>
        </Link>
        <DeleteAlert onRemove={onRemove} />
      </CardFooter>
    </Card>
  );
};

export default Post;
