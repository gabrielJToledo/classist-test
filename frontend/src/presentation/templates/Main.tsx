import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from '../home/Home';

const starfieldBackground = require('../../assets/starfield.jpg')

function Main() {
  return (
    <main className=" flex justify-center p-4" style={{backgroundImage: `url(${starfieldBackground})`}}>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </main>
  );
}

export default Main;
