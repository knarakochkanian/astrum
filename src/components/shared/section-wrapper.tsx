import { cn } from "@/lib/utils";
import type { ReactNode, HTMLAttributes } from "react";

interface SectionWrapperProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements; 
}

export function SectionWrapper({ children, className, id, as: Comp = 'section', ...props }: SectionWrapperProps) {
  return (
    <Comp id={id} className={cn("py-12 md:py-16 lg:py-20", className)} {...props}>
      <div className="container mx-auto px-4 md:px-6">
        {children}
      </div>
    </Comp>
  );
}
