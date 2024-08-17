import { FC, useState, ChangeEvent, FormEvent } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../../redux/actions/userActions';
import { currentUser } from '../../../types/types';
import { showToast } from '../../../utils/toast';

interface EditInfoProps {
  onClose: () => void;
  user: currentUser;
  updateUser: (data: { name: string; bio: string | null }) => Promise<void>;
}

const EditInfo: FC<EditInfoProps> = ({ onClose, user, updateUser }) => {
  const [data, setData] = useState({
    name: user.name,
    bio: user.bio || '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (data.name.trim() === '') {
      return showToast('error', 'Name is required');
    }

    const userData = {
      name: data.name,
      bio: data.bio.trim() === '' ? null : data.bio.trim(),
    };

    await updateUser(userData);
    onClose();
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center z-999 bg-black bg-opacity-50'>
      <div className='col-span-5 xl:col-span-3'>
        <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
          <div className='border-b border-stroke py-4 px-7 dark:border-strokedark flex justify-between items-center mb-4'>
            <h3 className='font-medium text-black dark:text-white'>Personal Information</h3>
            <button onClick={onClose} className='text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'>
              &times;
            </button>
          </div>
          <div className='p-7'>
            <form onSubmit={handleSubmit}>
              <div className='p-6.5 pt-0'>
                <div className=' flex flex-col xl:flex-row h-0'>
                  <div className='w-full'>
                    <input disabled className='w-full rounded bg-transparent px-5 ' />
                  </div>
                  <div className='w-full'>
                    <input disabled className='w-full rounded bg-transparent px-5 ' />
                  </div>
                </div>

                <div className='mb-4.5'>
                  <label className='mb-2.5 block text-black dark:text-white'>Name</label>
                  <input
                    type='text'
                    name='name'
                    placeholder='Enter Name'
                    value={data.name}
                    onChange={handleChange}
                    className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                  />
                </div>

                <div className='mb-6'>
                  <label className='mb-2.5 block text-black dark:text-white'>Bio</label>
                  <textarea
                    rows={6}
                    name='bio'
                    placeholder='Type your Bio here...'
                    value={data.bio}
                    onChange={handleChange}
                    className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                  ></textarea>
                </div>
              </div>
              <div className='flex justify-end gap-4'>
                <button
                  type='button'
                  className='mt-4 px-4 py-2 font-medium text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-100 dark:bg-gray-700 dark:text-black dark:border-gray-600 dark:hover:bg-gray-600'
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button type='submit' className='text-gray-600 border border-gray-300 mt-4 px-4 py-2 font-medium text-white bg-blue-600 rounded hover:bg-blue-800'>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = {
  updateUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditInfo);
