import { QUERY_KEYS } from "@/lib/query-keys";
import { axiosInstance } from "@/lib/util";
import type { CreatePostType, EditPostType, PostType } from "@/type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useAllPost = () => {
  return useQuery<PostType[]>({
    queryKey: [QUERY_KEYS.GET_ALL_POSTS],
    queryFn: async () => {
      const res = await axiosInstance.get("/posts");
      return res.data as PostType[];
    },
    staleTime: 5 * 60 * 1000, // cache data for 5 mins
    gcTime: 5 * 60 * 1000, // keep in memory 5 mins after unused
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QUERY_KEYS.DELETE_POST],
    mutationFn: async (id: string) => {
      const res = await axiosInstance.delete(`/posts/${id}`);
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_POSTS],
      });
    },
  });
};

export const usePost = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SINGLE_POST(id!)],
    queryFn: async () => {
      const res = await axiosInstance.get(`/posts/${id}`);
      return res.data as PostType;
    },
    enabled: !!id,
  });
};

export const useEditPost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: [QUERY_KEYS.EDIT_POST],
    mutationFn: async ({ id, data }: { id: string; data: EditPostType }) => {
      const res = await axiosInstance.patch(`/posts/${id}`, data);
      return res.data as PostType;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_POSTS],
      });
      navigate("/");
    },
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: [QUERY_KEYS.CREATE_POST],
    mutationFn: async (data: CreatePostType) => {
      const response = await axiosInstance.post("/posts", data);
      return response.data as PostType;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_POSTS],
      });

      navigate("/");
    },
    onError: (error) => {
      console.error("Post creation failed", error);
    },
  });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.LIKE_POST],
    mutationFn: async (id: string) => {
      const response = await axiosInstance.patch(`/posts/${id}/like`);
      return response.data as PostType;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_POSTS],
      });
    },
    onError: (error) => {
      console.error("Post creation failed", error);
    },
  });
};
