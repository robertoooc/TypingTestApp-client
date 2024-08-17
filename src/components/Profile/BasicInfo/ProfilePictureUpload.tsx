import { FC, ChangeEvent, useState } from 'react';
import blankProfile from '../../../Imgs/blankProfile.png';
import DeleteConfirmationModal from './DeleteConfirmModal';
import { deleteProfilePicture, uploadProfilePicture } from '../../../redux/actions/userActions';
import { connect } from 'react-redux';

interface ProfilePictureUploadProps {
  currentPicture: string | null;
  uploadProfilePicture: (file: File) => void;
  deleteProfilePicture: () => void;

  onClose: () => void;
}

const ProfilePictureUpload: FC<ProfilePictureUploadProps> = ({
  currentPicture,
  uploadProfilePicture,
  deleteProfilePicture,

  onClose,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      uploadProfilePicture(selectedFile);
      onClose();
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    deleteProfilePicture();
    setShowDeleteModal(false);
    onClose();
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
        <div className='relative p-6 rounded-lg shadow-lg max-w-lg w-full bg-white dark:bg-gray-800'>
          <div className='flex justify-between items-center mb-4'>
            <h3 className='font-medium text-xl'>Your Photo</h3>
            <button onClick={onClose} className='text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'>
              &times;
            </button>
          </div>
          <form>
            <div className='mb-4 flex items-center gap-4'>
              <div className='h-24 w-24 rounded-full overflow-hidden'>
                <img src={currentPicture || blankProfile} alt='User' className='h-full w-full object-cover' />
              </div>
              <div>
                <span className='block mb-2 text-gray-700 dark:text-gray-300'>Edit your photo</span>
                <div className='flex gap-2'>
                  <button type='button' className='text-sm text-blue-600 hover:text-blue-800' onClick={handleDeleteClick}>
                    Delete
                  </button>
                </div>
              </div>
            </div>

            <div id='FileUpload' className='relative mb-6 block w-full cursor-pointer rounded border border-dashed border-blue-500 bg-gray-50 py-6 px-4 dark:bg-gray-700'>
              <input type='file' accept='image/*' name='profilePic' className='absolute inset-0 w-full h-full opacity-0 cursor-pointer' onChange={handleFileChange} />
              <div className='flex flex-col items-center space-y-3'>
                <span className='flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800'>
                  <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z'
                      fill='#3C50E0'
                    />
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z'
                      fill='#3C50E0'
                    />
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z'
                      fill='#3C50E0'
                    />
                  </svg>
                </span>
                <p>
                  <span className='text-blue-600'>Click to upload</span> or drag and drop
                </p>
                <p className='mt-1.5 text-gray-500 dark:text-gray-400'>SVG, PNG, or JPG</p>
                <p className='text-gray-500 dark:text-gray-400'>(max, 800 X 800px)</p>
              </div>
            </div>
            <div className='flex justify-end gap-4'>
              <button
                type='button'
                className='px-4 py-2 font-medium text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600'
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      {showDeleteModal && <DeleteConfirmationModal onConfirm={handleDeleteConfirm} onCancel={handleDeleteCancel} />}
    </>
  );
};

const mapDispatchToProps = {
  deleteProfilePicture,
  uploadProfilePicture,
};

export default connect(null, mapDispatchToProps)(ProfilePictureUpload);
