import Link from 'next/link'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import logo from '../utils/tiktik-logo.png'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import { createOrGetUser } from '../utils'
import useAuthStore from '../store/authStore'
import { IoMdAdd } from 'react-icons/io'
import { AiOutlineLogout } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { useRouter } from 'next/router'

interface IProps {
  userProfile: any,
  addUser: any,
  removeUser: any,
}

const Navbar = () => {

  const { userProfile, addUser, removeUser }: IProps = useAuthStore();
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  const handleSearch = (e: { preventDefault: () => void }) => {
    // prevent page reload after submitting form
    e.preventDefault();

    if (searchValue) {
      router.push(`/search/${searchValue}`)
    }
    
  }

  return (
    <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-1 px-4'>
      <Link href="/">
        <div className='w-[110px] md:w-[140px] ml-1'>
          <Image
            className='cursor-pointer'
            src={logo}
            alt="TikTik"
            layout="responsive"></Image>
        </div>
      </Link>
      <div className='relative hidden md:block'>
        <form
          onSubmit={handleSearch}
          className='absolute md:static top-10 -left-20 bg-white'
        >
          <input
            type='text'
            value={searchValue}
            onChange={(e) => {setSearchValue(e.target.value)}}
            placeholder='Search accounts and videos'
            className='bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-purple-400 w-[300px] md:w-[350px] rounded-full  md:top-0'
          />
          <button
            onClick={handleSearch}
            className='absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400'
          >
            <BiSearch />
          </button>
        </form>
      </div>
      <div>
        {userProfile ? (
          <div className='flex gap-5 md:gap-10'>
            <Link href="/upload">
              <button className='flex border-2 px-2 md:px-4 text-md font-semibold items-center gap-2'>
                <IoMdAdd className='text-xl text-[#915eff]' /> {` `}
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