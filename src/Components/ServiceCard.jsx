import axios from 'axios';
import { Link } from 'react-router-dom';

const ServiceCard = ({ service }) => {
    const { _id ,service_image , title, description, category, price } = service || {};

    return (
        <div>
            <div className="space-y-2 border" >
                <img className="w-full h-[200px] object-cover " src={service_image} alt="service image" />
                <div className="space-y-2 flex flex-col justify-start items-start p-4 flex-1 " >
                    <h3 className="font-semibold text-lg" >{title}</h3>
                    <p>{description.slice(0,20)}.....</p>
                    <p className="p-1 border rounded-lg bg-gray-100 text-sm" >{category}</p>
                    <h4 className="font-semibold" >Price: ${price}</h4>
                    <Link to={`/service-details/${_id}`} className="btn text-white bg-gray-800 hover:bg-gray-700" >See Details</Link>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;