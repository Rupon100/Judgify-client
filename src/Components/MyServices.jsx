import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { Helmet } from "react-helmet";


const MyServices = () => {
    const [services, setServices] = useState([]);
    const [editService, setEditService] = useState([]);
    const [serviceId, setServiceId] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchAll();
    }, [])


    const fetchAll = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/my-services/?email=${user?.email}`);
        setServices(data);
    }

    const handleSearch = (e) => {
      const searchValue = e.target.value.toLowerCase(); 
      console.log(searchValue)

      if(!searchValue){
        fetchAll();
      }else {
        const filter = services.filter(service => service.title.includes(searchValue));
        setServices(filter)
        console.log(filter)
      }

    }

  
    // edit service
    const handleEdit = async (id) => {
        console.log(id);
        setServiceId(id);
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/my-service/${id}`);
        setEditService(data[0])
    }
    
    const handleUpdateService = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const dataInfo = Object.fromEntries(formData.entries());

        try{
            const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/update-service/${serviceId}`, dataInfo);
            console.log(data);
            fetchAll();
            document.getElementById('my_modal_4').close();
            return toast.success('Update Successfully!');
        }catch(err){
            toast.error(`${err}`)
        }
    }

    const handleDelt = async (id) => {
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
            const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/delete-servie/${id}`);
            console.log(data)
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
        <div className="flex flex-col gap-6 p-4 m-4">
          <Helmet>
            <title>Judgify | My Service</title>
          </Helmet>
            <div className="max-w-xl mx-auto" >
                <label className="input input-bordered flex items-center gap-2">
                  <input onChange={(e) => handleSearch(e)} type="text" className="grow" placeholder="Search" />
                </label>
            </div>
           
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                      <tr>
                        <th></th>
                        <th>Company</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                        {
                            services.map((service,i) => (
                                <tr key={service._id} >
                                   <th>{i+1}</th>
                                   <td>{service.company}</td>
                                   <td>{service.title}</td>
                                   <td>{service.description.slice(0,7)}...</td> 
                                   <td>{service.category}</td>
                                   <td>{service.price}</td>
                                   {/* edit button */}
                                   <td>
                                      {/* <button className="btn" onClick={()=>document.getElementById('my_modal_4').showModal()}>open modal</button> */}
                                      <button onClick={() => {
                                        handleEdit(service._id);
                                        document.getElementById('my_modal_4').showModal()
                                      }} >
                                        <FaEdit />
                                      </button>
                                    </td>
                                   {/* delete button */}
                                   <td><button onClick={() => handleDelt(service._id)} ><FaRegTrashAlt /></button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                  </table>
            </div>
            
            <dialog id="my_modal_4" className="modal">
              <div className="modal-box w-11/12 max-w-5xl flex flex-col justify-center items-center overflow-y-auto ">
                <div className="w-full">
                    <div className="card bg-base-100 w-full shrink-0" >
                        <form onSubmit={handleUpdateService} className="card-body">
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">Service Image</span>
                            </label>
                            <input type="text" defaultValue={editService?.service_image} placeholder="service image" name="service_image" className="input input-bordered" required />
                          </div>
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">Title</span>
                            </label>
                            <input type="text" defaultValue={editService?.title} disabled placeholder="title" name="title" className="input input-bordered" required />
                          </div>
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">Company Name</span>
                            </label>
                            <input type="text" defaultValue={editService?.company} placeholder="Company" name="company" className="input input-bordered" required />
                          </div>
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">Website</span>
                            </label>
                            <input type="url" defaultValue={editService?.website} placeholder="website" name="website" className="input input-bordered" required />
                          </div>
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">Description</span>
                            </label>
                            <input type="text" defaultValue={editService?.description} placeholder="description" name="description" className="input input-bordered" required />
                          </div>
                          <div className="flex gap-4 flex-col md:flex-row" >
                                <div className="form-control md:w-1/2 ">
                                  <label className="label">
                                    <span className="label-text">Category</span>
                                  </label>
                                  <input type="text" defaultValue={editService?.category} placeholder="category" name="category" className="input input-bordered" required />
                                </div>
                                <div className="form-control md:w-1/2 ">
                                  <label className="label">
                                    <span className="label-text">Price</span>
                                  </label>
                                  <input type="number" defaultValue={editService?.price} placeholder="price" name="price" className="input input-bordered" required />
                                </div>
                          </div>
                          <div className="flex gap-4 flex-col md:flex-row" >
                                <div className="form-control md:w-1/2 ">
                                  <label className="label">
                                    <span className="label-text">Date</span>
                                  </label>
                                  <input type="date" defaultValue={editService?.date}  placeholder="date" name="date" className="input input-bordered" required />
                                </div>
                                <div className="form-control md:w-1/2 ">
                                  <label className="label">
                                    <span className="label-text">Email</span>
                                  </label>
                                  <input type="email" placeholder="email" defaultValue={user?.email} disabled  name="email" className="input input-bordered" required />
                                </div>
                          </div>
                          <div className="form-control mt-6">
                            <button  className="btn bg-gray-900 text-white hover:bg-gray-800">Update</button>
                            <div className="divider"></div>
                            <div className="modal-action flex justify-center -mt-2 items-center w-full">
                              <form method="dialog">
                                <button className="btn btn-block bg-gray-900 text-white hover:bg-gray-800">Cancle</button>
                              </form>
                            </div>
                            {/* <button type="button" className="btn bg-gray-900 text-white hover:bg-gray-800">Cancle</button> */}
                          </div>
                        </form>
                    </div>
                </div>
              </div>
            </dialog>

        </div>
    );
};

export default MyServices;

 