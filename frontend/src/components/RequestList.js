import { Box, Divider, List, ListItem, ListItemButton, ListItemText,  } from "@mui/material";
import { Link } from "react-router-dom";
import RequestItem from "./RequestItem";

const RequestList = ({ requests }) => {
  return (
    <Box sx={{ overflow: 'auto' }}>
      <List>
        <Link to="/bins" style={{ width: '100%', textDecoration: 'none', color:'black' }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Back" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider />
        <ListItem disablePadding>
            <ListItemText primary="Requests" primaryTypographyProps={{ variant: 'h6' }}/>
        </ListItem>
        {requests.map(request =>
         <RequestItem key={request.id} request={request} /> 
        )}
      </List>
    </Box>
  )
};

export default RequestList;