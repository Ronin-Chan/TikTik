import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useAuthStore from '../../store/authStore';
import { IUser, Video } from '../../types';
import VideoCard from '../../components/VideoCard';
import NoResults from '../../components/NoResults';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';

const Search = ({ videos }: { videos: Video[] }) => {

  const [isAccount, setIsAccount] = useState(false);
  const router = useRouter();
  const { searchTerm }: any = router.query;
  const { allUsers } = useAuthStore();

  const accounts = isAccount ? 'border-b-2 border-black text-[#915eff]' : 'text-gray-400';
  const isVideos = !isAccount ? 'border-b-2 border-black text-[#915eff]' : 'text-gray-400';

  const searchedAccount = allUsers.filter((user: IUser) => user.userName.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className='w-full'>
      <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full'>
        <p className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`} onClick={() => setIsAccount(true)}>
          Accounts
        </p>
        <p className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`} onClick={() => setIsAccount(false)}>
          Videos
        </p>
      </div>
      {isAccount ? (
        <div>
          {searchedAccount.length > 0 ? (
            searchedAccount.map((user: IUser, idx: number) => (
              <Link key={idx} href={`/profile/${user._id}`}>
                <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200'>
                  <div className='w-8 h-8'>
                    <Image
                      src={user.image}
                      width={50}
                      height={50}
                      className='rounded-full'
                      alt='user profile'
                      layout='responsive'
                    />
                  </div>
                  <div className='hidden xl:block'>
                    <p className='flex gap-1 items-center text-md font-bold text-primary lowercase'>
                      {user.userName.replaceAll(' ', '')}
                      <GoVerified className='text-blue-400' />
                    </p>
                    <p className='capitilize text-gray-400 text-sm'>
                      {user.userName}
                    </p>
                  </div>
                </div>
              </Link>
            )
            )) : (
            <NoResults text={`No account results for ${searchTerm}`} />
          )}
        </div>
      ) : (
        <div className='md:mt-16 flex flex-wrap gap-6 md:justify-start'>
          {videos.length > 0 ? (
            videos.map((video: Video, idx: number) => (
              <VideoCard post={video} key={idx} />
            ))
          ) : (
            <NoResults text={`No video results for ${searchTerm}`} />
          )}
        </div>
      )}
    </div>
  )
}

export const getServerSideProps = async ({
  params: { searchTerm }
}: { params: { searchTerm: string } }) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/search/${searchTerm}`);

  return {
    props: { videos: res.data }
  }
};

export default Search;