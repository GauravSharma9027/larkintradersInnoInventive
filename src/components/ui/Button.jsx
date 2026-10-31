// Purpose: Provide one reusable, accessible button component for links and native actions.
import { Link } from "react-router";

const BUTTON_VARIANTS = {
  primary:
    "bg-[#fb5805] text-white shadow-sm hover:bg-[#e94c00] focus-visible:outline-[#fb5805]",
  secondary:
    "border border-white/85 bg-transparent text-white hover:bg-white/10 focus-visible:outline-white",
  whatsapp:
    "bg-[#19b844] text-white shadow-sm hover:bg-[#119c37] focus-visible:outline-[#19b844]",
  outline:
    "border border-[#0b4a90] bg-white text-[#07356f] hover:bg-[#edf6fd] focus-visible:outline-[#0b4a90]",
  text: "bg-transparent text-[#06418a] hover:text-[#f15a0a] focus-visible:outline-[#0b67b7]",
};

const BUTTON_SIZES = {
  small: "min-h-8 px-3 py-2 text-[10px]",
  medium: "min-h-9 px-4 py-2.5 text-[11px]",
  large: "min-h-10 px-5 py-3 text-xs",
  icon: "h-10 w-10 min-h-10 p-0 text-sm",
};

export default function Button({
  to,
  href,
  variant = "primary",
  size = "medium",
  className = "",
  type = "button",
  children,
  ...buttonProperties
}) {
  const buttonClassName = [
    "inline-flex items-center justify-center gap-2 rounded-[4px] font-extrabold leading-none transition-colors duration-150",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    BUTTON_VARIANTS[variant] ?? BUTTON_VARIANTS.primary,
    BUTTON_SIZES[size] ?? BUTTON_SIZES.medium,
    className,
  ].join(" ");

  if (to) {
    return (
      <Link to={to} className={buttonClassName} {...buttonProperties}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={buttonClassName} {...buttonProperties}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={buttonClassName} {...buttonProperties}>
      {children}
    </button>
  );
}
