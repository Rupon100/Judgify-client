// import { Rating } from "@smastrom/react-rating";

 

const ReviewCard = ({ review }) => {
    const { date, message, photo, rtng, userEmail, userName  } = review || {};

    return (
        <div className="bg-gray-700 hover:bg-gray-800 cursor-pointer p-3 rounded-md text-white space-y-2" >
            {/* <p>'{message}'</p> */}
            <p className="text-sm text-gray-300" >{`"${message}"`}</p>
            <p>Rating: {rtng}.0</p>
            <div className="flex items-center gap-2" >
                <img className="h-10 w-10 rounded-full border" src={photo} alt="profile" referrerPolicy="no-referrer" />
                <div>
                  <h3 className="font-semibold text-sm" >{userName}</h3>
                  <small className="text-xs text-gray-300" >Date {date}</small>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;