import Banner from "./Banner";
import ChooseUs from "./ChooseUs";
import Faq from "./Faq";
import Features from "./Features";
import MeetPartners from "./MeetPartners";
import { motion, useSpring, useScroll } from "motion/react"

 
const Home = () => {

    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    return (
        <div>

            <motion.div
                id="scroll-indicator"
                style={{
                    scaleX,
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 6,
                    originX: 0,
                    backgroundColor: "#333634",
                }}
            />

            {/* banenr swiper js */}
            <Banner></Banner>
            {/* featured section */}
            <Features></Features>
            {/* meet out partners */}
            <MeetPartners></MeetPartners>
            {/* choose us */}
            <ChooseUs></ChooseUs>
            {/* faq section */}
            <Faq></Faq>
        </div>
    );
};

export default Home;