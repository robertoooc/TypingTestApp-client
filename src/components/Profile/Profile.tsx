import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getUserById } from '../../redux/actions/userActions';
import blankProfile from '../../Imgs/blankProfile.png';
import Header from '../Header';
import ProfilePictureDisplay from './BasicInfo/ProfilePictureDisplay';
import ProfilePictureUpload from './BasicInfo/ProfilePictureUpload';
import BasicInfo from './BasicInfo/BasicInfo';
import ChartOne from './Charts/Chart';
interface ProfileProps {
  auth: { user: any };
  user: any;
  getUserById: (id: string) => Promise<void>;
}

const Profile = ({ auth, user, getUserById }: ProfileProps) => {
  const navigate = useNavigate();
  const [isPicModalOpen, setPicModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAuthUser, setIsAuthUser] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (!auth.user) navigate('/auth/signin');

    if (auth.user.id === user.id) setIsAuthUser(true);
  }, [auth.user, user, navigate]);

  useEffect(() => {
    async function fetchData() {
      if (!id || id === undefined) {
        navigate(`/profile/${auth.user.id}`);
      } else {
        setLoading(true);
        await getUserById(id);
        setLoading(false);
      }
    }
    fetchData();
  }, [id, getUserById, navigate, auth]);

  if (loading || !user) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header title={'Profile'} test={false} />
      <div className='overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark min-h-screen'>
        <div className='px-4 my-20 pb-6 py-10 text-center lg:pb-8 xl:pb-11.5'>
          <div className='relative mx-auto -mt-22 h-30 w-full max-w-30 rounded-full p-1  sm:h-44 sm:max-w-44 sm:p-3'>
            <ProfilePictureDisplay isAuthUser={isAuthUser} currentPicture={user.profilePic || blankProfile} openModal={() => setPicModalOpen(!isPicModalOpen)} />
          </div>

          {isAuthUser && isPicModalOpen && <ProfilePictureUpload currentPicture={user.profilePic || blankProfile} onClose={() => setPicModalOpen(!isPicModalOpen)} />}

          <BasicInfo isAuthUser={isAuthUser} />
          <ChartOne tests={user.tests} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  auth: state.auth,
  user: state.user,
});

const mapDispatchToProps = (dispatch: any) => ({
  getUserById: (id: string) => dispatch(getUserById(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
