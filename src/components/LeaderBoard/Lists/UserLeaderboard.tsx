import { FC, useState } from 'react';
import { UserList } from '../../../types/types';
import blankProfile from '../../../Imgs/blankProfile.png';

interface UserLeaderboardProps {
  users: UserList[];
  onPageChange: (page: number) => void;
}

const UserLeaderboard: FC<UserLeaderboardProps> = ({ users, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = users.slice(indexOfFirstEntry, indexOfLastEntry);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    onPageChange(pageNumber);
  };

  const totalPages = Math.ceil(users.length / entriesPerPage);

  return (
    <div>
      <div className='flex flex-col'>
        <div className='grid grid-cols-6 rounded-sm bg-gray-200 dark:bg-gray-800 sm:grid-cols-6 dark:bg-meta-4'>
          <div className='p-2.5 xl:p-5 flex items-center justify-center'>
            <h5 className='text-sm font-medium uppercase xsm:text-base'># User</h5>
          </div>
          <div className='p-2.5 xl:p-5 flex items-center justify-center'>
            <h5 className='text-sm font-medium uppercase xsm:text-base'>WPM</h5>
          </div>
          <div className='p-2.5 xl:p-5 flex items-center justify-center'>
            <h5 className='text-sm font-medium uppercase xsm:text-base'>Top WPM</h5>
          </div>
          <div className='xl:p-5 flex items-center justify-center'>
            <h5 className='text-sm font-medium uppercase xsm:text-base'>Total Tests</h5>
          </div>
          <div className='p-2.5 text-center xl:p-5 flex items-center justify-center'>
            <h5 className='text-sm font-medium uppercase xsm:text-base'>Total Words Typed</h5>
          </div>
          <div className='p-2.5 text-center xl:p-5 flex items-center justify-center'>
            <h5 className='text-sm font-medium uppercase xsm:text-base'>Total Characters Typed</h5>
          </div>
        </div>
      </div>

      {currentEntries.map((user: UserList, index: number) => (
        <div key={user.id} className={`grid grid-cols-6 sm:grid-cols-6 ${index === currentEntries.length - 1 ? '' : 'border-b border-gray-300 dark:border-gray-700'}`}>
          <div className='flex items-center gap-3 p-2.5 xl:p-5'>
            <div className='flex-shrink-0'>
              <p className='text-gray-500 dark:text-gray-400'>{indexOfFirstEntry + index + 1}</p>
            </div>
            <div className='flex-shrink-0'>
              <img src={user.profilePic || blankProfile} alt='User Logo' className='w-10 h-10 rounded-full object-cover' />
            </div>
            <div>
              <p className='text-gray-800 dark:text-white font-medium'>{user.name}</p>
            </div>
          </div>

          <div className='flex items-center justify-center p-2.5 xl:p-5'>
            <p className='text-gray-800 dark:text-white'>{user.progress?.WPM || 0}</p>
          </div>

          <div className='hidden items-center justify-center p-2.5 sm:flex xl:p-5'>
            <p className='text-gray-800 dark:text-white'>{user.progress?.topWPMInterval || 0}</p>
          </div>

          <div className='hidden items-center justify-center p-2.5 sm:flex xl:p-5'>
            <p className='text-gray-800 dark:text-white'>{user.progress?.totalTests || 0}</p>
          </div>
          <div className='hidden items-center justify-center p-2.5 sm:flex xl:p-5'>
            <p className='text-gray-800 dark:text-white'>{user.progress?.totalWordsTyped || 0}</p>
          </div>

          <div className='hidden items-center justify-center p-2.5 sm:flex xl:p-5'>
            <p className='text-gray-800 dark:text-white'>{user.progress?.totalCharactersTyped || 0}</p>
          </div>
        </div>
      ))}

      <div className='flex justify-center mt-4'>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`mx-1 px-3 py-1 rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white'}`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserLeaderboard;
