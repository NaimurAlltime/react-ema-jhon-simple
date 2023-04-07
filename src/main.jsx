import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Inventory from "./components/Inventory/Inventory";
import Home from "./components/Layout/Home";
import Login from "./components/Login/Login";
import OrderReview from "./components/OrderReview/OrderReview";
import Orders from "./components/Orders/Orders";
import Shop from "./components/Shop/Shop";
import "./index.css";
import cartProductLoader from "./loaders/cartProductsLoader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    children: [
      {
        path: "/",
        element: <Shop></Shop>,
      },
      {
        path: "orders",
        element: <Orders></Orders>,
        loader: cartProductLoader,
      },
      {
        path: "order_review",
        element: <OrderReview></OrderReview>,
      },
      {
        path: "inventory",
        element: <Inventory></Inventory>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
