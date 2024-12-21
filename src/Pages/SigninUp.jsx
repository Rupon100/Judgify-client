import Lottie from 'react-lottie-player';
import signup from '../assets/Lottie/signup.json';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthProvider, { AuthContext } from '../Providers/AuthProvider';
// import CVBaseElement from './../../node_modules/lottie-web/player/js/elements/canvasElements/CVBaseElement';

const SigninUp = () => {

    const { createUser, updateUserProfile } = useContext(AuthContext);

    const handleCreateUser = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photo = form.photo.value;
        const pass = form.pass.value;

        const newUser = { name, email, photo, pass }
        console.log(newUser)

        createUser(email, pass)
        .then(data => {
            updateUserProfile(name, photo);
            console.log(data.user)
        })

    }

    return (
        <div className='min-h-screen flex justify-center items-center max-w-5xl mx-auto' >
            <div className='flex flex-col-reverse md:flex-row justify-between items-center w-full h-full p-10 gap-4'>
            <div className='w-full' >
                <div className="card bg-base-100 max-w-lg shrink-0">
                  <form onSubmit={handleCreateUser} className="card-body ">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Name</span>
                      </label>
                      <input type="text" placeholder="Name" name='name' className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Email</span>
                      </label>
                      <input type="email" placeholder="Email" name='email' className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">photoURL</span>
                      </label>
                      <input type="url" placeholder="photo URL" name='photo' className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Password</span>
                      </label>
                      <input type="password" placeholder="password" name='pass' className="input input-bordered" required />
                    </div>
                    <div className="form-control mt-6">
                      <button className="btn bg-gray-800 text-white hover:bg-gray-700">Register</button>
                    </div>
                  </form>
                  <small className='ml-8' >Have an account?<Link className='btn btn-link' to='/login'>Log in</Link></small>
                </div>
            </div>
            <div>
               <Lottie
                    loop
                    animationData={signup}
                    play
                    />
                {/* <img src={signup} alt="" /> */}
            </div>
        </div>
        </div>
    );
};

export default SigninUp;