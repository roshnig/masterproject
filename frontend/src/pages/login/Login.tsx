import { Button } from "@mui/material";
import { IcButton } from "@ukic/react";
//import { lightColors, darkColors } from "../../styles/colors";

const Login = () => {
  return (
    <div style={{ padding: 16 }}>
      <h1>Home</h1>
      <Button variant='contained' color='primary'>
        MUI Button
      </Button>
      <br />
      <br />
      <IcButton color='primary'>UKIC Button</IcButton>

      <br />
      {/* <IcButton
        style={{
          backgroundColor: darkColors.primary,
          color: darkColors.textPrimary,
        }}
      >
        UKIC Button
      </IcButton> */}
    </div>
  );
};

export default Login;
