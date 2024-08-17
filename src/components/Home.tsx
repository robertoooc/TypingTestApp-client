import { useState, useEffect } from 'react';
import { FaKeyboard } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { createGuest } from '../redux/actions/authActions';
import { connect } from 'react-redux';

const Home = (props: any) => {
  const [showTypingTestModal, setShowTypingTestModal] = useState(false);
  const [showLoginPromptModal, setShowLoginPromptModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (props.currentUser) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [props.currentUser]);

  const handleCloseTypingTestModal = () => setShowTypingTestModal(false);
  const handleOpenTypingTestModal = () => {
    if (isLoggedIn) {
      setShowTypingTestModal(true);
    } else {
      setShowLoginPromptModal(true);
    }
  };

  const handleCloseLoginPromptModal = () => setShowLoginPromptModal(false);

  const handleLogin = () => {
    navigate('/auth/signin');
  };

  const handleGuestAccount = async () => {
    try {
      setIsLoggedIn(true);
      setShowLoginPromptModal(false);
      await props.createGuest();
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      <Header test={false} title={'SwiftKeys'} />
      <div className='home-container flex flex-col items-center justify-center min-h-screen'>
        <h1 className='text-4xl font-bold mb-4'>Welcome to SwiftKeys.dev</h1>
        <p className='text-lg mb-8'>Enhance your typing skills with our tests and challenges!</p>
        <button onClick={handleOpenTypingTestModal} className='btn-modal-open px-6 py-3 bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'>
          <FaKeyboard className='inline mr-2' /> Start a Typing Test
        </button>

        {showTypingTestModal && (
          <div className='modal fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
            <div className='modal-content bg-white text-black rounded-lg shadow-lg overflow-hidden'>
              <div className='modal-header flex justify-between items-center p-4 border-b border-gray-200'>
                <h2 className='text-xl font-semibold'>Start Typing Test</h2>
                <button onClick={handleCloseTypingTestModal} className='text-gray-600 hover:text-gray-900 focus:outline-none'>
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                  </svg>
                </button>
              </div>
              <div className='modal-body p-6 flex flex-col items-center'>
                <p>Select a random letter to start your typing test!</p>
                <button
                  onClick={handleCloseTypingTestModal}
                  className='mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  Start Test
                </button>
              </div>
            </div>
          </div>
        )}

        {showLoginPromptModal && (
          <div className='modal fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
            <div className='modal-content bg-white text-black rounded-lg shadow-lg overflow-hidden'>
              <div className='modal-header flex justify-between items-center p-4 border-b border-gray-200'>
                <h2 className='text-xl font-semibold'>Hmm... Looks like you're not logged in</h2>
                <button onClick={handleCloseLoginPromptModal} className='text-gray-600 hover:text-gray-900 focus:outline-none'>
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                  </svg>
                </button>
              </div>
              <div className='modal-body p-6 flex flex-col items-center'>
                <p>To continue, please log in or choose to continue with a temporary guest account.</p>
                <div className='mt-4 flex space-x-4'>
                  <button onClick={handleLogin} className='px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                    Go to Log In
                  </button>
                  <button onClick={handleGuestAccount} className='px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                    Continue as Guest
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  currentUser: state.auth.user,
  token: state.auth.token,
});

const mapDispatchToProps = {
  createGuest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
