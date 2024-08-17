import { useState } from "react";
import "tailwindcss/tailwind.css";
import "daisyui/dist/full.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/AuthSlice";

export default function Header() {
  const cart = useSelector((state) => state.card.cart);
  const total = useSelector((state) => state.card.total);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const userDis = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuth);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
    document.documentElement.setAttribute(
      "data-theme",
      !isDarkMode ? "dark" : "light"
    );
  };
  const leave = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-100 fixed top-0 left-0 right-0 shadow-md p-4 z-10">
      <div className="flex-1">
        <Link
          to={isAuth ? "/card" : "/"}
          className="btn btn-ghost font-black text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] via-[#D946EF] to-[#FB7185]"
        >
          Store
        </Link>
      </div>

      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item  text-red-300">
                {cart.length}
              </span>
            </div>
          </label>
          <div
            tabIndex={0}
            className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body">
              <span className="font-bold text-lg">{cart.length} Items</span>
              <span className="text-info">Total: $ {total.toFixed(2)}</span>
              <div className="card-actions">
                <Link to="/card/cart" className="btn btn-primary btn-block">
                  View cart
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className={`theme-${isDarkMode ? "dark" : "light"}`}>
          <input
            onClick={toggleTheme}
            type="checkbox"
            className="toggle toggle-sm mx-2"
          />
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="/assets/vector.jpg"
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <a>Settings</a>
            </li>
            {userDis === true ? (
              <li>
                <a onClick={leave}>Logout</a>
              </li>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
