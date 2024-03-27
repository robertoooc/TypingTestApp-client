import { Link } from 'react-router-dom';
import { FC, useState, useEffect } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { FaKeyboard } from 'react-icons/fa';
import { currentUser } from './types/types';

interface Props {
  currentUser: currentUser | null;
  setCurrentUser: (val: currentUser | null) => void;
}

const SideNavbar: FC<Props> = ({ currentUser, setCurrentUser }) => {
  let navigate: NavigateFunction = useNavigate();
  const [randomSuggestion, setRandomSuggestion] = useState<string>('');

  useEffect(() => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const randomLetter = alphabet[Math.floor(Math.random() * 26)];
    setRandomSuggestion(randomLetter);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setCurrentUser(null);
    navigate(0);
  };

  return (
    <div className='bg-neutral-900 w-60 p-3 flex flex-col text-white min-h-full h-full'>
      <div className='flex items-center gap-3 px-1 py-3'>
        <FaKeyboard fontSize={24} />
        <span className='text-neutral-100 text-lg'>Typing Test App</span>
      </div>
      <div className='flex-1'>
        <LinkComponent to={`/test/${randomSuggestion}`} text='Test' />
        {currentUser ? (
          <>
            <LinkComponent to='/profile' text='Profile' />
            <LinkComponent to='/leaderboard' text='LeaderBoard' />
            <span className='link' onClick={handleLogout}>
              Logout
            </span>
          </>
        ) : (
          <>
            <LinkComponent to='/leaderboard' text='LeaderBoard' />
            <LinkComponent to='/register' text='Register' />
            <LinkComponent to='/login' text='Login' />
          </>
        )}
      </div>
    </div>
  );
};

const LinkComponent: FC<{ to: string; text: string }> = ({ to, text }) => (
  <Link
    to={to}
    className='flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'
  >
    <span className='text-xl'>{text}</span>
  </Link>
);

export default SideNavbar;
