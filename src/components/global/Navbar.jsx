import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";

export const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setShowMenu(false);
    setMenuOpen(false);
  };

  const handleNavClick = () => {
    setShowMenu(false);
    setMenuOpen(false);
  };

  return (
    <header className="w-full">
      <nav
        className="flex items-center justify-between h-[70px] border-b border-gray-200 bg-white px-6 lg:px-12 py-2 w-full relative z-50"
        onClick={handleNavClick}
      >
        {/* logo */}
        <div className="flex-1">
          <img src="/logos/logo.svg" alt="logo" />
        </div>

        {/* menu dekstop*/}
        <div className="hidden lg:flex flex-1 justify-center items-center gap-8 text-sm font-normal text-[#0F172A]">
          <Link to="/" className="font-[Mulish]">
            Home
          </Link>
          <Link to="/movies" className="font-[Mulish]">
            Movie
          </Link>
          <Link to="/movies" className="font-[Mulish]">
            Buy Ticket
          </Link>
        </div>

        {/* udah login */}
        {user ? (
          <div className="hidden lg:flex items-center justify-end flex-1 gap-4 relative">
            <div className="flex items-center gap-1 cursor-pointer">
              <span className="text-sm text-gray-700">Location</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            <div className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <img
              src="/images/avatar.svg"
              alt="User Avatar"
              className="cursor-pointer"
              width={40}
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu((prev) => !prev);
              }}
            />

            {showMenu && (
              <div className="absolute right-0 top-12 z-10 bg-white border border-gray-300 rounded shadow-lg w-40">
                <Link
                  to="profile"
                  onClick={handleNavClick}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          // belom login
          <div className="hidden lg:flex items-center justify-end flex-1 gap-3">
            <Link to="/login">
              <button className="text-sm text-blue-600 border border-blue-600 px-5 py-1.5 rounded hover:bg-blue-50 transition">
                Sign In
              </button>
            </Link>
            <Link to="/register">
              <button className="text-sm text-white bg-blue-600 px-5 py-1.5 rounded hover:bg-blue-700 transition">
                Sign Up
              </button>
            </Link>
          </div>
        )}

        {/* burger menu */}
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

      {/* responsive */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-6 py-4 space-y-3">
          <div className="flex flex-col gap-2 text-sm text-[#0F172A] items-center text-center">
            <Link to="/" onClick={handleNavClick} className="font-[Mulish]">
              Home
            </Link>
            <Link
              to="/movies"
              onClick={handleNavClick}
              className="font-[Mulish]"
            >
              Movie
            </Link>
            <Link
              to="/movies"
              onClick={handleNavClick}
              className="font-[Mulish]"
            >
              Buy Ticket
            </Link>
          </div>

          {user ? (
            <div className="mt-3 flex flex-col gap-2 items-center">
              <Link
                to="profile"
                onClick={handleNavClick}
                className="text-sm text-gray-700 hover:underline"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm text-red-600 hover:underline"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="mt-3 flex flex-col gap-2">
              <Link to="/login" onClick={handleNavClick}>
                <button className="text-sm text-blue-600 border border-blue-600 px-5 py-1.5 rounded hover:bg-blue-50 transition w-full">
                  Sign In
                </button>
              </Link>
              <Link to="/register" onClick={handleNavClick}>
                <button className="text-sm text-white bg-blue-600 px-5 py-1.5 rounded hover:bg-blue-700 transition w-full">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
