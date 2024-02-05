import { useState, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { getBin } from '../services/bins';
import RequestDrawer from './RequestsDrawer';
import { Box, Toolbar, Typography } from '@mui/material';

const BinPage = () => {
  const { binId } = useParams();
  const [bin, setBin] = useState({});

  useEffect(() => {
    const fetchBin = async () => {
      const data = await getBin(binId);

      setBin(data);
    }

    try {
      fetchBin();
    } catch (e) {
      console.error(e);
    }
  }, [binId]);

  return (
    <>
      <RequestDrawer requests={bin.requests || []} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography variant="h5">
          {`Send HTTP requests to /listen/${bin.endpoint} for inspection.`}
        </Typography>
        <Outlet />
      </Box>
    </>
  )
};

export default BinPage;
