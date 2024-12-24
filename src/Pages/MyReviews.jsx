import { useContext, useEffect, useState } from "react";
import { AuthContext } from './../Providers/AuthProvider';
import axios from 'axios';
import { Rating } from "@smastrom/react-rating";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { Helmet } from "react-helmet";

const MyReviews = () => {
    const [reviews, setReviews] = useState([]);
    const { user } = useContext(AuthContext);
    const [rating, setRating] = useState(0);
    const [selectedReviewId, setSelectedReviewId] = useState(null);
    const [temporaryRating, setTemporaryRating] = useState(null);

    useEffect(() => {
        fetchAll();
    }, []);

    const fetchAll = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/reviews/${user?.email}`);
        setReviews(data);
    }

    const handleEdit = async(e) => {
        e.preventDefault();
        const form = e.target;
        const message  = form.message.value;
        const editRating = rating;

        const updateInfo = {message, editRating};
        
        try{
            const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/reviews/${selectedReviewId}`, updateInfo);
          
            fetchAll();
            document.getElementById('my_modal_4').close();
            return toast.success('Update Successfully!');
        }catch(err){
            toast.error(`${err}`);
        }
        
    }

    const handleDelete = async (id) => {
        try{
            Swal.fire({
              title: "Are you sure you want to delete this service?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Yes, delete it!",
              cancelButtonText: "No, cancel!",
            }).then(async (result) => {
              if (result.isConfirmed) {
                const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/reviews/${id}`);
              
                if (data.deletedCount) {
                  Swal.fire("Deleted!", "Your service has been deleted.", "success");
                  fetchAll(); 
                } else {
                  Swal.fire("Error", "Failed to delete the service.", "error");
                }
              } 
            });
          }catch(err){
            toast(`${err}`)
          }
    }

    return (
        <div className="p-4 m-4 max-w-5xl mx-auto space-y-5 " >
          <Helmet>
            <title>Judgify | My Reviews</title>
          </Helmet>
            <h2 className="font-semibold text-2xl text-center">Your Reviews</h2>
            <div className="grid grid-cols-1 w-full " >
                {
                    reviews.map(review => (
                        <div className=" flex justify-between items-center border rounded-lg mb-3 px-4 py-2  bg-gray-900 cursor-pointer hover:bg-gray-800 text-white" key={review._id} >
                            <div className="space-y-2" >
                                <h2 className="font-semibold text-xl" >{review.title}</h2>
                                <p className="text-gray-400" >{`"${review.message}"`}</p>
                                <h4>
                                    <Rating
                                      style={{ maxWidth: 180 }}
                                      value={review.rtng}
                                      readOnly
                                    />
                                </h4>
                            </div>
                            <div className="space-x-3" >
                                <button onClick={() => {
                                    setSelectedReviewId(review._id)
                                   document.getElementById('my_modal_4').showModal()
                                 }} >
                                   <FaEdit />
                                 </button>  

                                <button onClick={() => handleDelete(review._id)}>
                                    <FaRegTrashAlt />
                                </button>
                            </div>

                            <dialog id="my_modal_4" className="modal">
                                <div className="modal-box w-11/12 max-w-5xl flex flex-col justify-center items-center overflow-y-auto ">
                                  <div className="w-full">
                                      <div className="card bg-base-100 w-full shrink-0" >
                                          <form onSubmit={handleEdit} className="card-body">                      
                                            <div className="form-control">
                                              <label className="label">
                                                <span className="label-text">Review</span>
                                              </label>
                                              <input type="text" defaultValue={review.message} placeholder="description" name="message" className="input input-bordered text-black" required />
                                            </div>

                                            <div>
                                               <label>Rating: </label>
                                               <Rating
                                                 style={{ maxWidth: 180 }}
                                                 value={temporaryRating ?? review.rtng}
                                                 onChange={(value) =>{
                                                  setTemporaryRating(value);
                                                  setRating(value);
                                                 }
                                                 }
                                                 required
                                               />
                                            </div>
                                             
                                            
                                            <div className="form-control mt-6">
                                              <button  className="btn bg-gray-900 text-white hover:bg-gray-800">Update</button>
                                              <div className="divider"></div>
                                              <div className="modal-action flex justify-center -mt-2 items-center w-full">
                                                <form method="dialog">
                                                  <button className="btn btn-block bg-gray-900 text-white hover:bg-gray-800">Cancle</button>
                                                </form>
                                              </div>
                                            </div>
                                          </form>
                                      </div>
                                  </div>
                                </div>
                            </dialog>
                        </div>
                    ))
                }

              
            </div>
        </div>
    );
};

export default MyReviews;