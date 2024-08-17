import { useDispatch } from 'react-redux';
import { createGuest } from '../../redux/actions/authActions';

const ContinueAsGuest = () => {
  const dispatch: any = useDispatch();

  const continueAsGuest = async () => {
    try {
      await dispatch(createGuest());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      onClick={continueAsGuest}
      className='flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50'
    >
      <span>Continue as Guest</span>
    </button>
  );
};

export default ContinueAsGuest;
