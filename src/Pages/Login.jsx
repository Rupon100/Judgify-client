import Lottie from 'react-lottie-player';
import { Link } from 'react-router-dom';
import login from '../assets/Lottie/signin.json';

const Login = () => {
    return (
        <div className='min-h-screen flex justify-center items-center max-w-5xl mx-auto p-10' >
        
            <div className='flex flex-col-reverse md:flex-row justify-between items-center w-full h-full p-10 gap-4' >
            <div className='w-full' >
                <div className="max-w-lg card bg-base-100 w-full shrink-0">
                  <form className="card-body">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Email</span>
                      </label>
                      <input type="email" placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Password</span>
                      </label>
                      <input type="password" placeholder="password" className="input input-bordered" required />
                    </div>
                    <div className="form-control mt-6">
                    <button className="btn bg-gray-800 text-white hover:bg-gray-700">Log in</button>
                    </div>
                    <div>

                    </div>
                  </form>
                  <small className='ml-8' >New in this Application?<Link className='btn btn-link' to='/signin'>Sign up</Link></small>
                </div>
            </div>
            <div>
               <Lottie
                    loop
                    animationData={login}
                    play
                    />
            </div>
            </div>
        </div>
    );
};

export default Login;