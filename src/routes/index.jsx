import { Outlet } from "react-router-dom";

import Layout from "../layouts";
import Home from "../pages/home";
import About from "../pages/about";
import Contact from "../pages/contact";

export function routes() {
  return [
    {
      path: "/",
      element: (
        <Layout>
          <Outlet />
        </Layout>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
      ],
    },
  ];
}
