import { cva, type VariantProps } from 'class-variance-authority'

export { default as ButtonGroup } from './ButtonGroup.vue'

export const buttonGroupVariants = cva(
    'inline-flex items-center',
    {
        variants: {
            variant: {
                default: '[&>button]:rounded-none [&>button:first-child]:rounded-l-md [&>button:last-child]:rounded-r-md [&>button:not(:first-child)]:border-l-0',
                outline: '[&>button]:rounded-none [&>button:first-child]:rounded-l-md [&>button:last-child]:rounded-r-md [&>button:not(:first-child)]:border-l-0',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
)

export type ButtonGroupVariants = VariantProps<typeof buttonGroupVariants>
