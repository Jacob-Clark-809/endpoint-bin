import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ borderRadius: 1 }}>
        <Toolbar>
          <Typography variant="h5" component="div" sc={{ flexGrow: 1}}>
            Endpoint Bin
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
