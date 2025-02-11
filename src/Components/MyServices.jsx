// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../Providers/AuthProvider";
// import { FaRegTrashAlt } from "react-icons/fa";
// import { FaEdit } from "react-icons/fa";
// import toast from "react-hot-toast";
// import Swal from "sweetalert2/dist/sweetalert2.js";
// import "sweetalert2/src/sweetalert2.scss";
// import { Helmet } from "react-helmet";
// import Loading from "./Loading";
// import useAxios  from "../Hooks/UseAxiosSecure";

// const MyServices = () => {
//   const axiosSecure = useAxios();
//   const [services, setServices] = useState([]);
//   const [editService, setEditService] = useState([]);
//   const [serviceId, setServiceId] = useState(null);
//   const { user } = useContext(AuthContext);
//   const [isSearching, setIsSearching] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [upid, setUpId] = useState(null)
//   const [selectedService, setSelectedService] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);


//   useEffect(() => {
//     fetchAll();
//   }, []);

//   const fetchAll = async () => {
//     setIsLoading(true);
//     try {
//       const { data } = await axiosSecure.get(
//         `/my-services?email=${user?.email}`,
//         {
//           withCredentials: true,
//         }
//       );
//       setServices(data);
//     } catch (err) {
//       // toast.error("Failed to fetch services. Please try again!");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSearch = (e) => {
//     const searchValue = e.target.value.toLowerCase();
//     setIsSearching(true);

//     if (!searchValue) {
//       fetchAll();
//     } else {
//       const filter = services.filter((service) =>
//         service.title.includes(searchValue)
//       );
//       setServices(filter);
//     }
//   };

//   // edit service
//   const handleEdit = async (service) => {
//     setIsModalOpen(true);
//     setSelectedService(service);
//     setUpId(service?._id);
//     setEditService(null);
//     setServiceId(service?._id);
//     const { data } = await axiosSecure.get(
//       `${import.meta.env.VITE_API_URL}/my-service/${service?._id}`
//     );
//     setEditService(data[0]);
//   };

//   const handleUpdateService = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const dataInfo = Object.fromEntries(formData.entries());

//     try {
//       const { data } = await axiosSecure.put(
//         `${import.meta.env.VITE_API_URL}/update-service/${serviceId}`,
//         dataInfo
//       );
//       fetchAll();
//       setEditService(null);
//       document.getElementById(`my_modal_${upid}`).close();
//       return toast.success("Update Successfully!");
//     } catch (err) {
//       toast.error(`Sorry can't update ;)`);
//     }
//   };

//   const handleDelt = async (id) => {
//     try {
//       Swal.fire({
//         title: "Are you sure you want to delete this service?",
//         text: "You won't be able to revert this!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonText: "Yes, delete it!",
//         cancelButtonText: "No, cancel!",
//       }).then(async (result) => {
//         if (result.isConfirmed) {
//           const { data } = await axiosSecure.delete(
//             `${import.meta.env.VITE_API_URL}/delete-servie/${id}`
//           );
//           if (data.deletedCount) {
//             Swal.fire("Deleted!", "Your service has been deleted.", "success");
//             fetchAll();
//           } else {
//             Swal.fire("Error", "Failed to delete the service.");
//           }
//         }
//       });
//     } catch (err) {
//       toast(`${err}`);
//     }
//   };

//   return (
//     <div className="flex flex-col gap-6 p-4 m-4">
//       <Helmet>
//         <title>Judgify | My Service</title>
//       </Helmet>
//       <div className="max-w-xl mx-auto">
//         <label className="input input-bordered flex items-center gap-2">
//           <input
//             onChange={(e) => handleSearch(e)}
//             type="text"
//             className="grow"
//             placeholder="Search"
//           />
//         </label>
//       </div>

//       <div className="overflow-x-auto">
//         {isLoading ? (
//           <div className="flex justify-center items-center min-h-[200px] w-full">
//             <Loading />
//           </div>
//         ) : services.length === 0 ? (
//           <div className="col-span-3 font-semibold text-xl text-center text-gray-500">
//             No Data Found.
//           </div>
//         ) : (
//           <table className="table">
//             {/* head */}
//             <thead>
//               <tr>
//                 <th></th>
//                 <th>Company</th>
//                 <th>Title</th>
//                 <th>Description</th>
//                 <th>Category</th>
//                 <th>Price</th>
//               </tr>
//             </thead>
//             <tbody>
//               {services.map((service, i) => (
//                 <tr key={service._id}>
//                   <th>{i + 1}</th>
//                   <td>{service.company}</td>
//                   <td>{service.title}</td>
//                   <td>{service.description.slice(0, 7)}...</td>
//                   <td>{service.category}</td>
//                   <td>{service.price}</td>
//                   {/* edit button */}
//                   <td>
//                     {/* <button className="btn" onClick={()=>document.getElementById('my_modal_4').showModal()}>open modal</button> */}
//                     <button
//                       onClick={() => {
//                         handleEdit(service);
//                         document
//                           .getElementById(`my_modal_${service._id}`)
//                           .showModal();
//                       }}
//                     >
//                       <FaEdit />
//                     </button>
//                   </td>
//                   {/* delete button */}
//                   <td>
//                     <button onClick={() => handleDelt(service._id)}>
//                       <FaRegTrashAlt />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//       {isModalOpen && selectedService && (
//         <dialog open className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
//           <div className="bg-white p-6 rounded shadow-lg">
//             <h2 className="text-xl font-bold mb-4">Edit Service</h2>
//             <input
//               type="text"
//               value={selectedService.name}
//               onChange={(e) => setSelectedService({ ...selectedService, name: e.target.value })}
//               className="border p-2 w-full mb-2"
//             />
//             <input
//               type="number"
//               value={selectedService.price}
//               onChange={(e) => setSelectedService({ ...selectedService, price: e.target.value })}
//               className="border p-2 w-full mb-4"
//             />
//             <div className="flex justify-end gap-2">
//               <button onClick={() => setIsModalOpen(false)} className="bg-gray-400 text-white px-4 py-2 rounded">
//                 Cancel
//               </button>
//               <button className="bg-blue-500 text-white px-4 py-2 rounded">
//                 Save
//               </button>
//             </div>
//           </div>
//         </dialog>
//       )}
//     </div>
//   );
// };

