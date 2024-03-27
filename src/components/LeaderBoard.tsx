import { useEffect, useState, FC } from 'react';
import { currentUser } from './types/types';
import { FaUser } from 'react-icons/fa';
import { getAllTestsSorted } from './Profile/utils/getAllTests';

interface Test {
  _id: string;
  wpm: number;
  mistakes: any[];
  accuracy: number;
  user: {
    _id: string;
    name: string;
    email: string;
  } | null;
  time: string;
}

interface Props {
  currentUser: currentUser | null;
}

const LeaderBoard: FC<Props> = ({ currentUser }) => {
  const [leaderboardData, setLeaderboardData] = useState<Test[]>([]);
  const [userRank, setUserRank] = useState<number | null>(null);
  useEffect(() => {
    const getLeaderBoard = async () => {
      try {
        const sortedTests: Test[] = (await getAllTestsSorted()) as Test[] | [];
        const currentUserRank = sortedTests?.findIndex(
          (test: any) => test?.user?._id === currentUser?._id
        );
        setUserRank(currentUserRank || null);

        setLeaderboardData(sortedTests);
      } catch (err) {
        console.error(err);
      }
    };
    getLeaderBoard();
  }, [currentUser]);

  return (
    <div className='container ml-10 mx-auto p-4 flex flex-wrap justify-between w-screen h-screen'>
      <div className='flex-1 min-w-0 h-screen flex flex-col'>
        <h2 className='text-2xl font-bold mb-4'>Top Performers</h2>
        <p className='mb-4'>
          Ascend the ranks on our leaderboard, where typing prowess reigns
          supreme! Embrace the challenge with customizable test durations of 15,
          30, or 60 seconds, and witness your typing speed and accuracy
          showcased in real-time. With each keystroke, our innovative algorithm
          evaluates your performance, calculating word-per-minute (WPM) metrics
          and meticulously tracking mistakes. Achieve mastery, and let our
          dynamic leaderboard unveil your progress, igniting the thrill of
          competition as you ascend to the pinnacle of typing excellence.
        </p>
        {currentUser && userRank && (
          <p>
            You are ranked {userRank}
            {userRank === 1
              ? 'st'
              : userRank === 2
              ? 'nd'
              : userRank === 3
              ? 'rd'
              : 'th'}{' '}
            place!
          </p>
        )}
        <div className='flex-grow overflow-auto'>
          {leaderboardData.map((test, index) => {
            return (
              <div
                key={index}
                className={`bg-white border border-gray-200 rounded-md shadow p-6 hover:shadow-md transition-shadow duration-200 mb-4`}
              >
                <h3 className='font-semibold'>
                  {test.user ? test.user.name : 'Anonymous'}

                  <FaUser />
                </h3>
                <p>WPM: {test.wpm}</p>
                <p>Accuracy: {test.accuracy}%</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
