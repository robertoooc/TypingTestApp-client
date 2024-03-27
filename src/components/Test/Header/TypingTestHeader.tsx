import { FC } from 'react';
import { TfiTimer } from 'react-icons/tfi';
interface Props {
  time: number;
  wpm: number;
  testedChar: string;
}
const TypingTestHeader: FC<Props> = ({ time, wpm, testedChar }) => {
  return (
    <div className='h-20 flex  space-x-2 bg-stone-900 text-white w-screen whitespace-normal place-content-around items-center'>
      <span className='flex items-center'>
        <TfiTimer className=' text-xl' />
        <p className='font-mono text-xl font-semibold flex'>:{time}</p>
      </span>
      <p className='font-mono text-xl font-semibold'>WPM: {wpm}</p>
      <p className='font-mono text-xl font-semibold'>Tested on: {testedChar}</p>
    </div>
  );
};

export default TypingTestHeader;
