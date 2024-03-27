import { FC } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';

interface AccountSettingsProps {
  oldPassword: string;
  setOldPassword: (value: string) => void;
  newPassword: string;
  setNewPassword: (value: string) => void;
  handleSubmit: () => void;
  deleteAccount: () => void;
}

const AccountSettings: FC<AccountSettingsProps> = ({
  oldPassword,
  setOldPassword,
  newPassword,
  setNewPassword,
  handleSubmit,
  deleteAccount,
}) => {
  return (
    <div className='bg-black rounded-lg p-4 mb-6'>
      <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
        <div className='flex flex-col'>
          <label htmlFor='oldPassword' className='text-white'>
            Old Password
          </label>
          <input
            type='password'
            id='oldPassword'
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            autoComplete='off'
            required
            className='rounded-lg text-black'
          />
        </div>

        <div className='flex flex-col'>
          <label htmlFor='newPassword' className='text-white'>
            New Password
          </label>
          <input
            type='password'
            id='newPassword'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete='off'
            required
            className='rounded-lg text-black'
          />
        </div>

        <button
          type='submit'
          className='w-full py-2 bg-gray-800 text-white font-semibold rounded-lg'
        >
          Submit
        </button>
      </form>
      <div className='flex items-center w-full mt-4 py-2 text-white font-semibold rounded-lg'>
        <span onClick={deleteAccount} className='pl-5 cursor-pointer'>
          Delete Account
        </span>
        <RiDeleteBin6Line
          onClick={deleteAccount}
          className='ml-1 cursor-pointer'
        />
      </div>
    </div>
  );
};

export default AccountSettings;
