import { Grid, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import formatTimestamp from "../helpers/formatTimestamp";

const RequestItem = ({ request }) => {
  return (
    <Link to={`request/${request.mongo_id}`} style={{ width: '100%', textDecoration: 'none', color:'black' }}>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemText primary={
              <Grid container spacing={1}>
                <Grid item xs={8}>
                  <Typography variant="body1">{`${request.method} ${request.path}`}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1">{formatTimestamp(request.created_at)}</Typography>
                </Grid>
              </Grid>
            }
          />
        </ListItemButton>
      </ListItem>
    </Link>
  )
};

export default RequestItem;
