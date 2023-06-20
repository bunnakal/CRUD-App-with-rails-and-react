import React from 'react';
import Signup from './Signup';
import Login from './Login';
import Logout from './Logout';
import { useState } from 'react';
import Editor from './Editor';
import { Route, Routes } from 'react-router-dom';

const User = ({currUser, setCurrUser}) => {

  const [show, setShow] = useState(true);

  if (currUser){
    return(
      <div>
        <Routes>
          <Route 
            path = "events/*" 
            element = { 
              <Editor 
                currUser = {currUser} 
                setCurrUser ={setCurrUser} 
              />} 
          />
        </Routes>
      </div>
    );
  }

  return(
    <div>
      {show? 
        <Login 
          setCurrUser={setCurrUser} 
          setShow= {setShow} 
        /> 
        : 
        <Signup 
          setCurrUser={setCurrUser} 
          setShow = {setShow}
        />}
    </div>
  );
};

export default User;


