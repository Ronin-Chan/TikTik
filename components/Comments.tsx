import React, { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import useAuthStore from '../store/authStore';
import NoResults from './NoResults';

interface IProps {
  isPostingComment: Boolean,
  comment: string,
  setComment: Dispatch<SetStateAction<string>>,
  addComment: (e: React.FormEvent) => void,
  comments: IComment[],
}

interface IComment {
  comment: string,
  length?: number,
  _key: string,
  postedBy: { _ref?: string, _id?: string },
}

const Comments = ({ comment, setComment, addComment, comments, isPostingComment }: IProps) => {

  const { userProfile } = useAuthStore();

  return (
    <div className='border-t-2 border-gray-200 pt-4 px-10 bg-[#f8f8f8] border-b-2 lg:pb-0 pb-[100px]'>
      <div className='overflow-scroll lg:h-[457px]'>
        {comments?.length ? (
          <div>videos</div>
        ) : (
          <NoResults text='No comments yet' />
        )}
      </div>
      {userProfile && (
        <div className='absolute bottom-0 left-0 pb-6 px-2 md:px-10'>
          <form onSubmit={addComment} className='flex gap-4'>
            <input
              value={comment}
              onChange={(e) => {setComment(e.target.value)}}
              placeholder='Add a comment...'
              className='bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-300 focus:outline-none focus:boder-2 focus:border-[#915eff] flex-1 rounded-lg'
            />
            <button
              className='ml-2 text-md text-white bg-[#915eff] px-6 py-4 rounded-lg'
              onClick={addComment}
            >
              {isPostingComment ? 'Commenting...' : 'Comment'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Comments;