import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

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
              className="menu menu-sm dropdown-content bg-black text-white rounded-box z-[10] space-y-3 mt-3 w-52 p-2 shadow "
            >
              {links}
            </ul>
          </div>
          <Link to="/" className="text-xl font-bold">
            Judgify
          </Link>
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
