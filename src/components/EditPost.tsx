import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEditPost, usePost } from "@/hooks/posts";
import { formSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const EditPost = () => {
  const { id } = useParams();

  const { mutateAsync: editPost, isPending, error } = useEditPost();
  const {
    data: singlePostData,
    isLoading: singleLoadingData,
    error: singlePostError,
  } = usePost(id!);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      body: "",
      creatorName: "",
      tags: "",
    },
  });
  useEffect(() => {
    if (singlePostData) {
      form.reset({
        title: singlePostData.title,
        body: singlePostData.body,
        creatorName: singlePostData.creatorName,
        tags: Array.isArray(singlePostData.tags)
          ? singlePostData.tags.join(", ")
          : singlePostData.tags || "",
      });
    }
  }, [singlePostData, form]);

  if (!id) {
    toast.error("Id not found");
  }
  if (singleLoadingData) return <p>Loading...</p>;
  if (singlePostError) {
    toast.error("Failed to show individual post");
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const tags = values.tags?.includes(",")
      ? values.tags.split(",").map((tag) => tag.trim())
      : values.tags;
    await editPost({
      id: id!,
      data: {
        title: values.title,
        body: values.body,
        creatorName: values.creatorName,
        tags,
      },
    });
    toast.success("Post updated successfully");
  };

  if (!isPending && error) {
    toast.error("Failed to update post");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="title" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Body</FormLabel>
              <FormControl>
                <Input placeholder="body" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="creatorName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CreatorName</FormLabel>
              <FormControl>
                <Input placeholder="your name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input placeholder="tags" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />{" "}
        <Button type="submit" disabled={isPending}>
          {isPending ? "Updating..." : "Update"}
        </Button>
      </form>
    </Form>
  );
};

export default EditPost;
