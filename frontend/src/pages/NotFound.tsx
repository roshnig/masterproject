import usePageMeta from "@/hooks/usePageMeta";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const NotFound = () => {
  usePageMeta({ title: "Not Found", description: "Not found" });
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
        Requested page not found!
      </Typography>
    </Box>
  );
};

export default NotFound;
