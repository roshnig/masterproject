import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
//import { IcButton } from "@ukic/react";
import { useNavigate } from "react-router";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import Alert from "node_modules/@mui/material/Alert";
import Stack from "node_modules/@mui/material/Stack";
import CircularProgress from "node_modules/@mui/material/CircularProgress";
import TextField from "node_modules/@mui/material/TextField";
//import usePageMeta from "@/hooks/usePageMeta";
//import { lightColors, darkColors } from "../../styles/colors";

type LoginFormData = {email: string; password:string;}

const Login = () => {
  //usePageMeta({ title: "My Org Login", description: "My Org Login" });  //was getting errors in tests

  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginFormData>({email:'', password:''});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setFormData({...formData, [e.target.name]: e.target.value})
  }

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate("/", { replace: true });
    } catch (err: any) {
      setError(err.message || "Login Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
      {/* <Paper sx={{ p: 4, width: 360 }}> */}
      <Box sx={{ p: 4, width: 360 }}>
        <Typography variant="h5" mb={2} textAlign="center">
          Welcom to my org!
        </Typography>
        <Box component="form" onSubmit={handleSubmit} mt={2} autoComplete="on">
          <Stack spacing={2}>
            <TextField
              label="Email"
              name='email'
              type='email'
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              //variant='filled'
            />
             <TextField
              label="Password"
              name='password'
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
             // variant='filled'
            />

            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? <CircularProgress size='28px' data-testid='login-loader'/>: "Login"}
            </Button>
          </Stack>
           {error && <Alert severity="error" sx={{my:2}}>{error}</Alert>}
        </Box>
        </Box>
      {/* </Paper> */}
    </Box>
  );
};

export default Login;
