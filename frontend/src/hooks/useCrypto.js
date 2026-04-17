import { useEffect, useState } from "react";
import {
  mockCryptos,
  mockTopGainers,
  mockNewOnCoinbase,
} from "../data/mock/cryptos";

export function useCryptos(type) {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate a small loading delay for better UX
    setLoading(true);
    const timer = setTimeout(() => {
      try {
        if (type === "gainers") {
          setCryptos(mockTopGainers);
        } else if (type === "new") {
          setCryptos(mockNewOnCoinbase);
        } else {
          setCryptos(mockCryptos);
        }
        setError(null);
      } catch (err) {
        setError("Failed to load data");
        setCryptos([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [type]);

  return { cryptos, loading, error };
}
