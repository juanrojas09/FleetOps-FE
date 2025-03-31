import * as React from "react"
import { cn } from "../../lib/utils"

const badgeVariants = {
  variant: {
    default: "bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/80",
    outline: "text-foreground border border-input hover:bg-accent hover:text-accent-foreground",
    success: "bg-green-500 text-white hover:bg-green-600",
    warning: "bg-amber-500 text-white hover:bg-amber-600",
    info: "bg-blue-500 text-white hover:bg-blue-600",
  },
  size: {
    default: "px-2.5 py-0.5 text-xs",
    sm: "px-2 py-0.5 text-xs",
    lg: "px-3 py-1 text-sm",
  }
}

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof badgeVariants.variant
  size?: keyof typeof badgeVariants.size
}

function Badge({
  className,
  variant = "default",
  size = "default",
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        badgeVariants.variant[variant],
        badgeVariants.size[size],
        className
      )}
      {...props}
    />
  )
}

export { Badge, badgeVariants }