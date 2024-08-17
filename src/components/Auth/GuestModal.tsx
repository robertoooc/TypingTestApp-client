import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { createGuest } from '../../redux/actions/authActions';
import { connect } from 'react-redux';

const GuestModal = (props: any) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (props.auth.user) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [props.auth.user]);

  const handleLogin = () => {
    navigate('/auth/signin');
  };

  const handleGuestAccount = async () => {
    try {
      props.createGuest();
      setIsOpen(false);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      {isOpen && (
        <div className='modal fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
          <div className='modal-content bg-white text-black rounded-lg shadow-lg overflow-hidden'>
            <div className='modal-header flex justify-between items-center p-4 border-b border-gray-200'>
              <h2 className='text-xl font-semibold'>Hmm... Looks like you're not logged in</h2>
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
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    createGuest: () => dispatch(createGuest()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GuestModal);
