import { FC } from 'react';

interface DeleteConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmationModal: FC<DeleteConfirmationModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center z-999 bg-black bg-opacity-50'>
      <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full'>
        <h3 className='font-medium text-xl mb-4'>Confirm Deletion</h3>
        <p className='mb-6'>Are you sure you want to delete your profile picture?</p>
        <div className='flex justify-end gap-4'>
          <button
            onClick={onCancel}
            className='px-4 py-2 font-medium text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600'
          >
            Cancel
          </button>
          <button onClick={onConfirm} className='px-4 py-2 font-medium text-white bg-red-600 rounded hover:bg-red-500'>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
