import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { MoviesPage } from "./pages/MoviesPage";
import { MovieDetails } from "./pages/MovieDetails";
import { OrderPage } from "./pages/OrderPage";
import { PaymentPage } from "./pages/PaymentPage";
import { TicketResultPage } from "./pages/TicketResultPage";
import { ProfilePage } from "./pages/ProfilePage";
import { Navbar } from "./components/global/Navbar";
import { Footer } from "./components/global/Footer";
import { NavbarAdmin } from "./components/admin/NavbarAdmin";
import { Dashboard } from "./components/admin/Dashboard";
import { MovieList } from "./components/admin/MovieList";
import { ForgotPassword } from "./pages/ForgotPassowrd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setUserFromStorage } from "./store/slices/authSlice";

const RouterLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

export const PrivateLayout = () => {
  const { token } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export const AdminLayout = () => {
  const { token, user } = useSelector((state) => state.auth);

  if (!token) return <Navigate to="/login" replace />;
  if (user?.role !== "admin") return <Navigate to="/" replace />;

  return (
    <main className="bg-gray-300">
      <NavbarAdmin />
      <div className="px-6 lg:px-12 py-10">
        <Outlet />
      </div>
    </main>
  );
};

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(
        setUserFromStorage({
          user: null,
          token,
        })
      );
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RouterLayout />}>
          <Route index element={<HomePage />} />
          <Route path="movies" element={<MoviesPage />} />
          <Route path="movies/:id" element={<MovieDetails />} />

          <Route element={<PrivateLayout />}>
            <Route path="order" element={<OrderPage />} />
            <Route path="payment" element={<PaymentPage />} />
            <Route path="result" element={<TicketResultPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Route>

        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="movies" element={<MovieList />} />
        </Route>

        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
};
