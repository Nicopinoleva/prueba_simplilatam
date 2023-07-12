import { Navigate, Outlet } from "react-router-dom";
import { Home } from "./views/home/Home";
type LayoutProps = {
  isPrivate?: boolean;
};

export const Layout = ({ isPrivate }: LayoutProps) => {
  if (!isPrivate) {
    return <Outlet />;
  }
  return <Home />;
};
