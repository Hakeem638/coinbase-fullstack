import { useEffect, useState } from "react";
import { getApiUrl } from "../utils/api";

export function useCryptos(type) {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCryptos = async () => {
      setLoading(true);
      try {
        let endpoint = `${getApiUrl()}/api/crypto`;
        if (type === "gainers") {
          endpoint += "/gainers";
        } else if (type === "new") {
          endpoint += "/new";
        }

        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setCryptos(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setCryptos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptos();
  }, [type]);

  return { cryptos, loading, error };
}
