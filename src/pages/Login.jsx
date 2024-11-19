import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth  } from '../context/AuthContext'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const {user, logIn} = UserAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            await logIn(email, password)
            navigate('/')
        } catch (error){
            console.log(error)
            setError('Failed to Sign In. Please try again. ' + error.message)
        }
    }

    return (
        <div className='w-full h-screen'>
            <img className='hidden sm:block absolute w-full h-full object-cover'
            src="https://assets.nflxext.com/ffe/siteui/vlv3/74d734ca-0eab-4cd9-871f-bca01823d872/web/IN-en-20241021-TRIFECTA-perspective_2277eb50-9da3-4fdf-adbe-74db0e9ee2cf_large.jpg" alt="/" />
            <div className='bg-black/60 fixed top-0 left-0 w-full h-screen'></div>

            <div className='fixed w-full px-4 py-24 z-50'>
                <div className='max-w-[450px] h-[600px] mx-auto bg-black/60 text-white'>
                    <div className='max-w-[320px] mx-auto py-16'>
                        <h1 className='text-3xl font-bold'>Sign In</h1>
                        
                        <form onSubmit={handleSubmit} className='w-full flex flex-col py-4'>
                            <input onChange={ e => setEmail(e.target.value)} className='p-3 my-2 bg-gray-700/60 rounded' type="email" placeholder='Email' autoComplete='email' />
                            <input onChange={ e => setPassword(e.target.value)} className='p-3 my-2 bg-gray-700/60 rounded' type="password" placeholder='Passwor' autoComplete='current-password' />
                            
                            {error && <p className='bg-transparent text-sm text-red-600 p-3 rounded mb-3'>{error}</p>}

                            <button className='bg-red-600 py-3 my-6 rounded font-bold'>Sign In</button>
                        
                            <div className='flex justify-between items-center text-sm text-gray-600'>
                                <p><input className='mr-2' type="checkbox" /> Remember me</p>
                                <p className='cursor-pointer'>Need Help?</p>
                            </div>

                            <p className='py-8'>
                                <span className='text-gray-600 pr-4'>New to Netflix?</span> {'  '}
                                <Link className='cursor-pointer' to='/signup'>Sign Up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
