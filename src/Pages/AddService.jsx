import { useContext } from "react";
import { AuthContext } from "./../Providers/AuthProvider";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Helmet } from "react-helmet";
import useAxios from "../Hooks/UseAxiosSecure";

const AddService = () => {
  const axiosSecure = useAxios();
  const { user } = useContext(AuthContext);
  const currentDate = new Date().toISOString().split("T")[0];

  const addService = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dataInfo = Object.fromEntries(formData.entries());

    // post data
    try {
      const { data } = await axiosSecure.post(
        `${import.meta.env.VITE_API_URL}/add-service`,
        dataInfo
      );
      toast.success("Service Added Successfully!");
    } catch (err) {
      toast.error(`can't add review ;)`);
    }
  };

  return (
    <div className="p-10 flex items-center">
      <Helmet>
        <title>Judgify | Add Service</title>
      </Helmet>
      <div className="w-full space-y-4">
        <h2 className="text-2xl text-center  font-semibold">Add a Service</h2>
        <div className="max-w-3xl mx-auto ">
          <div className="card dark:bg-gray-800 dark:text-white w-full shrink-0">
            <form onSubmit={addService} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text dark:text-white">
                    Service Image
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="service image"
                  name="service_image"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text dark:text-white">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="title"
                  name="title"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text dark:text-white">
                    Company Name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Company"
                  name="company"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text dark:text-white">Website</span>
                </label>
                <input
                  type="url"
                  placeholder="website"
                  name="website"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text dark:text-white">
                    Description
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="description"
                  name="description"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="flex gap-4 flex-col md:flex-row">
                <div className="form-control md:w-1/2 ">
                  <label className="label">
                    <span className="label-text dark:text-white">Category</span>
                  </label>
                  <input
                    type="text"
                    placeholder="category"
                    name="category"
                    className="input input-bordered  text-black dark:text-black "
                    required
                  />
                </div>
                <div className="form-control md:w-1/2 ">
                  <label className="label">
                    <span className="label-text dark:text-white ">Price</span>
                  </label>
                  <input
                    type="number"
                    placeholder="price"
                    name="price"
                    className="input input-bordered text-black dark:text-black "
                    required
                  />
                </div>
              </div>
              <div className="flex gap-4 flex-col md:flex-row">
                <div className="form-control md:w-1/2 ">
                  <label className="label">
                    <span className="label-text dark:text-white">Date</span>
                  </label>
                  <input
                    type="date"
                    defaultValue={currentDate}
                    placeholder="date"
                    name="date"
                    readOnly
                    className="input input-bordered text-black dark:text-black "
                    required
                  />
                </div>
                <div className="form-control md:w-1/2 ">
                  <label className="label">
                    <span className="label-text dark:text-white">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    defaultValue={user?.email}
                    name="email"
                    readOnly
                    className="input input-bordered  text-black dark:text-black "
                    required
                  />
                </div>
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-gray-900 text-white hover:bg-gray-800">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddService;
