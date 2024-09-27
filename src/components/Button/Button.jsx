import "./Button.scss";

export default function Button({ buttonText, className, onClick }) {
  return (
    <button className={`button ${className}`} onClick={onClick}>
      {buttonText}
    </button>
  );
}
