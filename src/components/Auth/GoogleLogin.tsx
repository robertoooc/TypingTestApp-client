/* eslint-disable import/no-anonymous-default-export */
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true,
});
const googleAuth = (code: string) =>
  api.post(`${process.env.REACT_APP_SERVER_URL}/auth/google?code=${code}`);

export default (props: any) => {
  const navigate = useNavigate();
  const responseGoogle = async (authResult: any) => {
    try {
      if (authResult['code']) {
        const result = await googleAuth(authResult.code);
        const { user, token } = result.data;
        localStorage.setItem('jwt', token);
        props.setCurrentUser(user);
        navigate('/');
      } else {
        throw new Error(authResult);
      }
    } catch (e) {
      alert(e);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: 'auth-code',
  });

  return (
    <button
      onClick={googleLogin}
      className='w-full my-5 py-2 bg-zinc-700 text-white font-semibold rounded-lg'
    >
      Sign in with Google
    </button>
  );
};
