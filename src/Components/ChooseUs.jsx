import freedom from '../assets/freedom.png';
import experiance from '../assets/experiance.png';
import trust from '../assets/trust.png';
import support from '../assets/technical-support.png';
 
const ChooseUs = () => {
    return (
        <div className='bg-gray-100' >
            <div className="max-w-5xl mx-auto p-4 py-10 m-4 my-10 flex flex-col justify-center items-center space-y-5" >
                <div className="text-center space-y-2 max-w-2xl" >
                   <h3 className="font-semibold text-2xl text-center" >Why Choose Us?</h3>
                   <p>Discover the unparalleled advantages of our Service Review Management System! Designed with users in mind, our platform combines simplicity, speed, and reliability to help businesses enhance their online presence. </p>
                </div>
                <div className='w-full flex flex-col md:flex-row justify-around gap-5' >
                    <div className=' flex-1 border p-3 rounded-xl bg-gray-800 cursor-pointer text-white hover:bg-gray-900' > 
                        <img className='max-w-20' src={freedom} alt="" />
                        <h3 className='font-semibold text-lg' >Freedom to Review</h3>
                        <p className='text-gray-400 text-sm'>Highlights user empowerment and their ability to express opinions openly.</p>
                    </div>
                    <div className=' flex-1 border p-3 rounded-xl bg-gray-800 cursor-pointer text-white hover:bg-gray-900'>
                        <img className='max-w-20' src={experiance} alt="" />
                        <h3>Get the Best Experience</h3>
                        <p className='text-gray-400 text-sm'>Focuses on the platforms ease of use and advanced features.</p>
                    </div>
                    <div className=' flex-1 border p-3 rounded-xl bg-gray-800 cursor-pointer text-white hover:bg-gray-900'>
                        <img className='max-w-20' src={trust} alt="" />
                        <h3>Trusted by Professionals</h3>
                        <p className='text-gray-400 text-sm' >Builds credibility by emphasizing reliability and trust from industry leaders.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChooseUs;