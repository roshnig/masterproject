import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { IcButton } from "@ukic/react";
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  return (
    <Box>
      <div style={{ paddingBottom: 20 }}>Dashboard page!</div>
      <div style={{ paddingBottom: 20 }}>Mui Buttons</div>
      <Stack spacing={2} direction='row'>
        <Button variant='contained'>Contained</Button>
        <Button variant='contained' color='error'>
          Error
        </Button>
      </Stack>
      <div style={{ paddingTop: 20, paddingBottom: 20 }}>UKIC Buttons</div>
      <Stack spacing={2} direction='row'>
        <IcButton variant='primary'>Contained</IcButton>
        <IcButton variant='destructive'>Error</IcButton>
        <IcButton variant='tertiary' className={styles.icBtn}>
          Custom Styles
        </IcButton>
        <IcButton variant='tertiary'>Original</IcButton>
      </Stack>
    </Box>
  );
};

export default Dashboard;
