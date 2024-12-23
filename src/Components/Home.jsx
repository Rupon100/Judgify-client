import Banner from "./Banner";
import ChooseUs from "./ChooseUs";
import Faq from "./Faq";
import Features from "./Features";
import MeetPartners from "./MeetPartners";

 
const Home = () => {
    return (
        <div>
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