import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import {
  Login,
  Products,
  CreateProduct,
  EditProduct,
  Notices,
  CreateNotice
} from "@/pages";

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
      },
      {
        path: "product/:id",
        name: "editProduct",
        component: EditProduct,
        props: true
      },
      {
        path: "notices",
        name: "notices",
        component: Notices
      },
      {
        path: "createNotice",
        name: "createNotice",
        component: CreateNotice
      },
    ]
  },
  {
    path: "/login",
    component: Login
  }
];

export default routes;
