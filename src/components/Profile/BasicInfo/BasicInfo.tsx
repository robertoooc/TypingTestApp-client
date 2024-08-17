import { FC, useState } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../../redux/actions/userActions';
import EditInfo from './EditInfo';

interface BasicInfoProps {
  user: any;
  updateUser: (data: { name: string; bio: string | null }) => Promise<void>;
  isAuthUser: boolean;
}

const BasicInfo: FC<BasicInfoProps> = ({ user, isAuthUser }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  return (
    <>
      <div className='mt-4'>
        <div className='flex flex-col items-center'>
          <div className='flex items-center justify-center gap-4'>
            <label className='text-sm text-gray-500 dark:text-gray-400'>Name:</label>
            <h3 className='text-2xl font-semibold text-black dark:text-white'>{user.name || 'Anonymous'}</h3>
            {isAuthUser && (
              <button className='ml-4 p-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-800' onClick={() => setEditModalOpen(true)}>
                Edit Info
              </button>
            )}
          </div>
          <div className='flex items-center justify-center gap-4 mt-2'>
            <label className='text-sm text-gray-500 dark:text-gray-400'>Email:</label>
            <span className='text-sm text-gray-500 dark:text-gray-400'>{user.email || 'No email provided'}</span>
          </div>
        </div>
        <div className='mx-auto mt-4.5 mb-5.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]'>
          <div className='flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row'>
            <span className='font-semibold text-black dark:text-white'>{user.tests?.length || 0}</span>
            <span className='text-sm'>Tests Taken</span>
          </div>
          <div className='flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row'>
            <span className='font-semibold text-black dark:text-white'>{user.wpm || 0}</span>
            <span className='text-sm'>WPM</span>
          </div>
        </div>

        <div className='mx-auto max-w-180'>
          <h4 className='font-semibold text-black dark:text-white'>Bio</h4>
          <p className='mt-4.5'>{user.bio || 'No bio provided'}</p>
        </div>
      </div>
      {isEditModalOpen && <EditInfo onClose={() => setEditModalOpen(false)} />}
    </>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.auth.user,
});

const mapDispatchToProps = {
  updateUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(BasicInfo);
