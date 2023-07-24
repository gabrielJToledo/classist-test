import React from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './presentation/templates/Header';
import Main from './presentation/templates/Main';
import Auth from './presentation/auth/Auth';

import { useAppSelector } from './store/hooks';


function App() {
  const isAuthenticated = useAppSelector(state => state.userReducer.isAuthenticated)

  if (!isAuthenticated) {
    return <Auth />;
  }

  return (
    <div className="app">
      <Header />
      <Main />
    </div>
  );
}

export default App;
