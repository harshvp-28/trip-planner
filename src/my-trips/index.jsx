import { db } from '@/service/firebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TripCard from './Component/TripCard'

const MyTrips = () => {
    const navigate = useNavigate();
    const [userTrips, setUserTrips] = useState([]);
    const [loading, setLoading] = useState(true); // loading state added

    const getUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/');
            return;
        }

        try {
            const q = query(collection(db, 'AITrips'), where('userEmail', '==', user?.email));
            const querySnapshot = await getDocs(q);
            const trips = [];
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                trips.push(doc.data());
            });
            setUserTrips(trips);
        } catch (error) {
            console.error("Error fetching trips:", error);
        } finally {
            setLoading(false); // stop loading after fetching
        }
    }

    useEffect(() => {
        getUserTrips();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 py-10">
            <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
                <h2 className="font-bold text-4xl text-gray-800 text-center md:text-left">My Trips</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
                    {loading ? (
                        // Show loading skeletons while fetching
                        [1, 2, 3, 4, 5, 6].map((item, index) => (
                            <div
                                key={index}
                                className="h-[250px] w-full bg-gradient-to-r from-slate-200 to-slate-300 animate-pulse rounded-2xl shadow-md"
                            ></div>
                        ))
                    ) : userTrips.length > 0 ? (
                        // Show Trip Cards if trips exist
                        userTrips.map((trip, index) => (
                            <div key={index} className="backdrop-blur-sm bg-white/30 border border-white/40 shadow-xl rounded-2xl p-2">
                                <TripCard trip={trip} />
                            </div>
                        ))
                    ) : (
                        // Show message if no trips are available
                        <div className="col-span-full text-center text-gray-600 text-lg font-medium">
                            No trips available, please start creating trips.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MyTrips;
