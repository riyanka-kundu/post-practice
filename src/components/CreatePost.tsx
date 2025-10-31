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
import { useCreatePost } from "@/hooks/posts";
import { formSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const CreatePost = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      body: "",
      creatorName: "",
      tags: "",
      title: "",
    },
  });

  const { mutateAsync: createNewPost, isPending, error } = useCreatePost();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const tags = values.tags.includes(",")
      ? values.tags.split(",").map((tag) => tag.trim())
      : values.tags;

    await createNewPost({
      body: values.body,
      creatorName: values.creatorName,
      title: values.title,
      tags,
    });
    toast.success("Post created successfully!");
    form.reset();
  }
  if (!isPending && error) {
    toast.error("Failed to create post");
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-liner-to-br from-gray-50 via-gray-100 to-gray-200 p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-2xl shadow-2xl border border-gray-200 rounded-xl overflow-y-auto max-h-[90vh]">
        <CardHeader className="space-y-1 pb-6">
          <CardTitle className="text-center text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">
            Create a New Post
          </CardTitle>
          <p className="text-center text-sm text-gray-500">
            Share your thoughts with the community
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
                        placeholder="What's on your mind?"
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
                        placeholder="Tell us more..."
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
                          placeholder="John Doe"
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
                          placeholder="#trading, #react"
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
                className="w-full h-11 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 transition-colors mt-6"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    <span>Creating Post...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Create Post</span>
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

export default CreatePost;
