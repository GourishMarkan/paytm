import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import SignIn from "../src/pages/SignIn";
import Dashboard from "../src/pages/Dashboard";
import Signup from "../src/pages/Signup";
import SendMoney from "../src/pages/SendMoney";
import Layout from "../src/Layout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "signup",

        element: <Signup />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "send",
        element: <SendMoney />,
      },
    ],
  },
]);

export default router;
// const Routes = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<Layout />}>
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/signin" element={<SignIn />} />
//       <Route path="/dashboard" element={<Dashboard />} />
//       <Route path="/send" element={<SendMoney />} />
//     </Route>
//   )
// );
// export default Routes;
