import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setData();
      setError();
      const response = await fetch(url);
      const text = await response.text();
      try {
        // We got the correct response, and received some JSON containing the data.
        const json = JSON.parse(text);
        console.log(json);
        setData(json);
      } catch {
        // We got an error as text.
        setError(text);
        console.log(text);
      }
      console.log("fetch");
      setLoading(false);
    })();
  }, []);

  return {
    data,
    error,
    loading,
  };
}

export default useFetch;
