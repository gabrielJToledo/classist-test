import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useAppDispatch } from '../../store/hooks';
import { userInfoFromDB, isAuthenticated } from '../../store/ducks/users/actions';

function Auth() {
  const dispatch = useAppDispatch()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogin = (e: any) => {
    e.preventDefault()

    const queryParams = {
      email: email,
      password: password,
    }

    axios.get(`${process.env.REACT_APP_USER_LOGIN}`, { params: queryParams })
      .then((res) => {
        dispatch(isAuthenticated(true))
        dispatch(userInfoFromDB(res.data))
      })
      .catch((err) => {
        toast.error(`${err.response.data}`);
      });
  };

  const handleRegister = () => {
    const userData = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    axios
      .post(`${process.env.REACT_APP_REGISTER_USER}`, userData).then((res) => {
        toast.success(`${res.data}`)
        setShowRegisterForm(false)

      }).catch((err) => {
        toast.error(`${err.response.data}`);
      });
  };

  return (
    <div className='bg-slate-800 h-screen flex justify-center items-center'>
      <div className='h-96 w-96 bg-slate-300 shadow-lg shadow-black rounded-md flex flex-col justify-center items-center'>
        <h2 className='my-3 text-3xl font-semibold'>
          {showRegisterForm ? 'Criar Conta' : 'Entrar'}
        </h2>

        <form className='flex flex-col items-center'>
          {showRegisterForm ? (
            <>
              <input
                className='my-3 rounded p-2'
                placeholder='E-mail'
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className='my-3 rounded p-2'
                placeholder='Senha'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                className='my-3 rounded p-2'
                placeholder='Confirmar Senha'
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                className='rounded-full bg-cyan-400 px-10 py-3 my-3 font-semibold'
                onClick={handleRegister}
              >
                Criar Conta
              </button>
              <p
                className='text-blue-600 cursor-pointer'
                onClick={() => setShowRegisterForm(false)}
              >
                Voltar para o login
              </p>
            </>
          ) : (
            <>
              <input
                className='my-3 rounded p-2'
                placeholder='E-mail'
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className='my-3 rounded p-2'
                placeholder='Senha'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className='rounded-full bg-cyan-400 px-10 py-3 my-3 font-semibold'
                onClick={handleLogin}
              >
                Entrar
              </button>
              <p
                className='text-blue-600 cursor-pointer'
                onClick={() => setShowRegisterForm(true)}
              >
                Cadastrar conta
              </p>
            </>
          )}
        </form>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Auth;
