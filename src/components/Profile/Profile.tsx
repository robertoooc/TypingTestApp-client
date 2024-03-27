import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TestAnalytics from './TestAnalytics';
import AccountSettings from './AccountSettings';
import { currentUser, userData, accountInfo, test } from '../types/types';
import { GrUserSettings } from 'react-icons/gr';

interface Props {
  currentUser: currentUser | null;
}

const Profile: FC<Props> = ({ currentUser }) => {
  const [oldPassword, setOldPassword] = useState(''); // eslint-disable-line
  const [newPassword, setNewPassword] = useState(''); // eslint-disable-line
  const [seeSettings, setSeeSettings] = useState(false); // eslint-disable-line
  const [userData, setUserData] = useState<userData[]>([]);
  const [userInfo, setUserInfo] = useState<accountInfo | null>(null);
  const [showAnalytics, setShowAnalytics] = useState(false); // eslint-disable-line
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('jwt')) {
      navigate('/');
    } else {
      getUserData();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getUserData = async () => {
    try {
      const token = localStorage.getItem('jwt');
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/users`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const {
        name,
        wpm,
        tests,
        email,
      }: { name: string; wpm: number; tests: test[]; email: string } =
        response.data;
      setUserData(tests);
      setUserInfo({ name, wpm, email });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const deleteAccount = async () => { // eslint-disable-line
    try {
      const token = localStorage.getItem('jwt');
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/users`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (response.data.message === 'user deleted') {
        localStorage.removeItem('jwt');
        navigate('/');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const handleSubmit = async () => {// eslint-disable-line
    try {
      const token = localStorage.getItem('jwt');
      await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/users`,
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  // Calculate general data
  const testsTaken = userData.length;
  const highestWPM = userData.reduce(
    (maxWPM, test) => Math.max(maxWPM, test.wpm),
    0
  );

  return (
    <div className='container mx-auto min-w-fit'>
      {/* Profile Header and User Test Data */}
      <div className='flex flex-wrap'>
        {/* Profile Header */}
        <div className='bg-neutral-900 text-white py-4 px-6 mb-6 rounded-lg min-w-full w-full md:w-1/2 lg:w-1/3 xl:w-1/4 md:mr-6'>
          <div>
            <h2 className='text-2xl font-bold'>Profile</h2>
            <p>Welcome, {userInfo?.name}</p>
          </div>
          <div className='flex items-center'>
            <div className='mr-4'>
              <p>Tests Taken: {testsTaken}</p>
            </div>
            <div className='mr-4'>
              <p>Highest WPM: {highestWPM}</p>
            </div>
            <div>
              <p>Email: {userInfo?.email}</p>
            </div>
          </div>
          {/* <div>
            <GrUserSettings
              onClick={() => setSeeSettings(!seeSettings)}
              className='text-gray-500 cursor-pointer'
            />
          </div> */}
        </div>

        {/* User Test Data */}
        <div className='overflow-x-scroll bg-white rounded-lg mb-6 max-h-96 w-full md:w-1/2 lg:w-2/3 xl:w-3/4 md:flex-grow'>
          <div className='min-w-max w-full py-3'>
            <div className='flex items-center justify-between border-b border-gray-200 py-3 px-4'>
              <span className='font-semibold text-gray-700'>WPM</span>
              <span className='font-semibold text-gray-700'>Mistakes</span>
              <span className='font-semibold text-gray-700'>Accuracy</span>
              <span className='font-semibold text-gray-700'>Date</span>
            </div>
            <div className='overflow-y-scroll overflow-x-scroll'>
              {showAnalytics
                ? null
                : userData
                    .slice()
                    .reverse()
                    .map((test) => <UserTestItem key={test._id} test={test} />)}
            </div>
          </div>
        </div>
      </div>

      {/* Account Settings */}
      {/* {seeSettings && (
        <AccountSettings
          oldPassword={oldPassword}
          setOldPassword={setOldPassword}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          handleSubmit={handleSubmit}
          deleteAccount={deleteAccount}
        />
      )} */}

      {/* Test Analytics */}
      <div className='overflow-x-scroll bg-white rounded-lg mb-6 max-h-96 w-full'>
        <TestAnalytics userData={userData} />
      </div>
    </div>
  );
};

const UserTestItem: FC<{ test: test }> = ({ test }) => {
  // Format date
  const date = new Date(test.time).toLocaleDateString('en-US');

  // Find most frequent mistake
  let mostFrequentMistake: string | null = null;
  if (test.mistakes.length > 0) {
    let maxMistake = test.mistakes.reduce((prev, current) => {
      return prev.amount > current.amount ? prev : current;
    });
    mostFrequentMistake = maxMistake?.char;
  }

  return (
    <div className='flex items-center justify-between border-b border-gray-200 py-3 px-4'>
      <span className='text-gray-700'>{test.wpm}</span>
      <span className='text-gray-700'>
        {mostFrequentMistake ? (
          mostFrequentMistake || 'None'
        ) : (
          <span className='text-gray-700'>None</span>
        )}
      </span>
      <span className='text-gray-700'>{test.accuracy}%</span>
      <span className='text-gray-700'>{date}</span>
    </div>
  );
};

export default Profile;
