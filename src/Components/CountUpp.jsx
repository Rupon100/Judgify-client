 

import axios from "axios";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import ScrollTrigger from 'react-scroll-trigger';

const CountUpp = () => {
  const [reviewsCount, setReviewsCount] = useState(0);
  const [servicesCount, setServicesCount] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [countOn, setCountOn] = useState(false);
  
  useEffect(() => {
    fetchAll();
  }, [])

  const fetchAll = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/all-services`);
      const reviews = await axios.get(`${import.meta.env.VITE_API_URL}/all-reviews`);
      const users = await axios.get(`${import.meta.env.VITE_API_URL}/users`);

      setServicesCount(data.result);
      setReviewsCount(reviews.data.result);
      setTotalUsers(users.data.result);
    } catch (error) {
    //   console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="w-full p-10 bg-gray-800 flex flex-col md:flex-row justify-around items-center gap-4 text-white">
        
        <div className="flex flex-col items-center border p-4 rounded-lg">
            <h3>Total Users</h3>
            <div className="font-bold text-4xl">
              <ScrollTrigger onEnter={() => setCountOn(true)} onExit={() => setCountOn(false)}>
                {countOn && 
                <CountUp start={0} end={totalUsers} duration={2} delay={0} ></CountUp>}
              </ScrollTrigger>
            </div>
        </div>

        <div className="flex flex-col items-center border p-4 rounded-lg">
            <h3>Total Reviews</h3>
            <div className="font-bold text-4xl">
              <ScrollTrigger onEnter={() => setCountOn(true)} onExit={() => setCountOn(false)}>
                {countOn && 
                <CountUp start={0} end={reviewsCount} duration={2} delay={0} ></CountUp>}
              </ScrollTrigger>
            </div>
        </div>

        <div className="flex flex-col items-center border p-4 rounded-lg">
            <h3>Total Services</h3>
            <div className="font-bold text-4xl">
              <ScrollTrigger onEnter={() => setCountOn(true)} onExit={() => setCountOn(false)}>
                {countOn && 
                <CountUp start={0} end={servicesCount} duration={2} delay={0} ></CountUp>}
              </ScrollTrigger>
            </div>
        </div>
      
    </div>
  );
};

export default CountUpp;

 