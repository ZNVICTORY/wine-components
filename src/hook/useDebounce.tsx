import { useEffect, useState } from "react";

function useDebounce(value: any, delay = 300) {

    const [debounceValue, setDebounceValue ] = useState(value);
    useEffect(() => {
        const hander = window.setTimeout(() => {
            setDebounceValue(value)
        }, delay)
        return () => {
            clearTimeout(hander)
        }
    }, [value, delay]);
    return debounceValue;
}

export default useDebounce;