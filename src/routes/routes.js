import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import { Products, Login, CreateProduct } from "@/pages";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/products",
    children: [
      {
        path: "products",
        name: "products",
        component: Products
      },
      {
        path: "createProduct",
        name: "createProduct",
        component: CreateProduct
      }
    ]
  },
  {
    path: "/login",
    component: Login
  }
];

export default routes;
