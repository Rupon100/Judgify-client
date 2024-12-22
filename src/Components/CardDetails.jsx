import { useLoaderData, useParams } from "react-router-dom";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { useState } from "react";

const CardDetails = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    const [rating, setRating] = useState(3);
    const id = useParams();
    const loadedData = useLoaderData();
    // console.log(rating);

    const {category, company, date, description, email, price, service_image, title, website} = loadedData || {};

    const handleReviewAdd = (e) => {
        e.preventDefault();
        const form = e.target;
        const message = form.review.value;
        const date = currentDate;
        const rtng = rating;

        const review = { serviceId: id, serviceOwner: email,message, date, rtng };
        console.log(review)

    }

    return (
        <div>
            <div className="max-w-5xl mx-auto p-4 m-4 flex flex-col gap-4 border" >
                <div>
                    <img className="object-cover object-center h-[400px] w-full rounded " src={service_image} alt="" />
                </div>
                <div className="space-y-3 flex flex-col justify-start items-start w-4/5" >
                    <h3 className="font-semibold text-2xl md:text-4xl" >{title}</h3>
                    <p>{description}</p>
                    <p className="font-semibold" >Price: ${price}</p>
                    <p>Company Name: <span className="font-semibold text-lg" >{company}</span></p>
                    <p>Category: <span className="text-sm p-1 border rounded-lg"> {category}</span></p>
                    <p>Email: {email}</p>
                    <a href={website}>{website}</a>
                    <h4 className="font-semibold text-lg" >Total Review: 0</h4>
                </div>
                <div className="border rounded-lg w-full p-4">
                   <form onSubmit={handleReviewAdd} className="max-w-2xl mx-auto space-y-3" >
                        <textarea className="textarea textarea-bordered resize-none w-full " name="review" placeholder="write some review" required></textarea>
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
                             <input type="date" defaultValue={currentDate} disabled placeholder="date" name="date" className="input input-bordered" required />
                         </div>
                        <button className="btn bg-gray-800 hover:bg-gray-700 text-white" >Add Review</button>
                   </form>
                </div>
            </div>
        </div>
    );
};

export default CardDetails;