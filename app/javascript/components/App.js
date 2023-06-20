import React, { useState } from 'react';
import User from './User';
import { ToastContainer } from 'react-toastify';

const App = () => {

  const [currUser, setCurrUser] = useState(null);

  return(
    <>
      <User currUser = {currUser} setCurrUser = {setCurrUser} />
      
      <ToastContainer />
    </>
  )

};

export default App;