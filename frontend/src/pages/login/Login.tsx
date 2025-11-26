import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
//import { IcButton } from "@ukic/react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import usePageMeta from "@/hooks/usePageMeta";
//import { lightColors, darkColors } from "../../styles/colors";

const Login = () => {
  usePageMeta({ title: "My Org Login", description: "My Org Login" });
  const { handleLogin } = useAuth();
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
        Welcome To My org!
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
        <Button
          variant='contained'
          onClick={handleLogin}
          aria-label='Login Button'
        >
          Login
        </Button>
        <Button
          variant='contained'
          onClick={() => navigate("/signup")}
          aria-label='SignUp Button'
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
