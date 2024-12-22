import { useContext } from "react";
import { AuthContext } from './../Providers/AuthProvider';
import { toast } from 'react-hot-toast';
import axios from 'axios';

 

const AddService = () => {

    const { user } = useContext(AuthContext);
    const currentDate = new Date().toISOString().split('T')[0];
    console.log(currentDate);

    const addService = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const dataInfo = Object.fromEntries(formData.entries());
        console.log(dataInfo);

        // post data
        try{
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/add-service`, dataInfo);
            // console.log(data);
            toast.success('Service Added Successfully!');
        }catch(err){
            toast.error(`${err}`);
        }
    }

    return (
        <div className="p-10 flex items-center" >
            <div className="w-full" >
                <h2 className="text-2xl text-center  font-semibold" >Add a Service</h2>
                <div className="max-w-3xl mx-auto " >
                    <div className="card bg-base-100 w-full shrink-0" >
                        <form  onSubmit={addService} className="card-body">
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">Service Image</span>
                            </label>
                            <input type="text" placeholder="service image" name="service-image" className="input input-bordered" required />
                          </div>
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">Title</span>
                            </label>
                            <input type="text" placeholder="title" name="title" className="input input-bordered" required />
                          </div>
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">Company Name</span>
                            </label>
                            <input type="text" placeholder="Company" name="company" className="input input-bordered" required />
                          </div>
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">Website</span>
                            </label>
                            <input type="url" placeholder="website" name="website" className="input input-bordered" required />
                          </div>
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">Description</span>
                            </label>
                            <input type="text" placeholder="description" name="description" className="input input-bordered" required />
                          </div>
                          <div className="flex gap-4 flex-col md:flex-row" >
                                <div className="form-control md:w-1/2 ">
                                  <label className="label">
                                    <span className="label-text">Category</span>
                                  </label>
                                  <input type="text" placeholder="category" name="category" className="input input-bordered" required />
                                </div>
                                <div className="form-control md:w-1/2 ">
                                  <label className="label">
                                    <span className="label-text">Price</span>
                                  </label>
                                  <input type="number" placeholder="price" name="price" className="input input-bordered" required />
                                </div>
                          </div>
                          <div className="flex gap-4 flex-col md:flex-row" >
                                <div className="form-control md:w-1/2 ">
                                  <label className="label">
                                    <span className="label-text">Date</span>
                                  </label>
                                  <input type="date" defaultValue={currentDate} placeholder="date" name="date" className="input input-bordered" required />
                                </div>
                                <div className="form-control md:w-1/2 ">
                                  <label className="label">
                                    <span className="label-text">Email</span>
                                  </label>
                                  <input type="email" placeholder="email" defaultValue={user?.email}  name="email" className="input input-bordered" required />
                                </div>
                          </div>
                          <div className="form-control mt-6">
                            <button className="btn bg-gray-900 text-white hover:bg-gray-800">Add</button>
                          </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddService;