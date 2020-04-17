import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import {
  Login,
  Posts,
  CreatePost,
  EditPost
} from "@/pages";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/posts",
    children: [
      {
        path: "posts",
        name: "posts",
        component: Posts
      },
      {
        path: "createPost",
        name: "createPost",
        component: CreatePost
      },
      {
        path: "posts/:slug",
        name: "editPost",
        component: EditPost
      },
    ]
  },
  {
    path: "/login",
    component: Login
  }
];

export default routes;
