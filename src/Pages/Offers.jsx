import React, { useState, useEffect } from 'react'
import Spinner from '../Components/Spinner'
import {collection, getDocs, limit, orderBy, query, startAfter, where} from 'firebase/firestore'
import {toast} from 'react-toastify'
import {db} from '../Firebase'
import ListingItem from '../Components/ListingItem'

export default function Offers() {
  const [listings,setListings] = useState(null);
  const [loading,setLoading] = useState(true);
  const [lastFetchedListing,setLastFetchedListing] = useState(null);
  useEffect(()=>{
    async function fetchListings(){
      try {
        const listingsRef = collection(db,"listings");
        const q = query(listingsRef,where("offer", "==", true), orderBy("timestamp","desc"),limit(8));
        const querySnap = await getDocs(q);
        const lastVisible = querySnap.docs[querySnap.docs.length -1];
        setLastFetchedListing(lastVisible);
        let listings = []
        querySnap.forEach((doc)=>{
          return listings.push({
            id: doc.id,
            data: doc.data()
          });
        });
        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error("Could not fetch listing")
      }
    }
    fetchListings();
  },[])
  async function onFetchMoreListings(){
    try {
      const listingsRef = collection(db,"listings");
      const q = query(listingsRef,where("offer", "==", true), orderBy("timestamp","desc"), startAfter(lastFetchedListing),limit(4));
      const querySnap = await getDocs(q);
      const lastVisible = querySnap.docs[querySnap.docs.length -1];
      setLastFetchedListing(lastVisible);
      let listings = []
      querySnap.forEach((doc)=>{
        return listings.push({
          id: doc.id,
          data: doc.data()
        });
      });
      setListings((prevState)=>[
        ...prevState, ...listings
      ]);
      setLoading(false);
    } catch (error) {
      toast.error("Could not fetch listing")
    }
  }
  return (
    <div className='max-w-6xl mx-auto px-3'>
      <h1 className='text-3xl text-center mt-6 font-bold mb-6'>Offers</h1>
      {loading ? (
        <Spinner />
      ) : listings.length > 0 ? (
        <>
        <main>
          <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
            {listings.map((listing)=>(
              <ListingItem key={listing.id} listing={listing.data} id={listing.id}/>
            ))}
          </ul>
        </main>
        {
          lastFetchedListing && (
            <div className='flex justify-center items-center'>
              <button className='bg-white px-3 py-1.5 text-gray-700 border border-gray-300 mb-6 mt-6 hover:border-gray-600 rounded transition duration-150 ease-in-out' onClick={onFetchMoreListings}>Load more</button>
            </div>
          )
        }
        </>
        ) : (<p>There are no current offers</p>)}
    </div>
  )
}
