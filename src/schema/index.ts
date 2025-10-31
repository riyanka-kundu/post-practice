import { z } from "zod";

export const formSchema = z.object({
  title: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Title is required"
          : "Title must be a string",
    })
    .min(3, { error: "Title is too short" })
    .max(30, { error: "Title should not exceed 30 characters" }),
  body: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Description is required"
          : "Description must be a string",
    })
    .min(10, { error: "Description is too short" })
    .max(200, { error: "Description should not exceed 200 characters" }),
  creatorName: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Creator name  is required"
          : "Creator name must be a string",
    })
    .min(5, { error: "Name is too short" })
    .max(15, { error: "Creator name should not exceed 15 characters" }),
  tags: z
    .string({ error: "Each tag must be string" })
    .min(1, { error: "At least one tag is required" })
   
});
