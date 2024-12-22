import axios from "axios";
import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";

 
const Features = () => {
    //featured-service

    const [services, setServices] = useState([]);
    // const { data } = axios.get(`${import.meta.env.VITE_API_URL}/services`);
    // console.log(data);

    useEffect(() => {
        fetchAll();
    }, [])

    const fetchAll = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/featured-services`);
        setServices(data);
    }

    return (
        <div className="p-10 space-y-10" >
            <h2 className="text-center font-semibold text-2xl" >Featured Services</h2>
            <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3' >
                {
                    services.map(service => <ServiceCard key={service._id} service={service} ></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Features;