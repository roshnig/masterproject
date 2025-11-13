import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// import { Link } from "react-router";

const NotFound = () => {
  return (
    // <div>
    //   <Link to='/'>Home</Link>
    //   <h3>Not found Page</h3>
    // </div>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      <Typography variant='h6' noWrap component='div'>
        Requested page not found!
      </Typography>
    </Box>
  );
};

export default NotFound;
