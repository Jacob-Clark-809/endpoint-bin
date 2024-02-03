import { Grid, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const BinItem = ({ bin }) => {
  const itemStyle = {
    borderRadius: '8px',
    maxWidth: '95%',
    padding: '0px',
    margin: '5px',
  }

  return (
    <ListItem sx={itemStyle}>
      <Link to={`/bins/${bin.id}`} style={{ width: '100%' }}>
        <ListItemButton>
          <ListItemText
            primary={
              <Grid container spacing={1}>
                <Grid item xs={8}>
                  <Typography variant="body1">{bin.endpoint}</Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography variant="body1">Created at:</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body1">{bin.created_at}</Typography>
                </Grid>
              </Grid>
            }
          />
        </ListItemButton>
      </Link>
    </ListItem>
  );
};

export default BinItem;