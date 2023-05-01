import React from 'react';
import Home from './pages/Home';
//Bug - This css import doesn't get applied on render 
import './pages/modules/styles/css/App.css';

function App() {
  return (
    <>
      <Home />
    </>
  );
}

export default App;
