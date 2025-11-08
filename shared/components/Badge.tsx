import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/shared/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-md px-3 py-1 text-xs font-montserrat font-semibold transition-all duration-200',
  {
    variants: {
      variant: {
        default:
          'bg-secondary text-primary shadow-sm',
        secondary:
          'bg-primary text-white',
        outline:
          'border-2 border-secondary text-secondary bg-transparent',
        success:
          'bg-green-100 text-green-800 border border-green-200',
        warning:
          'bg-amber-100 text-amber-800 border border-amber-200',
        destructive:
          'bg-red-100 text-red-800 border border-red-200',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
