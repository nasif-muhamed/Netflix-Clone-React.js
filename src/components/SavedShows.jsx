import React, {useState, useEffect} from 'react'
import { UserAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { updateDoc, doc, onSnapshot } from 'firebase/firestore'
import { AiOutlineClose } from 'react-icons/ai'

const SavedShows = () => {
    const [movies, setMovies] = useState([])
    const { user } = UserAuth()

    useEffect(() => {
        onSnapshot(
            doc(db, 'users', `${user?.email}`), (doc) => {
                setMovies(doc.data()?.savedShows)
            })
    }, [user?.email]);

    const movieRef = doc(db, 'users', `${user?.email}`)
    const deleteShow = async (passedId) => {
        try{
            const result = movies.filter(item => item.id !== passedId)
            console.log('inside', result, movieRef)
            await updateDoc(movieRef, {savedShows: result})
        }catch (error){
            console.log(error)
        }
    }

    return (
        <div>
            <h2 className='text-white fond-bold md:text-xl p-4'>My Shows</h2>
            
            <div className='relative flex items-center group'>
                <div id={'slider'} className='w-full relative flex flex-wrap justify-center gap-1 md:gap-2 lg:gap-4'>
                    {
                        movies.map((item, id) => {
                            
                            return (
                                <div key={id} className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'> 
                                    <img className='w-full h-auto block text-white' src={`https://image.tmdb.org/t/p/w500/${item?.img}`} alt={item?.title} />
                                    <div className='absolute top-0 left-0 w-full h-full opacity-0 text-white hover:bg-black/60 hover:opacity-100'>
                                        <p className='whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>{item?.title}</p>
                                        <p onClick={()=>deleteShow(item?.id)} className='absolute text-gray-300 top-4 right-4'><AiOutlineClose /></p>
                                    </div>
                                </div>
                            )
                        } )
                    }
                </div>
            </div>

        </div>
    )
}

export default SavedShows
