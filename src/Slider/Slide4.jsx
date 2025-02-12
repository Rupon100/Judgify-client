import review2 from "../assets/services-removebg-preview.png";

const Slide4 = () => {
  return (
    <div className="p-10 min-h-screen flex justify-center items-center ">
      <div className="flex flex-col text-center md:text-left  md:flex-row md:justify-between items-center gap-4">
        <div className="space-y-2">
          <h2 className="font-semibold text-3xl">Exceptional Services</h2>
          <p>
            Become a part of our community and contribute valuable reviews to
            help others make informed decisions.
          </p>
        </div>
        <div className="">
          <img
            className="max-w-[400px] rounded-xl h-300 object-cover"
            src={review2}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Slide4;
