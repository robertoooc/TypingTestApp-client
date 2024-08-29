import { FC } from 'react';
import { userProgressImprovements } from '../../../../types/types';

interface userProgressProps {
  userProgress: userProgressImprovements;
}

const UserProgress: FC<userProgressProps> = ({ userProgress }) => {
  const renderStatCard = (title: string, data: { improvement: boolean; value: number; prevValue: number }) => (
    <div className='rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark'>
      <div className='flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4'>
        <svg className='fill-primary dark:fill-white' width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M11 0C4.935 0 0 4.935 0 11C0 17.065 4.935 22 11 22C17.065 22 22 17.065 22 11C22 4.935 17.065 0 11 0ZM11 20.4C5.79 20.4 1.6 16.21 1.6 11C1.6 5.79 5.79 1.6 11 1.6C16.21 1.6 20.4 5.79 20.4 11C20.4 16.21 16.21 20.4 11 20.4Z'
            fill=''
          ></path>
          <path d='M15.9 9.7H12.3V3.5H9.7V9.7H6.1L11 14.6L15.9 9.7Z' fill=''></path>
        </svg>
      </div>
      <div className='mt-4 flex items-end justify-between'>
        <div>
          <h4 className={`text-title-md font-bold ${data.improvement ? 'text-green-500' : 'text-red-500'}`}>{data.value}</h4>
          <span className='text-sm font-medium'>{title}</span>
        </div>
        <div className='text-xs text-gray-500'>
          <p>{data.improvement ? `+${Number((data.value - data.prevValue).toFixed(2))}` : `${Number((data.value - data.prevValue).toFixed(2))}`}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
      {renderStatCard('Total Tests', userProgress.totalTests)}
      {renderStatCard('Average WPM', userProgress.averageWPM)}
      {renderStatCard('WPM', userProgress.WPM)}
      {renderStatCard('Top WPM Interval', userProgress.topWPMInterval)}
      {renderStatCard('Average Accuracy', userProgress.averageAccuracy)}
      {renderStatCard('Top Accuracy', userProgress.topAccuracy)}
      {renderStatCard('Average Characters Typed', userProgress.averageCharactersTyped)}
      {renderStatCard('Total Characters Typed', userProgress.totalCharactersTyped)}
      {renderStatCard('Total Words Typed', userProgress.totalWordsTyped)}
      {renderStatCard('Total Mistakes', userProgress.totalMistakes)}
      {renderStatCard('Total Duration', userProgress.totalDuration)}
    </div>
  );
};

export default UserProgress;
