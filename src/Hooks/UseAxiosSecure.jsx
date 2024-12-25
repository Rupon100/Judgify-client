import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})


const useAxios = () => {
    const { logOut} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.interceptors.response.use(res => {
            return res;
        }, async err => {
            if(err.response.status === 401 || err.response.status === 403){
                logOut();
                navigate('/login');
            }
        })
    }, [navigate, logOut]);
    
    return axiosInstance;
}
export default useAxios;