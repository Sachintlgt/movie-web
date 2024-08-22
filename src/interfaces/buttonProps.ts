export interface IButtonProps  {
    type?: 'button' | 'submit' | 'reset'
    className?: string
    title?: string
    action?: () => void
    disabled?: boolean
  }
