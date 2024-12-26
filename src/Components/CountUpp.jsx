import axios from "axios";
import { useEffect, useState, useRef } from "react";
import CountUp from "react-countup";

const CountUpp = () => {
  const [reviewsCount, setReviewsCount] = useState(0);
  const [servicesCount, setServicesCount] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  const countUpRefs = useRef([]);

  useEffect(() => {

    fetchAll();

    const handleScroll = () => {
      if (!hasAnimated) {
        const isInView = countUpRefs.current.some((ele) => {
          if (!ele) return false;
          const rect = ele.getBoundingClientRect();
          return rect.top < window.innerHeight && rect.bottom > 0;
        });
        if (isInView) {
          setHasAnimated(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();  

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };


  }, [hasAnimated]);


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

      <div
        ref={(ele) => (countUpRefs.current[0] = ele)}
        className="text-center border p-3 rounded"
      >
        <h3>Total Users</h3>
        <div className="font-bold text-4xl">
          {hasAnimated && (
            <CountUp start={0} end={totalUsers} duration={2}>
              {({ countUpRef }) => <span ref={countUpRef} />}
            </CountUp>
          )}
        </div>
      </div>

      <div
        ref={(ele) => (countUpRefs.current[1] = ele)}
        className="text-center border p-3 rounded">
        <h3>Total Reviews</h3>
        <div className="font-bold text-4xl">
          {hasAnimated && (
            <CountUp start={0} end={reviewsCount} duration={2}>
              {({ countUpRef }) => <span ref={countUpRef} />}
            </CountUp>
          )}
        </div>
      </div>

      <div
        ref={(ele) => (countUpRefs.current[2] = ele)}
        className="text-center border p-3 rounded">
        
        <h3>Total Services</h3>
        <div className="font-bold text-4xl">
          {hasAnimated && (
            <CountUp start={0} end={servicesCount} duration={2}>
              {({ countUpRef }) => <span ref={countUpRef} />}
            </CountUp>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountUpp;
