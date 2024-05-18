import React from "react";
import { Outlet } from "react-router-dom";
// import { Button } from "./components/Button";
const Layout = () => {
  return (
    <div>
      {/* <Button /> */}
      <Outlet />
    </div>
  );
};

export default Layout;
