import { useState, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { getBin, getSse } from '../services/bins';
import RequestDrawer from './RequestsDrawer';
import { Box, Toolbar, Typography } from '@mui/material';

const BinPage = () => {
  const { binId } = useParams();
  const [bin, setBin] = useState({ requests: [] });

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

  useEffect(() => {
    const newSse = getSse(binId);

    newSse.onerror = (error) => {
      console.log('An error occured establishing an SSE connection.');
      newSse.close();
    };

    newSse.onopen = () => {
      console.log('Sse connection establisehd.');
    }

    newSse.addEventListener('newRequest', (event) => {
      const newRequest = JSON.parse(event.data);
      console.log('New Request:', newRequest);

      setBin(bin => {
        if (!bin.requests.find(request => request.mongo_id === newRequest.mongo_id )) {
          return {
            ...bin,
            requests: [newRequest].concat(bin.requests),
          }
        } else {
          return bin;
        }
      });
    });

    console.log(newSse);

    return () => {
      if (newSse) {
        newSse.close();
      }
    }
  }, [binId]);

  return (
    <>
      <RequestDrawer requests={bin.requests} />
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
