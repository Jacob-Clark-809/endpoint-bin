import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Header = () => {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, borderRadius: 1 }}>
      <Toolbar>
        <Typography variant="h5" noWrap component="div">
          Endpoint Bin
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
