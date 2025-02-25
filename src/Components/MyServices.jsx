import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { Helmet } from "react-helmet";
import Loading from "./Loading";
import useAxios, { axiosInstance } from "../Hooks/UseAxiosSecure";

const MyServices = () => {
  const axiosSecure = useAxios();
  const [services, setServices] = useState([]);
  const [editService, setEditService] = useState([]);
  const [serviceId, setServiceId] = useState(null);
  const { user } = useContext(AuthContext);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [upid, setUpId] = useState(null);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setIsLoading(true);
    try {
      const { data } = await axiosSecure.get(
        `/my-services/?email=${user?.email}`,
        {
          withCredentials: true,
        }
      );
      setServices(data);
    } catch (err) {
      // toast.error("Failed to fetch services. Please try again!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setIsSearching(true);

    if (!searchValue) {
      fetchAll();
    } else {
      const filter = services.filter((service) =>
        service.title.includes(searchValue)
      );
      setServices(filter);
    }
  };

  // edit service
  const handleEdit = async (id) => {
    setUpId(id);
    setEditService(null);
    setServiceId(id);
    const { data } = await axiosSecure.get(
      `${import.meta.env.VITE_API_URL}/my-service/${id}`
    );
    setEditService(data[0]);
  };

  const handleUpdateService = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dataInfo = Object.fromEntries(formData.entries());

    try {
      const { data } = await axiosSecure.put(
        `${import.meta.env.VITE_API_URL}/update-service/${serviceId}`,
        dataInfo
      );
      fetchAll();
      setEditService(null);
      document.getElementById(`my_modal_${upid}`).close();
      return toast.success("Update Successfully!");
    } catch (err) {
      toast.error(`Sorry can't update ;)`);
    }
  };

  const handleDelt = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure you want to delete this service?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await axiosSecure.delete(
            `${import.meta.env.VITE_API_URL}/delete-servie/${id}`
          );
          if (data.deletedCount) {
            Swal.fire("Deleted!", "Your service has been deleted.", "success");
            fetchAll();
          } else {
            Swal.fire("Error", "Failed to delete the service.");
          }
        }
      });
    } catch (err) {
      toast(`${err}`);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4 m-4">
      <Helmet>
        <title>Judgify | My Service</title>
      </Helmet>
      <div className="max-w-xl mx-auto">
        <label className="input input-bordered flex items-center gap-2">
          <input
            onChange={(e) => handleSearch(e)}
            type="text"
            className="grow"
            placeholder="Search"
          />
        </label>
      </div>

      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px] w-full">
            <Loading />
          </div>
        ) : services.length === 0 ? (
          <div className="col-span-3 font-semibold text-xl text-center text-gray-500">
            No Data Found.
          </div>
        ) : (
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th className="dark:text-white" >Company</th>
                <th className="dark:text-white" >Title</th>
                <th className="dark:text-white" >Description</th>
                <th className="dark:text-white" >Category</th>
                <th className="dark:text-white" >Price</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, i) => (
                <tr key={service._id}>
                  <th>{i + 1}</th>
                  <td>{service.company}</td>
                  <td>{service.title}</td>
                  <td>{service.description.slice(0, 7)}...</td>
                  <td>{service.category}</td>
                  <td>{service.price}</td>
                  {/* edit button */}
                  <td>
                    <button
                      onClick={() => {
                        handleEdit(service._id);
                        document
                          .getElementById(`my_modal_${service._id}`)
                          .showModal();
                      }}
                    >
                      <FaEdit />
                    </button>
                  </td>
                  {/* delete button */}
                  <td>
                    <button onClick={() => handleDelt(service._id)}>
                      <FaRegTrashAlt />
                    </button>
                  </td>
                  <dialog id={`my_modal_${service._id}`} className="modal">
                    <div className="modal-box w-11/12 max-w-5xl flex flex-col justify-center items-center overflow-y-auto dark:bg-gray-800 dark:text-white  ">
                      <div className="w-full h-[600px] mt-20 lg:mt-0">
                        <div className="card dark:bg-gray-800 dark:text-black  w-full shrink-0">
                          <form
                            onSubmit={handleUpdateService}
                            className="card-body"
                          >
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text dark:text-white">
                                  Service Image
                                </span>
                              </label>
                              <input
                                type="text"
                                defaultValue={editService?.service_image}
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
                                defaultValue={editService?.title}
                                disabled
                                placeholder="title"
                                name="title"
                                className="input input-bordered"
                                required
                              />
                            </div>
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text dark:text-white">Company Name</span>
                              </label>
                              <input
                                type="text"
                                defaultValue={editService?.company}
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
                                defaultValue={editService?.website}
                                placeholder="website"
                                name="website"
                                className="input input-bordered"
                                required
                              />
                            </div>
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text dark:text-white">Description</span>
                              </label>
                              <input
                                type="text"
                                defaultValue={editService?.description}
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
                                  defaultValue={editService?.category}
                                  placeholder="category"
                                  name="category"
                                  className="input input-bordered"
                                  required
                                />
                              </div>
                              <div className="form-control md:w-1/2 ">
                                <label className="label">
                                  <span className="label-text dark:text-white">Price</span>
                                </label>
                                <input
                                  type="number"
                                  defaultValue={editService?.price}
                                  placeholder="price"
                                  name="price"
                                  className="input input-bordered"
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
                                  defaultValue={editService?.date}
                                  placeholder="date"
                                  name="date"
                                  className="input input-bordered"
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
                                  disabled
                                  name="email"
                                  className="input input-bordered"
                                  required
                                />
                              </div>
                            </div>
                            <div className="form-control mt-6">
                              <button className="btn bg-gray-900 text-white hover:bg-gray-800">
                                Update
                              </button>
                              <div className="divider"></div>
                              <div className="modal-action flex justify-center -mt-2 items-center w-full">
                                <form method="dialog">
                                  <button className="btn btn-block bg-gray-900 text-white hover:bg-gray-800">
                                    Cancle
                                  </button>
                                </form>
                              </div>
                              {/* <button type="button" className="btn bg-gray-900 text-white hover:bg-gray-800">Cancle</button> */}
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </dialog>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyServices; 