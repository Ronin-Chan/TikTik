import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import logo from '../utils/tiktik-logo.png'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import { createOrGetUser } from '../utils'
import useAuthStore from '../store/authStore'

const Navbar = () => {

  const { userProfile, addUser } = useAuthStore();

  return (
    <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4'>
      <Link href="/">
        <div className='w-[100px] md:w=[130px]'>
          <Image
            className='cursor-pointer'
            src={logo}
            alt="TikTik"
            layout="responsive"></Image>
        </div>
      </Link>
      <div>
        SEARCH
      </div>
      <div>
        {userProfile ? (
          <div>
            {userProfile.userName}
          </div>
        ) : (
          <GoogleLogin 
            onSuccess={(res) => createOrGetUser(res, addUser)}
            onError={() => console.log('Error')}
          />
        )}
      </div>
    </div>
  )
}

export default Navbar;