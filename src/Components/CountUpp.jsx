import axios from "axios";
import { useEffect, useState, useRef } from "react";
import CountUp from 'react-countup';

const CountUpp = () => {
    const [reviewsCount, setReviewsCount] = useState(0);
    const [servicesCount, setServicesCount] = useState(0);
    const [totalUsers, setTotlaUsers] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);  
    const [counterKey, setCounterKey] = useState(0);   

    const countUpRefs = useRef([]);

    useEffect(() => {
         
        fetchAll();
        
        
        const handleScroll = () => {
            if (!hasAnimated) {

                if (countUpRefs.current[0]) {
                    const rect = countUpRefs.current[0].getBoundingClientRect();
                    const isInView = rect.top >= 0 && rect.bottom <= window.innerHeight;
                    if (isInView) {
                        setHasAnimated(true);   
                        setCounterKey(prevKey => prevKey + 1); 
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();  

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [hasAnimated]);  

    const fetchAll = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/all-services`);
        const reviews = await axios.get(`${import.meta.env.VITE_API_URL}/all-reviews`);
        const users = await axios.get(`${import.meta.env.VITE_API_URL}/users`);

        setServicesCount(data.result);
        setReviewsCount(reviews.data.result);
        setTotlaUsers(users.data.result);
    };

    return (
        <div className="w-full p-10 bg-gray-800 flex flex-col md:flex-row justify-around items-center gap-4 text-white">
            <div
                ref={(el) => countUpRefs.current[0] = el}
                className="text-center border p-3 rounded"
            >
                <h3>Total Users</h3>
                <div className="font-bold text-4xl">
                    {hasAnimated && (
                        <CountUp
                            key={`users-${counterKey}`}  
                            start={0} end={totalUsers}
                        >
                            {({ countUpRef }) => <span ref={countUpRef} />}
                        </CountUp>
                    )}
                </div>
            </div>

            <div
                ref={(el) => countUpRefs.current[1] = el}
                className="text-center border p-3 rounded"
            >
                <h3>Total Reviews</h3>
                <div className="font-bold text-4xl">
                    {hasAnimated && (
                        <CountUp
                            key={`reviews-${counterKey}`}  
                            start={0} end={reviewsCount}
                        >
                            {({ countUpRef }) => <span ref={countUpRef} />}
                        </CountUp>
                    )}
                </div>
            </div>

            <div
                ref={(el) => countUpRefs.current[2] = el}
                className="text-center border p-3 rounded"
            >
                <h3>Total Service</h3>
                <div className="font-bold text-4xl">
                    {hasAnimated && (
                        <CountUp
                            key={`services-${counterKey}`} 
                            start={0} end={servicesCount}
                        >
                            {({ countUpRef }) => <span ref={countUpRef} />}
                        </CountUp>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CountUpp;
