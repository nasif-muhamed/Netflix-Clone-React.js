import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const Navbar = () => {
    const {user, logOut} = UserAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try{
            await logOut()
            navigate('/login')
        }catch (error){
            console.log(error)
        }
    }

    return (
        <div className='flex items-center justify-between p-4 md:px-8 lg:px-16  z-[100] w-full absolute'>
            <Link to='/' >
                <h1 className='text-red-600 text-4xl font-bold cursor-pointer'>NETFLIX</h1>
            </Link>
        
            {user?.email ? (
            <div className='flex gap-4 justify-center items-center'>
                <Link to='/profile' className="relative group" >
                    <img className='w-8 md:w-12 lg:w-16' src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-88wkdmjrorckekha.jpg" alt="Profile" />
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap min-w-max">
                        {user.email}
                    </span>
                </Link>

                <button onClick={handleLogout} className='bg-red-600 px-6 py-2 rounded cursor-pointer'>Log out</button>
            </div>
            ):(
            <div>
                <Link to='/login' >
                    <button className='text-white pr-4'>Sign In</button>
                </Link>

                <Link to='/signup' >
                    <button className='bg-red-600 px-6 py-2 rounded cursor-pointer'>Sign Up</button>
                </Link>
            </div>
            )
            }
        </div>
    )
}

export default Navbar
