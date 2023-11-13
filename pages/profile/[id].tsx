import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';

import VideoCard from '../../components/VideoCard';
import NoResults from '../../components/NoResults';
import { IUser, Video } from '../../types';

interface IProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  }
}

const Profile = ({ data }: IProps) => {

  const { user, userVideos, userLikedVideos } = data;

  return (
    <div className='w-full'>
      <div className='flex gap-6 md:gap-10 mb-4 bg-white w-full'>
        <div className='w-16 h-16 md:w-32 md:h-32'>
          <Image
            src={user.image}
            width={120}
            height={120}
            className='rounded-full'
            alt='user profile'
            layout='responsive'
          />
        </div>

        <div className='flex flex-col justify-center'>
          <p className='md:text-2xl flex gap-1 items-center text-md font-bold text-primary lowercase'>
            {user.userName.replaceAll(' ', '')}
            <GoVerified className='text-blue-400' />
          </p>
          <p className='capitilize md:text-xl text-gray-400 text-sm'>
            {user.userName}
          </p>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({
  params: { id }
}: { params: { id: string } }) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/${id}`);

  return {
    props: { data: res.data }
  }
};

export default Profile;