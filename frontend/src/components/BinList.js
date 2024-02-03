import { useState, useEffect } from 'react';
import { Box, Divider, Grid, List, Typography, Button } from "@mui/material";
import BinItem from './BinItem';
import * as binServices from '../services/bins';

const BinList = () => {
  const [bins, setBins] = useState([]);

  useEffect(() => {
    const fetchBins = async () => {
      const data = await binServices.getBins();

      setBins(data);
      console.log(data);
    }

    try {
      fetchBins();
    } catch (e) {
      console.error(e);
    }
  }, [])

  const boxStyle = {
    width: '100%',
    padding: '10px',
    margin: '10px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
    borderRadius: '8px',
    maxWidth: '90%',
    marginTop: '10%',
    marginLeft:'5%',
    flexShrink: 0,
  };

  return (
    <Box sx={boxStyle}>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Typography variant="h4" sx={{ margin: '30px' }}>
            All Bins
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" sx={{ fontSize: '18px', margin: '30px' }}>Add New</Button>
        </Grid>
      </Grid>
      <Divider variant="middle"/>
      <List>
        {bins.map(bin =>
          <BinItem key={bin.id} bin={bin} />  
        )}
      </List>
    </Box>
  );
};

export default BinList;