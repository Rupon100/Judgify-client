import review2 from '../assets/review-2.jpg';

const Slide2 = () => {
    return (
        <div className='p-10 min-h-screen flex flex-col md:flex-row justify-between items-center gap-4'>
            <div className='space-y-2' >
                <h2 className='font-semibold text-3xl' >Share Your Voice</h2>
                <p>Join our community to share honest reviews and make your opinion count.</p>
            </div>
            <div>
                <img className='max-w-[400px] rounded-xl h-300 object-cover' src={review2} alt="" />
            </div>
        </div>
    );
};

export default Slide2;