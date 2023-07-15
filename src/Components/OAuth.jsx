import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import {db} from '../Firebase'
import { doc ,getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import React from 'react'
import {FcGoogle} from 'react-icons/fc'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

export default function OAuth() {
  const navigate = useNavigate();
  async function onGoogleClick() {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // check if user is authenticated or not authenticated

      const docRef = doc(db, 'users',user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef,{
          name:user.displayname,
          email:user.email,
          timestamp:serverTimestamp(),
        });
      }
      navigate("/");
    } catch (error) {
      toast.error("Couldn't Authorise with Google");
      console.error(error);
    }
  }
  return (
    <button className='flex justify-center items-center w-full bg-red-600 text-white px-7 py-3 rounded uppercase text-sm font-medium hover:bg-red-700 active:bg-red-800 shadow-md hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out' onClick={onGoogleClick} type='button'> <FcGoogle className='mr-2 bg-white rounded-full text-2xl p-[0.1rem] '/> Continue With Google</button>
  )
}
