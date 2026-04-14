import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Private from "./routes/Private";
import AdminPrivate from "./routes/AdminPrivate";
import PrivateForm from "./routes/PrivateForm";
import { useDispatch, useSelector } from "react-redux";
import { lazy, Suspense, useCallback, useEffect } from "react";
import axios from "axios";
import { updateSuccess } from "./redux/slices/userSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = lazy(() => import("./pages/Home"));
const Program = lazy(() => import("./pages/Program"));
const ProgramDetail = lazy(() => import("./pages/ProgramDetail"));
const About = lazy(() => import("./pages/About"));
const Certificate = lazy(() => import("./pages/Certificate"));
const Contact = lazy(() => import("./pages/Contact"));
const VerifyEmail = lazy(() => import("./components/VerifyEmail"));
const Payment = lazy(() => import("./pages/Payment"));
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const PaymentFailure = lazy(() => import("./pages/PaymentFailure"));
const VolunteerForm = lazy(() => import("./pages/VolunteerForm"));
const InitiativeDetail = lazy(() => import("./pages/InitiativeDetail"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Forgot = lazy(() => import("./pages/Forgot"));
const Account = lazy(() => import("./pages/Account"));
const Profile = lazy(() => import("./pages/Profile"));
const ChangePassword = lazy(() => import("./pages/ChangePassword"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const AllUser = lazy(() => import("./pages/admin/AllUser"));
const AllVolunteer = lazy(() => import("./pages/admin/AllVolunteer"));
const Inbox = lazy(() => import("./pages/admin/Inbox"));
const Donations = lazy(() => import("./pages/admin/Donations"));
const VolunteerEmailTemplate = lazy(() => import("./pages/admin/VolunteerEmailTemplate"));
const ManageProgram = lazy(() => import("./pages/admin/ManageProgram"));
const AddProgram = lazy(() => import("./pages/admin/AddProgram"));
const ManageTeam = lazy(() => import("./pages/admin/ManageTeam"));
const AddTeam = lazy(() => import("./pages/admin/AddTeam"));
const AllProgram = lazy(() => import("./pages/admin/AllProgram"));
const AllTeam = lazy(() => import("./pages/admin/AllTeam"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  const server = import.meta.env.VITE_SERVER;
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const refreshToken = currentUser?.data?.refreshToken;

  const getRefreshToken = useCallback(async () => {
    try {
      if (!refreshToken) {
        return;
      }
      const res = await axios.post(`${server}/auth/refresh-token`, {
        refreshToken,
      });
      if (res.data.success) {
        dispatch(updateSuccess(res.data));
      }
    } catch (error) {
      if (error.response?.status === 401) {
        dispatch(updateSuccess({ data: null }));
      }
    }
  }, [dispatch, refreshToken, server]);

  useEffect(() => {
    if (refreshToken) {
      getRefreshToken();
    }
  }, [getRefreshToken, refreshToken]);

  return (
    <Router>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center text-slate-600">
            Loading...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/program" element={<Program />} />
          <Route path="/program/:id" element={<ProgramDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/certificates" element={<Certificate />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/verify-email/:id" element={<VerifyEmail />} />
          <Route path="/donate" element={<Payment />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-failure" element={<PaymentFailure />} />
          <Route path="/register-as-volunteer" element={<VolunteerForm />} />
          <Route path="/initiative/:id" element={<InitiativeDetail />} />
          <Route element={<PrivateForm />}>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/forgot-password" element={<Forgot />} />
          </Route>
          <Route element={<Private />}>
            <Route path="/account" element={<Account />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/change-password" element={<ChangePassword />} />
          </Route>
          <Route element={<AdminPrivate />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<AllUser />} />
            <Route path="/volunteers" element={<AllVolunteer />} />
            <Route path="/messages" element={<Inbox />} />
            <Route path="/donations" element={<Donations />} />
            <Route path="/volunteer-email-template" element={<VolunteerEmailTemplate />} />
            <Route path="/manage-program" element={<ManageProgram />} />
            <Route path="/add-program" element={<AddProgram />} />
            <Route path="/manage-team" element={<ManageTeam />} />
            <Route path="/add-team" element={<AddTeam />} />
            <Route path="/programs" element={<AllProgram />} />
            <Route path="/teams" element={<AllTeam />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <ToastContainer position="bottom-right" theme="dark" />
    </Router>
  );
}

export default App;
