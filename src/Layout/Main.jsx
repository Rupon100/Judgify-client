import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='min-h-[calc(100vh-237px)]'>
               <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Main;