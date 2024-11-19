import React from 'react'
import SavedShows from '../components/SavedShows'

const Account = () => {
    return (
        <div>
            <div className='w-full text-white'>
                <img className='w-full h-[400px] object-cover'
                src="https://assets.nflxext.com/ffe/siteui/vlv3/74d734ca-0eab-4cd9-871f-bca01823d872/web/IN-en-20241021-TRIFECTA-perspective_2277eb50-9da3-4fdf-adbe-74db0e9ee2cf_large.jpg" alt="/" />
                
                <div className='bg-black/60 fixed top-0 left-0 w-full h-[550px]'></div>

                <div className='absolute top-[20%] p-4 md:p-8'>
                    <h1 className='text-3xl md:text-5xl font-bold'>My Shows</h1>
                </div>
            </div>
            <SavedShows/>
        </div>
    )
}

export default Account
