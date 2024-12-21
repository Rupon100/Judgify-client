import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorElement from "../Components/ErrorElement";
import Home from "../Components/Home";
// import Signin from "../Pages/Signin";
import Login from "../Pages/Login";
import SigninUp from "../Pages/SigninUp";

const Router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorElement></ErrorElement>,
        children: [
            {
                index: true,
                element: <Home></Home>,
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signin',
                element: <SigninUp></SigninUp>
            }
        ]
    }
])

export default Router;