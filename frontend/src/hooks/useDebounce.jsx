import { useState, useEffect } from "react";

export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const clock = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(clock);
  }, [value]);

  return debouncedValue;
}
