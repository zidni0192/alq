import Root from "./containers/index";
import Home from "./containers/Home";
import Detail from "./containers/Detail";
const routes = [
  {
    component: Root,
    routes: [
      {
        path: "/",
        exact: true,
        component: Home,
      },
      {
        exact: true,
        path: "/surat/:id",
        component: Detail,
      },
    ],
  },
];
export default routes;
