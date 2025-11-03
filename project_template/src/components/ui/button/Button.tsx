import { Button as MuiButton, type ButtonProps } from "@mui/material";

interface Props extends ButtonProps {
  label: string;
}

const Button: React.FC<Props> = ({ label, ...props }) => {
  return <MuiButton {...props}>{label}</MuiButton>;
};

export default Button;
