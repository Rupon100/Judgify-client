import review3 from "../assets/review-2-removebg-preview.png";

const Slide3 = () => {
  return (
    <div className="p-10 min-h-screen flex justify-center items-center">
      <div className="flex flex-col text-center md:text-left md:flex-row justify-between items-center gap-4">
        <div className="space-y-2">
          <h2 className="font-semibold text-3xl ">Freedom to Express</h2>
          <p>
            Share your experiences openly and honestly, because every voice
            matters.
          </p>
        </div>
        <div>
          <img
            className="max-w-[400px] rounded-xl max-h-300 object-cover"
            src={review3}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Slide3;
