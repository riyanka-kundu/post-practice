import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Container from "./components/Container";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";
import PostList from "./components/PostList";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Container />,
    children: [
      {
        path: "/",
        element: <PostList />,
      },
      { path: "create-post", element: <CreatePost /> },
      { path: "edit-post/:id", element: <EditPost /> },
      
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>
);
