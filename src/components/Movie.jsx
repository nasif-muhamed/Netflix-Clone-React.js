
import React, {useEffect, useState} from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { UserAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore'

const Movie = ({item}) => {
    const [like, setLike] = useState(false)
    const {user} = UserAuth()

    const movieID = doc(db, 'users', `${user?.email}`)

    useEffect(() => {
        if (user?.email) {
            const unsubscribe = onSnapshot(movieID, (doc) => {
                if (doc.exists()) {
                    const savedShows = doc.data().savedShows || [];
                    const isMovieSaved = savedShows.some(show => show.id === item.id);
                    setLike(isMovieSaved);
                }
            });

            // Cleanup listener on component unmount
            return () => unsubscribe();
        }
    }, [user?.email, item.id]);


    const saveShow = async () => {
        if (user?.email) {
            const updatedLikeStatus = !like;
            setLike(updatedLikeStatus);

            try {
                if (updatedLikeStatus) {
                    await updateDoc(movieID, {
                        savedShows: arrayUnion({
                            id: item?.id,
                            title: item?.title,
                            img: item?.backdrop_path,
                        }),
                    });
                } else {
                    await updateDoc(movieID, {
                        savedShows: arrayRemove({
                            id: item?.id,
                            title: item?.title,
                            img: item?.backdrop_path,
                        }),
                    });
                }
            } catch (error) {
                console.error("Error updating saved shows: ", error);
            }
        } else {
            alert('Please Log in to save a movie')
        }
    }

    return (
        <div className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'> 
            <img className='w-full h-auto block text-white' src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`} alt={item?.title} />
            <div className='absolute top-0 left-0 w-full h-full opacity-0 text-white hover:bg-black/60 hover:opacity-100'>
                <p className='whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>{item?.title}</p>
                <p onClick={saveShow} className='absolute top-4 left-4 '>
                    {like? <FaHeart className='text-gray-50'/> : <FaRegHeart className='text-gray-50'/>}
                </p>
            </div>
        </div>
        
    )
}

export default Movie
