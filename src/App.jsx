import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProTip from './ProTip';
import Copyright from './Copyright';
import AppRoutes from './components/AppRoutes';
import Dashi from './components/Dashi';

export default function App() {
  return (
    <>
      <Dashi />
      <AppRoutes />
      
    </>

  );
}
