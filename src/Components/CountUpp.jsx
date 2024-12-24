import axios from "axios";
import { useEffect, useState } from "react";
import CountUp from 'react-countup';

const CountUpp = () => {
    const [reviewsCount, setReviewsCount] = useState(0);
    const [servicesCount, setServicesCount] = useState(0);
    const [totalUsers, setTotlaUsers] = useState(0);

    useEffect(() => {
        fetchAll();
    }, [])

    const fetchAll = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/all-services`);
        const reviews = await axios.get(`${import.meta.env.VITE_API_URL}/all-reviews`);
        const users = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
        setServicesCount(data.result);
        setReviewsCount(reviews.data.result);
        setTotlaUsers(users.data.result);
    }

    return (
        <div className="w-full p-10 bg-gray-800 flex flex-col md:flex-row justify-around items-center gap-4 text-white">
            <div className="text-center" >
                <h3>Total Users</h3>
                <div className="font-semibold text-2xl">
                    <CountUp start={0} end={totalUsers} delay={1}>
                      {({ countUpRef }) => (
                        <div>
                          <span ref={countUpRef} />
                        </div>
                      )}
                    </CountUp>
                </div>
            </div>
            <div className="text-center" >
                <h3>Total Reviews</h3>
                <div className="font-semibold text-2xl">
                    <CountUp start={0} end={reviewsCount} delay={1}>
                      {({ countUpRef }) => (
                        <div>
                          <span ref={countUpRef} />
                        </div>
                      )}
                    </CountUp>
                </div>
            </div>
            <div className="text-center" >
                <h3>Total Service</h3>
                <div className="font-semibold text-2xl" >
                    <CountUp start={0} end={servicesCount} delay={1}>
                      {({ countUpRef }) => (
                        <div>
                          <span ref={countUpRef} />
                        </div>
                      )}
                    </CountUp>
                </div>
            </div>
            
        </div>
    );
};

export default CountUpp;