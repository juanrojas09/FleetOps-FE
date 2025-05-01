type ToastProps = {
    title: string
    description: string
  }
  
  export function toast(props: ToastProps) {
    
    console.log(`Toast: ${props.title} - ${props.description}`)
  }
  