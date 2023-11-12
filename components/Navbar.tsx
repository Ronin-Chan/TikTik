import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import logo from '../utils/tiktik-logo.png'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import { createOrGetUser } from '../utils'
import useAuthStore from '../store/authStore'
import { IoMdAdd } from 'react-icons/io'
import { AiOutlineLogout } from 'react-icons/ai'

const Navbar = () => {

  const { userProfile, addUser, removeUser } = useAuthStore();

  return (
    <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4'>
      <Link href="/">
        <div className='w-[110px] md:w-[140px] ml-1'>
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
          <div className='flex gap-5 md:gap-10'>
            <Link href="/upload">
              <button className='flex border-2 px-2 md:px-4 text-md font-semibold items-center gap-2'>
                <IoMdAdd className='text-xl' /> {` `}
                <span className='hidden md:block'>Upload</span>
              </button>
            </Link>
            {userProfile.image && (
              <Link href="/">
                <>
                  <Image
                    width={40}
                    height={40}
                    className='rounded-full cursor-pointer'
                    src={userProfile.image}
                    alt='profile photo'
                  />
                </>
              </Link>
            )}
            <button
              className='px-2'
              onClick={() => {
                googleLogout();
                removeUser();
              }}
            >
              <AiOutlineLogout color='purple' fontSize={23} />
            </button>
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