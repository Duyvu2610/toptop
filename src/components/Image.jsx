import images from '../assets/images'
import { forwardRef, useState } from 'react'
const Image = forwardRef(({ src, className, ...props }, ref) => {
    const handleErr = () => {
        setFallBack(images.noImg)
    }
    const [fallBack, setFallBack] = useState("")
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} src={fallBack || src} ref={ref} onError={handleErr} className={`${className} object-cover`} />
})

export default Image