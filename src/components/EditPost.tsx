import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEditPost, usePost } from "@/hooks/posts";
import { formSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Save } from "lucide-react";
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

  if (singleLoadingData) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin mx-auto text-indigo-600 mb-2" />
          <p className="text-gray-600">Loading post data...</p>
        </div>
      </div>
    );
  }

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
    <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-2xl shadow-2xl border border-gray-200 rounded-xl overflow-y-auto max-h-[90vh]">
        <CardHeader className="space-y-1 pb-6">
          <CardTitle className="text-center text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">
            Edit Post
          </CardTitle>
          <p className="text-center text-sm text-gray-500">
            Update your post details
          </p>
        </CardHeader>
        <CardContent className="px-6 sm:px-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="title"
                        {...field}
                        className="h-11 focus-visible:ring-2 focus-visible:ring-indigo-500 transition-all"
                      />
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
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="body"
                        {...field}
                        className="min-h-[120px] resize-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-all"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="creatorName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Your Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="your name"
                          {...field}
                          className="h-11 focus-visible:ring-2 focus-visible:ring-indigo-500 transition-all"
                        />
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
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Tags
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="tags"
                          {...field}
                          className="h-11 focus-visible:ring-2 focus-visible:ring-indigo-500 transition-all"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-11 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 transition-colors mt-6"
              >
                {isPending ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Update Post</span>
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditPost;
