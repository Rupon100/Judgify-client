import review1 from '../assets/review1.jpg';

const Slide1 = () => {
    return (
        <div className='p-10 min-h-screen flex flex-col md:flex-row justify-between items-center gap-4'>
            <div className='space-y-2' >
                <h2 className='font-semibold text-3xl' >Discover Excellence</h2>
                <p>Explore top-notch services tailored to meet your needs with unmatched quality and trust.</p>
            </div>
            <div>
                <img className='max-w-[400px]' src={review1} alt="" />
            </div>
        </div>
    );
};

export default Slide1;