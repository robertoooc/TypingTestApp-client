import { FC, useState } from 'react';
import { mistakeIdxs } from '../../../types/types';
interface Props {
  words: string;
  currIdx: number;
  mistakes: mistakeIdxs[];
  started: Boolean;
  newTest: Boolean;
  setStarted: () => void;
  setNewTest: () => void;
}

const TextDisplay: FC<Props> = ({ words, currIdx, mistakes, started, setStarted, newTest, setNewTest }) => {
  const sizeLimit = 53;
  return (
    <div className='relative'>
      <div className='bg-neutral-300 w-7/12 mx-auto rounded-xl p-2 relative dark:text-black'>
        {!started && (
          <div className='absolute inset-0 flex justify-center items-center backdrop-filter backdrop-brightness-50 rounded-lg'>
            <button onClick={() => setStarted()} className='text-white bg-[#24292F] font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
              Start
            </button>
          </div>
        )}
        {newTest && (
          <div className='absolute inset-0 flex justify-center items-center backdrop-filter backdrop-brightness-50 rounded-lg'>
            <button onClick={() => setNewTest()} className='text-white bg-[#24292F] font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
              New Test
            </button>
          </div>
        )}
        <div className='flex flex-wrap'>
          {words.split('').map((char, index) => {
            const isError = mistakes.some((mistake) => mistake.idx === index);
            const isTyped = index < currIdx;
            const isCurrent = index === currIdx;

            let className = 'inline-block px-1 py-1 rounded-md';

            if (isError && !isCurrent) {
              className += ' bg-red-600'; // Background color for errors
            } else if (isTyped && !isError) {
              className += ' bg-gray-200'; // Background color for already typed text
            } else if (isCurrent) {
              className += ' bg-yellow-300'; // Background color for current typing position
            }
            // Line size limit 53 character per line
            //
            return (
              <span key={index} className={className}>
                {char === ' ' ? '⸱' : char}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TextDisplay;

