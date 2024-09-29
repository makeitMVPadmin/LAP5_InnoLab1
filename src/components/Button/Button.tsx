import "./Button.scss";
import { MouseEventHandler } from "react";

type ButtonProps = {
  buttonText: string;
  className: string;
  type?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ buttonText, className, onClick }: ButtonProps) => {
  return (
    <button className={`button ${className}`} onClick={onClick}>
      {buttonText}
    </button>
  );
}

export default Button;
