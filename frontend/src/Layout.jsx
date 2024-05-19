import React from "react";
import { Outlet } from "react-router-dom";
// import SignIn from "./pages/SignIn";
// import { Button } from "./components/Button";
const Layout = () => {
  return (
    <div>
      {/* <SignIn /> */}

      {/* <Button /> */}
      <Outlet />
    </div>
  );
};

export default Layout;
