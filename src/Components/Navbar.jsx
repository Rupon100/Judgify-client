import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

 

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const links = <>
       <Link to='/' >Home</Link>
       <Link to='/services' >Services</Link>
       {
        user && <>
          <Link to='/add-service' >Add Service</Link>
          <Link to='/my-reviews' >My Reviews</Link>
          <Link to='/avater' >User Avatar</Link>
        </>
       }
    </>

    const handleLogout = () => {
      logOut();
    }

    return (
        <div className="navbar bg-gray-900 border-b text-white">
            <div className="navbar-start">
              <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16" />
                  </svg>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-black ">
                  {links}
                </ul>
              </div>
               <Link to='/' className="text-xl font-bold">Judgify</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1 space-x-4">
                {links}
              </ul>
            </div>
            <div className="navbar-end space-x-2">
               {
                user ? <button onClick={handleLogout} className="border px-3 py-1 hover:bg-white hover:text-black transition-all" >Log out</button> : <>
                  <Link to='/login' className="border px-3 py-1 hover:bg-white hover:text-black transition-all" >Log in</Link>
                  <Link to='/signin'  className="border px-3 py-1 hover:bg-white hover:text-black transition-all" >Register</Link>
                </>
               }
              
            </div>
        </div>
    );
}

export default Navbar;