import { FC, useState } from 'react';

import { LeaderboardEntry } from '../../../types/types';
import blankProfilePic from '../../../Imgs/blankProfile.png';

interface TestsLeaderboardProps {
  entries: LeaderboardEntry[];
  onPageChange: any;
}

const TestsLeaderboard: FC<TestsLeaderboardProps> = ({ entries }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = entries.slice(indexOfFirstEntry, indexOfLastEntry);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber); // eslint-disable-line

  return (
    <div>
      <div className='flex flex-col'>
        <div className='grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5'>
          <div className='p-2.5 xl:p-5'>
            <h5 className='text-sm font-medium uppercase xsm:text-base'>Source</h5>
          </div>
          <div className='p-2.5 text-center xl:p-5'>
            <h5 className='text-sm font-medium uppercase xsm:text-base'>WPM</h5>
          </div>
          <div className='p-2.5 text-center xl:p-5'>
            <h5 className='text-sm font-medium uppercase xsm:text-base'>Accuracy</h5>
          </div>
          <div className='hidden p-2.5 text-center sm:block xl:p-5'>
            <h5 className='text-sm font-medium uppercase xsm:text-base'>Total Chars Typed</h5>
          </div>
          <div className='hidden p-2.5 text-center sm:block xl:p-5'>
            <h5 className='text-sm font-medium uppercase xsm:text-base'>Mistakes Amt</h5>
          </div>
        </div>
      </div>

      {currentEntries.map((entry: LeaderboardEntry, index: number) => (
        <div key={entry.id} className={`grid grid-cols-3 sm:grid-cols-5 ${index === currentEntries.length - 1 ? '' : 'border-b border-strokedark dark:border-strokedark'}`}>
          <div className='flex items-center gap-3 p-2.5 xl:p-5'>
            <div className='flex-shrink-0'>
              <img src={entry.user.profilePic || blankProfilePic} alt='User Logo' className='w-10 h-10 rounded-full object-cover' />
            </div>
            <p className='text-black dark:text-white'>{entry.user.name}</p>
          </div>

          <div className='flex items-center justify-center p-2.5 xl:p-5'>
            <p className='text-black dark:text-white'>{entry.wpm}</p>
          </div>

          <div className='flex items-center justify-center p-2.5 xl:p-5'>
            <p className='text-black dark:text-white'>{entry.accuracy ? entry.accuracy.toFixed(2) : 'N/A'}%</p>
          </div>

          <div className='hidden items-center justify-center p-2.5 sm:flex xl:p-5'>
            <p className='text-black dark:text-white'>{entry.totalChars || 'N/A'}</p>
          </div>

          <div className='hidden items-center justify-center p-2.5 sm:flex xl:p-5'>
            <p className='text-black dark:text-white'>{entry.mistakesAmt || 'N/A'}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestsLeaderboard;
