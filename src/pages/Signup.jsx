
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [error, setError] = useState('')
    const {user, signUp} = UserAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (password !== password2){
            setError('Passwords do not match')
        }else if(password.length < 8){
            setError('Passwords must contain atleast 8 characters')
        }else{
            try {
                await signUp(email, password)
                navigate('/login')
            } catch (error){
                console.log(error)
                setError('Failed to sign up. Please try again. ' + error.message)
            }
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
                        <h1 className='text-3xl font-bold'>Sign Up</h1>
                        
                        <form onSubmit={handleSubmit} className='w-full flex flex-col py-4'>
                            <input onChange={(e) => setEmail(e.target.value)} className='p-3 my-2 bg-gray-700/60 rounded' type="email" placeholder='Email' autoComplete='email' />
                            <input onChange={(e) => setPassword(e.target.value)} className='p-3 my-2 bg-gray-700/60 rounded' type="password" placeholder='Enter Password' autoComplete='current-password' />
                            <input onChange={(e) => setPassword2(e.target.value)} className='p-3 my-2 bg-gray-700/60 rounded' type="password" placeholder='Re Enter Password' autoComplete='current-password' />
                            
                            {error && <p className='bg-transparent text-sm text-red-600 p-3 rounded mb-3'>{error}</p>}

                            <button className='bg-red-600 py-3 my-6 rounded font-bold'>Sign Up</button>
                        
                            <div className='flex justify-between items-center text-sm text-gray-600'>
                                <p><input className='mr-2' type="checkbox" /> Remember me</p>
                                <p className='cursor-pointer'>Need Help?</p>
                            </div>

                            <p className='py-8'>
                                <span className='text-gray-600 pr-4'>Already Subscribed to Netflix?</span> {'  '}
                                <Link className='cursor-pointer' to='/login'>Sign In</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
