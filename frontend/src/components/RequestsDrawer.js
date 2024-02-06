import { Drawer, Toolbar } from '@mui/material';
import RequestList from './RequestList';

const drawerWidth = '30%';

const RequestDrawer = ({ requests }) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
      PaperProps={
        {
          sx: {
            backgroundColor: '#89CFF0'
          }
        }
      }
    >
      <Toolbar />
      <RequestList requests={requests} />
    </Drawer>
  );
};

export default RequestDrawer;
