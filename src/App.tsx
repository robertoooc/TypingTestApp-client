import { FC, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Test from './components/Test/Test';
import Profile from './components/Profile/Profile';
import Home from './components/Home';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LeaderBoard from './components/LeaderBoard';
import SideNavbar from './components/SideNavbar';

const App: FC = () => {
  interface user {
    name?: string;
    email?: string;
    _id?: string;
    iat?: number;
  }

  let [currentUser, setCurrentUser] = useState<user | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const REACT_APP_GOOGLE_CLIENT_ID = process.env
    .REACT_APP_GOOGLE_CLIENT_ID as string;
  useEffect(() => {
    const token: string | null = localStorage.getItem('jwt');
    setToken(token);
    token ? setCurrentUser(jwt_decode(token)) : setCurrentUser(null);
  }, []);

  return (
    <div className='flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden'>
      <BrowserRouter>
        <SideNavbar currentUser={currentUser} setCurrentUser={setCurrentUser} />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/test/:id'
            element={<Test currentUser={currentUser} token={token} />}
          />
          <Route
            path='/register'
            element={
              <GoogleOAuthProvider clientId={REACT_APP_GOOGLE_CLIENT_ID}>
                <Register
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              </GoogleOAuthProvider>
            }
          />
          <Route
            path='/login'
            element={
              <GoogleOAuthProvider clientId={REACT_APP_GOOGLE_CLIENT_ID}>
                <Login
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              </GoogleOAuthProvider>
            }
          />
          <Route
            path='/profile'
            element={<Profile currentUser={currentUser} />}
          />
          <Route
            path='/leaderboard'
            element={
              <div>
                <LeaderBoard currentUser={currentUser} />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
