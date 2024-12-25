import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorElement from "../Components/ErrorElement";
import Home from "../Components/Home";
// import Signin from "../Pages/Signin";
import Login from "../Pages/Login";
import SigninUp from "../Pages/SigninUp";
import Services from "../Pages/Services";
import AddService from "../Pages/AddService";
import MyReviews from "../Pages/MyReviews";
import UseAvater from "../Pages/UseAvater";
import PrivateRoute from "./PrivateRoute";
import MyServices from "../Components/MyServices";
import CardDetails from "../Components/CardDetails";
import useAxios from "../Hooks/UseAxiosSecure"; 

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
            },
            {
                path: '/services',
                element: <Services></Services>
            },
            {
                path: '/add-service',
                element: <PrivateRoute><AddService></AddService></PrivateRoute>
            },
            {
                path: '/my-services',
                element: <PrivateRoute><MyServices></MyServices></PrivateRoute>
            },
            {
                path: '/my-reviews',
                element: <PrivateRoute><MyReviews></MyReviews></PrivateRoute>
            },
            {
                path: '/avater',
                element: <PrivateRoute><UseAvater></UseAvater></PrivateRoute>
            },
            {
                path: '/service-details/:id',
                element: <PrivateRoute><CardDetails></CardDetails></PrivateRoute>,
                loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/service-details/${params.id}`)
            }
        ]
    }
])

export default Router;