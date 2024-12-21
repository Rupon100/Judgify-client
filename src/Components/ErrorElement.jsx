import { Link } from 'react-router-dom';
import errorImg from '../assets/404.jpg';
const ErrorElement = () => {
    return (
        <div className='min-h-screen flex justify-center items-center' >
            <div className='text-center' >
                <img className='max-w-60' src={errorImg} alt="error image" />
                <button className='my-4' >
                  <Link className='px-4 py-1 border' to='/' >Back to home</Link>
                </button>
            </div>
        </div>
    );
};

export default ErrorElement;