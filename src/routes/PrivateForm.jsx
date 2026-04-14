import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateForm() {
  const { currentUser } = useSelector((state) => state.user);

  const authPayload = currentUser?.data ?? currentUser;
  const authUser = authPayload?.user ?? authPayload ?? null;
  const isAuthenticated = Boolean(
    authPayload?.accessToken || authUser?._id || authUser?.email || authUser?.name
  );

  return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}
