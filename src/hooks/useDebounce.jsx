import { useEffect, useState } from 'react'

function useDebounce(value, delay) {
    const [deboundValue, setDeboundValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDeboundValue(value), delay)
        // eslint-disable-next-line react-hooks/exhaustive-deps
        return () => clearTimeout(handler)
    }, [value])
    return deboundValue
}

export default useDebounce