import Banner from "./Banner";
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
            {/* two more releavent section */}
            
        </div>
    );
};

export default Home;