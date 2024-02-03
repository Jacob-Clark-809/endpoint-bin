import { useRouteError, Link } from "react-router-dom";
import { Box, Button, Typography } from '@mui/material';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h1">
        Oops!
      </Typography>
      <Typography variant="h6">
        Sorry, an unexpected error has occured.
      </Typography>
      <Typography variant="h6" style={{ color: 'grey' }}>
        {error.statusText || error.message}
      </Typography>
      <Link to="/">
        <Button variant="contained">Back Home</Button>
      </Link>
    </Box>
  );
}

export default ErrorPage;
