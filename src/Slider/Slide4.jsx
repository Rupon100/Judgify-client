import review2 from '../assets/services.jpg'; 

const Slide4 = () => {
      return (
             <div className='p-10 min-h-screen flex flex-col md:flex-row justify-between items-center gap-4'>
                 <div className='space-y-2' >
                     <h2 className='font-semibold text-3xl' >Exceptional Services</h2>
                     <p>Become a part of our community and contribute valuable reviews to help others make informed decisions.</p>
                 </div>
                 <div>
                     <img className='max-w-[400px]' src={review2} alt="" />
                 </div>
             </div>
         );
};

export default Slide4;