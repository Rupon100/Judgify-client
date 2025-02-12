import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Apply theme to the HTML element & save to localStorage when theme changes
  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const links = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "border-b-2 border-b-gray-300" : ""
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/services"
        className={({ isActive }) =>
          isActive ? "border-b-2 border-b-gray-300" : ""
        }
      >
        Services
      </NavLink>
      {user && (
        <>
          <NavLink
            to="/add-service"
            className={({ isActive }) =>
              isActive ? "border-b-2 border-b-gray-300" : ""
            }
          >
            Add Service
          </NavLink>
          <NavLink
            to="/my-services"
            className={({ isActive }) =>
              isActive ? "border-b-2 border-b-gray-300" : ""
            }
          >
            My Service
          </NavLink>
          <NavLink
            to="/my-reviews"
            className={({ isActive }) =>
              isActive ? "border-b-2 border-b-gray-300" : ""
            }
          >
            My Reviews
          </NavLink>
        </>
      )}
    </>
  );

  const handleLogout = () => {
    logOut();
  };

  return (
    <div className=" bg-gray-900 text-white z-40 sticky top-0 left-0">
      <div className="navbar max-w-5xl mx-auto ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-black text-white rounded-box z-[10] space-y-3 mt-3 w-52 p-2 text-center "
            >
              {links}
            </ul>
          </div>
          {/* logo and dark and light theme */}
          <div className="flex justify-center items-center gap-2">
            <Link to="/" className="text-xl font-bold">
              Judgify
            </Link>
            {/* Theme Toggle Button */}
            <button onClick={toggleTheme} className="ml-4">
              {theme === "light" ? (
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 3V1M12 23v-2M4.22 4.22l-1.42-1.42M19.78 19.78l-1.42-1.42M1 12H3M21 12h2M4.22 19.78l1.42-1.42M19.78 4.22l1.42-1.42M12 6a6 6 0 110 12 6 6 0 010-12z" />
                </svg>
              ) : (
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M21.64 13a1 1 0 00-1.05-.14A8.05 8.05 0 0117.22 13a8.15 8.15 0 01-8.14-8.51 8.59 8.59 0 01.25-2A1 1 0 008 2.36 10.14 10.14 0 1022 14.05a1 1 0 00-.36-1.05zm-9.5 6.69A8.14 8.14 0 017.08 5.22v.27A10.15 10.15 0 0017.22 15.63a9.79 9.79 0 002.1-.22A8.11 8.11 0 0112.14 19.73z" />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-4">{links}</ul>
        </div>
        <div className="navbar-end space-x-2">
          {user ? (
            <>
              <button
                onClick={handleLogout}
                className="border px-3 py-1 hover:bg-white hover:text-black transition-all"
              >
                Log out
              </button>
              <img
                className="h-12 w-12 rounded-full cursor-pointer border"
                src={user?.photoURL}
                alt="profile"
                referrerPolicy="no-referrer"
              />
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="border px-3 py-1 hover:bg-white hover:text-black transition-all"
              >
                Log in
              </NavLink>
              <NavLink
                to="/signin"
                className={`border px-3 py-1 hover:bg-white hover:text-black transition-all`}
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
