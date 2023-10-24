import React from 'react';
import logo from './logo.svg';
import './App.css';
import ImportWallet from './pages/ImportWallet';
import Logged from './pages/Logged';
import { CheckIfLocalEmpty } from './stores/LocalStorage';
import { Box } from '@mui/material';
import { Providers } from './components/providers';
import { Router, BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <Box className="App">
      <header className="App-header">
          <CheckLogged />
      </header>
    </Box>
  );
}

const CheckLogged = () => {
  return (CheckIfLocalEmpty()) ? <ImportWallet /> : <Logged />;
}
export default App;
