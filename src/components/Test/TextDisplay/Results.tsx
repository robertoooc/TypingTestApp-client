import { FC, useState } from 'react';
import { connect } from 'react-redux';
import { TypingTestData } from '../../../types/types';
import LessonProgress from './Results/LessonProgress';
import TestResults from './Results/TestResults';
import UserProgress from './Results/UserProgress';

interface props {
  data: TypingTestData;
}

const Results: FC<props> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const titles = ['Test Results', 'Lesson Progress', 'User Progress'];
  const { lessonProgress, test, userProgress } = data;

  return (
    <div className='w-3/4 mx-auto rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark'>
      <div className='text-center mb-3'>
        <h2 className='text-3xl font-semibold text-gray-800'>Results</h2>
      </div>
      <div className='mb-6 flex justify-center gap-10 border-b border-stroke dark:border-strokedark'>
        {titles.map((title, idx) => (
          <div
            key={idx}
            className={`border-b-2 py-4 text-sm font-medium md:text-base ${activeTab === idx ? 'border-primary text-primary' : 'border-transparent hover:text-primary'}`}
            onClick={() => setActiveTab(idx)}
            style={{ cursor: 'pointer' }}
          >
            {title}
          </div>
        ))}
      </div>
      <div>
        {activeTab === 0 && (
          <div className='leading-relaxed'>
            <TestResults testData={test} />
          </div>
        )}
        {activeTab === 1 && (
          <div className='leading-relaxed'>
            <LessonProgress lessonProgress={lessonProgress} />
          </div>
        )}
        {activeTab === 2 && (
          <div className='leading-relaxed'>
            <UserProgress userProgress={userProgress} />
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  data: state.test.data,
});

export default connect(mapStateToProps)(Results);
