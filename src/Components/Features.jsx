import axios from "axios";
import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";
const Features = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAll();
    }, [])


    const fetchAll = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/featured-services`);
            setServices(data);

        } catch (error) {
            // console.error("Error fetching services:", error);
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="p-10 space-y-10" >
            <h2 className="text-center font-semibold text-2xl" >Featured Services</h2>
           {loading ? ( 
                <div className="text-center">
                    Loading...
                </div>
            ) : (
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {services.length > 0 ? (  
                        services.map((service) => (
                            <ServiceCard key={service._id} service={service}></ServiceCard>
                        ))
                    ) : (
                        <div className="text-center col-span-full">No data found</div>
                    )}
                </div>
            )}

        </div>
    );
};

export default Features;