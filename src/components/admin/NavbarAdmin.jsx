import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";

export const NavbarAdmin = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setMenuOpen(false);
  };

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <nav
        className="flex items-center justify-between h-[70px] px-6 lg:px-12 py-2 w-full relative z-50"
        onClick={handleNavClick}
      >
        <div className="flex-1">
          <img src="/logos/logo.svg" alt="logo" />
        </div>

        <div className="hidden lg:flex flex-1 justify-center items-center gap-8 text-sm font-normal text-[#0F172A]">
          <Link to="/admin" className="font-[Mulish] hover:text-blue-600">
            Dashboard
          </Link>
          <Link
            to="/admin/movies"
            className="font-[Mulish] hover:text-blue-600"
          >
            Movie
          </Link>
        </div>

        {user && (
          <div className="hidden lg:flex justify-end flex-1">
            <button
              onClick={handleLogout}
              className="text-sm text-white bg-red-600 px-5 py-1.5 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        )}

        <div
          className="block text-2xl cursor-pointer lg:hidden"
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen((prev) => !prev);
          }}
        >
          ☰
        </div>
      </nav>

      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-3 text-center">
          <div className="flex flex-col gap-2 text-sm text-[#0F172A] items-center">
            <Link
              to="/admin"
              onClick={handleNavClick}
              className="font-[Mulish] hover:text-blue-600"
            >
              Dashboard
            </Link>
            <Link
              to="/admin/movies"
              onClick={handleNavClick}
              className="font-[Mulish] hover:text-blue-600"
            >
              Movie
            </Link>
          </div>

          {user && (
            <div className="mt-3 flex flex-col items-center">
              <button
                onClick={handleLogout}
                className="text-sm text-white bg-red-600 px-5 py-1.5 rounded hover:bg-red-700 transition w-full max-w-[200px]"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
