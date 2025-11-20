import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const Appbar = () => {
  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box>
            <img
              src='./org-logo.jpg'
              alt='org logo'
              data-testid='org-logo'
              width='38'
              height='38'
              style={{ marginTop: "10px", objectFit: "contain" }}
            />
          </Box>
          <Typography
            variant='h6'
            noWrap
            style={{ flexGrow: 1 }}
            sx={{
              marginLeft: 3,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
            }}
          >
            MY APP
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Appbar;
