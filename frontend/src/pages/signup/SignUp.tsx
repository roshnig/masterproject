import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router";

const SignUp = () => {
  const navigate = useNavigate();
  return (
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
        Sign Up Form
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
          marginTop: 3,
        }}
      >
        <Button variant='contained'>Sign Up</Button>
        <Button variant='contained' onClick={() => navigate("/login")}>
          Back To Login
        </Button>
      </Box>
    </Box>
  );
};

export default SignUp;
