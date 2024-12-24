import axios from 'axios';
import { useEffect, useState } from 'react';
import ServiceCard from '../Components/ServiceCard';
import {Helmet} from "react-helmet";
import { CiSearch } from "react-icons/ci";
import { useMutation, useQuery } from '@tanstack/react-query';
import Loading from '../Components/Loading';

const Services = () => {
    const [services, setServices] = useState([]);
    const [filter, setFilter] = useState('');
    const [search, setSearch] = useState('');
   

    useEffect(() => {
        const fetchAll = async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/services?search=${search}&filter=${filter}`);
            setServices(data);
        }
        fetchAll();
    }, [filter, search])



    // const {data: services , isLoading} = useQuery({ queryKey: ['services', search, filter], queryFn: async() => {

    //   const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/services?search=${search}&filter=${filter}`);
    //   return data;
    // } })
    // if(isLoading){
    //   return <Loading></Loading>;
    // }

     


    return (
        <div className='p-10 space-y-10' >
            <Helmet>
                <title>Judgify | Services</title>
            </Helmet>

            <h2 className='font-semibold text-2xl text-center' >Services</h2>


            <div className='flex justify-center gap-5' >
                <div className='order-2' >
                  <select
                    name='category'
                    id='category'
                    className='border p-4 rounded-lg'
                    onChange={(e) => setFilter(e.target.value)}
                    value={filter}
                  >
                    <option value=''>Filter By Category</option>
                    <option value='Design'>Design</option>
                    <option value='Development'>Development</option>
                    <option value='Technology'>Technology</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Education">Eduacation</option>
                  </select>
                </div>

                <div className='flex items-center p-2 overflow-hidden border rounded-lg  focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300'>
                  <CiSearch />
                  <input
                    className='px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent'
                    type='text'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    name='search'
                    placeholder='Search by title & company name'
                  />
                </div>
            </div>



            <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ' >
                {
                    services.length > 0 ? services.map(service => <ServiceCard key={service._id} service={service} ></ServiceCard>) : <div className='flex justify-center items-center col-span-3' ><Loading></Loading></div>
                }
            </div>
        </div>
    );
};

export default Services;