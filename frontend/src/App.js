import { Box, CssBaseline } from '@mui/material';
import Header from './components/Header';
import { Outlet } from 'react-router';

const App = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header />
      <Outlet />
    </Box>
  );
}

export default App;
