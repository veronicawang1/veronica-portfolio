import type React from "react";
import { Button } from "../ui/button";

interface MovingElementProps {
  children: React.ReactNode;
  className?: string;
  change?: () => void;
  toChange?: boolean;
  ariaLabel: string;
}

export const MovingElement: React.FC<MovingElementProps> = ({
  children,
  className = "",
  change,
  toChange = true,
  ariaLabel,
}) => {
  return (
    <Button
      variant={toChange ? "ghost" : undefined}
      onClick={change}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </Button>
  );
};
