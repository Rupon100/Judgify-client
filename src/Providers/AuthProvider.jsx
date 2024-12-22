import { createContext, useEffect, useState } from "react";
import { auth } from './../Firebase/firebase.config';
import {  createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) => {
      setLoading(true)
      return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
      setLoading(true)
      return signInWithEmailAndPassword(auth, email, password)
    }

    const signInWithGoogle = () => {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      return signInWithPopup(auth, provider)
    }

    const logOut = async () => {
      setLoading(true)
      return signOut(auth)
    }

    const updateUserProfile = (name, photo) => {
      return updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      })
    }

    // // onAuthStateChange
    // useEffect(() => {
    //   const unsubscribe = onAuthStateChanged(auth, async currentUser => {
    //     console.log('CurrentUser email-->', currentUser?.email);
    //     if(currentUser?.email){
    //       setUser(currentUser);
    //       const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, {
    //           email: currentUser?.email
    //       },
    //       {withCredentials: true}
    //      ) 
    //     }else{
    //       setUser(currentUser);

    //       const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/logout`,
    //        {withCredentials: true}import { auth } from './../firebase/firebase.config';

    //       ) 

    //     }
        
    //     setLoading(false)
        
    //   })
    //   return () => {
    //     return unsubscribe()
    //   }
    // }, [])

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if(currentUser){
                setUser(currentUser)
            }else{
                setUser(null);
                // setLoading(true)
            }
            setLoading(false)
        })
        return () => {
            unsubscribe();
        }
    },[])

    const authInfo = {
      user,
      setUser,
      loading,
      setLoading,
      createUser,
      signIn,
      signInWithGoogle,
      logOut,
      updateUserProfile
    }



    return (
        <div>
            <AuthContext.Provider value={authInfo} >
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;