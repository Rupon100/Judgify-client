import review1 from "../assets/review1-removebg-preview.png";

const Slide1 = () => {
  return (
    <div className="p-10 min-h-screen flex justify-center items-center ">
      <div className="flex text-center md:text-left  flex-col md:flex-row justify-between items-center gap-4">
        <div className="space-y-2">
          <h2 className="font-semibold text-3xl">Discover Excellence</h2>
          <p>
            Explore top-notch services tailored to meet your needs with
            unmatched quality and trust.
          </p>
        </div>
        <div>
          <img
            className="max-w-[400px] rounded-xl h-300 object-cover"
            src={review1}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Slide1;
