import { FC } from 'react';
import { results, currentUser } from '../../types/types';

interface props {
  index: number;
  results: results | undefined;
  timeDuration: number;
  currentUser: currentUser | null;
}
const Results: FC<props> = ({ index, results, timeDuration, currentUser }) => {
  return (
    <div className='max-w-xl mx-auto bg-gray-100 rounded-lg shadow-lg p-6'>
      <div className='text-center mb-6'>
        <h2 className='text-3xl font-semibold text-gray-800'>Test Results</h2>
        <p className='text-gray-600'>Total Characters Typed: {index}</p>
      </div>
      <div className='flex justify-between mb-6'>
        <div className='text-center'>
          <p className='text-lg font-semibold text-gray-800'>Accuracy</p>
          <p className='text-gray-600'>{results?.accuracy}%</p>
        </div>
        <div className='text-center'>
          <p className='text-lg font-semibold text-gray-800'>WPM</p>
          <p className='text-gray-600'>{results?.wpm || 0}</p>
        </div>
        <div className='text-center'>
          <p className='text-lg font-semibold text-gray-800'>Mistakes</p>
          <p className='text-gray-600'>
            {!results?.mistakes || results.mistakes.length === 0
              ? '0'
              : results?.mistakes
                  ?.map((a) => a.amount)
                  ?.reduce((a, b) => a + b)}
          </p>
        </div>
        <div className='text-center'>
          <p className='text-lg font-semibold text-gray-800'>Test Duration</p>
          <p className='text-gray-600'>{timeDuration} seconds</p>
        </div>
      </div>
      <h3 className='text-xl font-semibold text-gray-800 mb-4'>
        Mistakes Made
      </h3>
      <div className='max-h-40 overflow-y-auto'>
        <div className='space-y-4'>
          {results?.mistakes
            .sort((a, b) => b.amount - a.amount)
            .map((mistake, idx) => (
              <div
                key={idx}
                className='flex justify-between items-center bg-gray-200 rounded-lg p-2'
              >
                <p className='font-semibold'>{mistake.char}</p>
                <p className='text-gray-600'>Amount: {mistake.amount}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default Results;
