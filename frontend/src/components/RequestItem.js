import { Grid, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const RequestItem = ({ request }) => {
  return (
    <Link to={`request/${request.id}`} style={{ width: '100%' }}>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemText primary={
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography variant="body1">{`${request.method} ${request.path}`}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">{request.created_at}</Typography>
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
