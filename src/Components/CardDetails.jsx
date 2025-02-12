import { useLoaderData, useParams } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../Providers/AuthProvider";
import ReviewCard from "./ReviewCard";
import { Helmet } from "react-helmet";
import useAxios from "../Hooks/UseAxiosSecure";

const CardDetails = () => {
  const axiosSecure = useAxios();
  const { user } = useContext(AuthContext);
  const currentDate = new Date().toISOString().split("T")[0];
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();
  const loadedData = useLoaderData();

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    const { data } = await axiosSecure.get(
      `${import.meta.env.VITE_API_URL}/reviewss/${id}`
    );
    setReviews(data);
  };

  const {
    category,
    company,
    description,
    email,
    price,
    service_image,
    title,
    website,
  } = loadedData || {};
  const handleReviewAdd = async (e) => {
    e.preventDefault();
    const form = e.target;
    const message = form.review.value;
    const date = currentDate;
    const rtng = rating;
    const userEmail = user?.email;
    const userName = user?.displayName;
    const photo = user?.photoURL;

    const review = {
      id,
      message,
      date,
      rtng,
      userEmail,
      userName,
      photo,
      title,
    };

    try {
      const { data } = await axiosSecure.post(
        `${import.meta.env.VITE_API_URL}/add-review`,
        review
      );
      if (data.insertedId) {
        fetchAll();
        form.reset();
        return toast.success("Review Added!");
      }
    } catch (err) {
      return toast.error(`can't add review ;)`);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Judgify | Details</title>
      </Helmet>
      <div className="max-w-5xl mx-auto p-4 m-4 flex flex-col gap-4">
        {/* details image */}
        <div>
          <img
            className="object-cover object-center h-[400px] w-full rounded "
            src={service_image}
            alt=""
          />
        </div>
        {/* details here */}
        <div className="space-y-3 flex flex-col justify-start items-start w-4/5">
          <h3 className="font-semibold text-2xl md:text-4xl">{title}</h3>
          <div className="flex justify-center items-center gap-2" >
            <p>
              <span className="font-semibold text-xl md:text2xl">{company}</span>
            </p>
            <p>
              <span className="text-sm border rounded-lg bg-gray-50/10">
                {category}
              </span>
            </p>
          </div>
          <p className="font-semibold text-2xl">${price}</p>
          <p>User: {email}</p>
          <a
            href={website}
            className="text-blue-600 visited:text-purple-600 p-1 rounded-lg border border-blue-600 visited:border-purple-600 text-sm"
          >
            {website}
          </a>
          <p className="text-gray-700 text-base leading-relaxed">
            {description}
          </p>
        </div>
        <hr />
        {/* review form */}
        <div className="space-y-2">
          <h3 className="text-xl md:text-2xl font-semibold">Leave a Review</h3>
          <form
            onSubmit={handleReviewAdd}
            className="max-w-2xl space-y-3 flex flex-col justify-start items-start"
          >
            <textarea
              className="textarea textarea-bordered resize-none w-full "
              name="review"
              placeholder="write some review"
              required
            ></textarea>
            <div>
              <label>Rating: </label>
              <Rating
                style={{ maxWidth: 180 }}
                value={rating}
                onChange={setRating}
                required
              />
            </div>
            <div className="form-control w-1/2 my-2">
              <input
                type="date"
                defaultValue={currentDate}
                disabled
                placeholder="date"
                name="date"
                className="input input-bordered"
                required
              />
            </div>
            <button className="btn bg-gray-800 hover:bg-gray-700 text-white">
              Add Review
            </button>
          </form>
        </div>
        {/* all reviews */}
        <div>
          <div className="flex w-full flex-col">
            <div className="divider">
              <h3 className="font-semibold text-lg">
                All Reviews of this Services({reviews.length})
              </h3>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {reviews.map((review) => (
              <ReviewCard key={review._id} review={review}></ReviewCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
