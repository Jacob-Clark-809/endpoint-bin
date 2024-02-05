import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { Box, CssBaseline } from '@mui/material';
import Header from './components/Header';


const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/bins');
    }
  }, [location, navigate]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header />
      <Outlet />
    </Box>
  );
}

export default App;
