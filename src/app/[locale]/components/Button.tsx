import { IButtonProps } from "@/interfaces/buttonProps";
import React from "react";
// common button component
const Button: React.FC<IButtonProps> = ({
  type = "button",
  className = "",
  title = "Click me",
  action,
  disabled = false
}) => {
  return (
    <button disabled={disabled} type={type} className={className} onClick={action}>
      {title}
    </button>
  );
};

export default Button;
