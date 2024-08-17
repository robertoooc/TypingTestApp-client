import { Routes, Route } from 'react-router-dom';
import Test from './components/Test/Test';
import Profile from './components/Profile/Profile';
import Home from './components/Home';
import LeaderBoard from './components/LeaderBoard/LeaderBoard';
import SideNavbar from './components/SideBar/SideNavbar';
import SignUp from './components/Auth/SignUp';
import SignIn from './components/Auth/SignIn';
import { GoogleOAuthProvider } from '@react-oauth/google';

const REACT_APP_GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID as string;

export const router = (
  <div className='flex h-screen overflow-hidden'>
    <SideNavbar />
    <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
      <main>
        <div className='mx-auto '>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/test/:id' element={<Test />} />
            <Route
              path='/auth/signup'
              element={
                <GoogleOAuthProvider clientId={REACT_APP_GOOGLE_CLIENT_ID}>
                  <SignUp />
                </GoogleOAuthProvider>
              }
            />
            <Route
              path='/auth/signin'
              element={
                <GoogleOAuthProvider clientId={REACT_APP_GOOGLE_CLIENT_ID}>
                  <SignIn />
                </GoogleOAuthProvider>
              }
            />
            <Route path='/profile' element={<Profile />} />
            <Route path='/profile/:id' element={<Profile />} />
            <Route
              path='/leaderboard'
              element={
                <div>
                  <LeaderBoard />
                </div>
              }
            />
          </Routes>
        </div>
      </main>
    </div>
  </div>
);
