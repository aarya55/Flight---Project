import './button.css';

export function Button({ children, variant = "default", className = "", ...props }) {
  const classNameMap = {
    default: "custom-button",
    outline: "custom-button-outline",
  };

  return (
    <button className={`${classNameMap[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