// export default MyServices;
















import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { Helmet } from "react-helmet";
import Loading from "./Loading";
import useAxios from "../Hooks/UseAxiosSecure";

const MyServices = () => {
  const axiosSecure = useAxios();
  const [services, setServices] = useState([]);
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setIsLoading(true);
    try {
      const { data } = await axiosSecure.get(`/my-services?email=${user?.email}`);
      setServices(data);
    } catch (err) {
      toast.error("Failed to fetch services.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search functionality
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    if (!searchValue) {
      fetchAll();
    } else {
      const filteredServices = services.filter((service) =>
        service.title.toLowerCase().includes(searchValue)
      );
      setServices(filteredServices);
    }
  };

  // Handle edit button click
  const handleEdit = async (service) => {
    setSelectedService(service); // Store full service object
    setIsModalOpen(true);
  };

  // Handle updating the service
  const handleUpdateService = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosSecure.put(
        `${import.meta.env.VITE_API_URL}/update-service/${selectedService._id}`,
        selectedService
      );
      if (data.modifiedCount > 0) {
        toast.success("Updated successfully!");
        fetchAll(); // Refresh data
        setIsModalOpen(false);
      } else {
        toast.error("No changes made.");
      }
    } catch (err) {
      toast.error("Failed to update service.");
    }
  };

  // Handle delete functionality
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axiosSecure.delete(
            `${import.meta.env.VITE_API_URL}/delete-service/${id}`
          );
          if (data.deletedCount > 0) {
            toast.success("Deleted successfully!");
            fetchAll();
          } else {
            toast.error("Failed to delete.");
          }
        } catch (err) {
          toast.error("Error deleting service.");
        }
      }
    });
  };

  return (
    <div className="flex flex-col gap-6 p-4 m-4">
      <Helmet>
        <title>Judgify | My Services</title>
      </Helmet>

      <div className="max-w-xl mx-auto">
        <label className="input input-bordered flex items-center gap-2">
          <input onChange={handleSearch} type="text" className="grow" placeholder="Search" />
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
            <thead>
              <tr>
                <th>#</th>
                <th>Company</th>
                <th>Title</th>
                <th>Description</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, i) => (
                <tr key={service._id}>
                  <td>{i + 1}</td>
                  <td>{service.company}</td>
                  <td>{service.title}</td>
                  <td>{service.description.slice(0, 10)}...</td>
                  <td>{service.category}</td>
                  <td>${service.price}</td>
                  <td className="flex gap-3">
                    <button onClick={() => handleEdit(service)} className="text-blue-500">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(service._id)} className="text-red-500">
                      <FaRegTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Edit Modal */}
      {isModalOpen && selectedService && (
        <dialog open className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Service</h2>
            <form onSubmit={handleUpdateService} className="space-y-3">
              <input
                type="text"
                value={selectedService.company}
                onChange={(e) => setSelectedService({ ...selectedService, company: e.target.value })}
                className="border p-2 w-full"
                placeholder="Company"
              />
              <input
                type="text"
                value={selectedService.title}
                onChange={(e) => setSelectedService({ ...selectedService, title: e.target.value })}
                className="border p-2 w-full"
                placeholder="Title"
              />
              <textarea
                value={selectedService.description}
                onChange={(e) =>
                  setSelectedService({ ...selectedService, description: e.target.value })
                }
                className="border p-2 w-full"
                placeholder="Description"
              />
              <input
                type="text"
                value={selectedService.category}
                onChange={(e) => setSelectedService({ ...selectedService, category: e.target.value })}
                className="border p-2 w-full"
                placeholder="Category"
              />
              <input
                type="number"
                value={selectedService.price}
                onChange={(e) => setSelectedService({ ...selectedService, price: e.target.value })}
                className="border p-2 w-full"
                placeholder="Price"
              />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-400 text-white px-4 py-2 rounded">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                  Save
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyServices;
