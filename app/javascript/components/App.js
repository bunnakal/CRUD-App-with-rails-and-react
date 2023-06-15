import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Editor from './Editor';
import { ToastContainer } from 'react-toastify';

const App = () => (
  <>
    <Routes>
      <Route path = "events/*" element = { <Editor />} />
    </Routes>

    <ToastContainer />
  </>
);

export default App;