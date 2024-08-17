import { useEffect, useState, FC } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../redux/reducers';
import { fetchLeaderboard, fetchUserList } from '../../redux/actions/leaderboardActions';
import { LeaderboardEntry, UserList } from '../../types/types';
import Header from '../Header';
import TestsLeaderboard from './Lists/TestsLeaderboard';
import UserLeaderboard from './Lists/UserLeaderboard';

interface LeaderBoardProps {
  leaderboardData: {
    leaderboard: LeaderboardEntry[];
    loading: boolean;
    error: string | null;
  };
  userListData: {
    userList: UserList[];
    loading: boolean;
    error: string | null;
  };
  fetchLeaderboard: (page: number, itemsPerPage: number) => void;
  fetchUserList: (page: number, itemsPerPage: number) => void;
}

const LeaderBoard: FC<LeaderBoardProps> = ({ leaderboardData, userListData, fetchLeaderboard, fetchUserList }) => {
  const { leaderboard, loading: leaderboardLoading, error: leaderboardError } = leaderboardData;
  const { userList, loading: userListLoading, error: userListError } = userListData;
  const [currentTab, setCurrentTab] = useState('users');
  const [leaderboardPage, setLeaderboardPage] = useState(1);
  const [userListPage, setUserListPage] = useState(1);

  useEffect(() => {
    fetchLeaderboard(leaderboardPage, 10);
  }, [leaderboardPage]);

  useEffect(() => {
    fetchUserList(userListPage, 10);
  }, [userListPage]);

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
  };

  const handleLeaderboardPageChange = (page: number) => {
    setLeaderboardPage(page);
  };

  const handleUserListPageChange = (page: number) => {
    setUserListPage(page);
  };

  return (
    <div>
      <Header title={'Leaderboard'} test={false} />
      <div className='container mx-auto px-4 pt-8'>
        <div className='flex justify-center space-x-8'>
          <h4
            className={`mb-6 text-xl font-semibold cursor-pointer ${
              currentTab === 'tests' ? 'text-black dark:text-white bg-slate-500 rounded-full px-4 py-1' : 'text-gray-500 dark:text-gray-400'
            }`}
            onClick={() => setCurrentTab('tests')}
          >
            Top Tests
          </h4>
          <h4
            className={`mb-6 text-xl font-semibold cursor-pointer ${
              currentTab === 'users' ? 'text-black dark:text-white  bg-slate-500 rounded-full px-4 py-1' : 'text-gray-500 dark:text-gray-400'
            }`}
            onClick={() => setCurrentTab('users')}
          >
            Top Users
          </h4>
        </div>
        {leaderboardLoading || userListLoading ? (
          <div className='text-center'>Loading...</div>
        ) : leaderboardError || userListError ? (
          <div className='text-center text-red-500'>{leaderboardError || userListError}</div>
        ) : (
          <>
            <div className='rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1'>
              {currentTab === 'users' ? (
                <UserLeaderboard users={userList} onPageChange={handleUserListPageChange} />
              ) : (
                <TestsLeaderboard entries={leaderboard} onPageChange={handleLeaderboardPageChange} />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  leaderboardData: state.leaderboard.leaderboard,
  userListData: state.leaderboard.userList,
});

const mapDispatchToProps = {
  fetchLeaderboard,
  fetchUserList,
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoard);
