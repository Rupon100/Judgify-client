import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import Loading from "../Components/Loading";

 

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    
    if(user){
        return children;
    }
    if(loading){
        return <Loading></Loading>;
    }

    return (
        <div>
            <Navigate to='/login'></Navigate>
        </div>
    );
};

export default PrivateRoute;