import hero from '../assets/PartnerLogo/hero.png';
import hubSport from '../assets/PartnerLogo/hubspot.png';
import googleReview from '../assets/PartnerLogo/google-reviews.jpg';
import birdEye from '../assets/PartnerLogo/birdeye.png';
import yelp from '../assets/PartnerLogo/yelp.jpg';
import trustPilot from '../assets/PartnerLogo/trustpilot.png';

const MeetPartners = () => {
    return (
        <div className="p-10 flex gap-6 flex-col justify-center items-center" >
            <div className="text-center" >
               <h2 className="font-semibold text-2xl" >Meet Out Partners</h2>
               <p>Our trusted partners empower the Service Review System with cutting-edge tools and expertise, ensuring seamless review management and valuable insights</p>
            </div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3" >
                <div className='space-y-2 bg-slate-200 p-3 rounded-lg' >
                    <img className='w-20 h-20 object-cover' src={hero} alt="herp there" />
                    <h3 className='font-semibold text-xl' >Programming Hero</h3>
                    <p>Programming Hero is an interactive learning platform designed to make coding fun and engaging. It offers hands-on project and a beginner-friendly approach to mastering programming skills.</p>
                </div>
                <div className='space-y-2 bg-slate-200 p-3 rounded-lg ' >
                    <img className='w-20 h-20 object-cover' src={hubSport} alt="hubspot there" />
                    <h3 className='font-semibold text-xl' >HubSpot</h3>
                    <p>HubSpot offers marketing and CRM solutions. Partnering with them could enable businesses to manage reviews alongside customer relationship management.</p>
                </div>
                <div className='flex flex-col gap-2 bg-slate-200 p-3 rounded-lg ' >
                    <img className='w-20 h-20 object-cover' src={googleReview} alt="google review there" />
                    <div className='flex-1' >
                       <h3 className='font-semibold text-xl' >Google Reviews</h3>
                       <p>Google Reviews is a widely used platform for customer feedback, and partnering with them can help fetch and display authenticated reviews from Google My Business profiles.</p>
                    </div>
                </div>
                <div className='space-y-2 bg-slate-200 p-3 rounded-lg ' >
                    <img className='w-20 h-20 object-cover' src={birdEye} alt="bird eye there" />
                    <h3 className='font-semibold text-xl' >BirdEye</h3>
                    <p>BirdEye is a reputation management platform. They specialize in review monitoring and analytics, making them an ideal partner for advanced review insights.</p>
                </div>
                <div className='space-y-2 bg-slate-200 p-3 rounded-lg ' >
                    <img className='w-20 h-20 object-cover' src={yelp} alt="yelp there" />
                    <h3 className='font-semibold text-xl' >Yelp</h3>
                    <p>Yelp specializes in local business reviews. Collaborating with Yelp would allow you to display their reviews and ratings within your system, enriching your data sources.</p>
                </div>
                <div className='space-y-2 bg-slate-200 p-3 rounded-lg ' >
                    <img className='w-20 h-20 object-cover' src={trustPilot} alt="herp there" />
                    <h3 className='font-semibold text-xl' >Trustpilot</h3>
                    <p >Trustpilot is a leading review platform that allows businesses to collect and showcase customer feedback. Integration with their API can add credibility and a broader reach.</p>
                </div>
            </div>
        </div>
    );
};

export default MeetPartners;