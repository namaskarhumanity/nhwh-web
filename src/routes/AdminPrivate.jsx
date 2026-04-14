import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function AdminPrivate() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser && currentUser?.data?.user.is_admin ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
}
