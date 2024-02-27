// useFetchData.ts
import { useState, useEffect } from "react";

interface FetchDataResult {
  data: any;
  loading: boolean;
  error: string;
}

const useFetchData = (url: string): FetchDataResult => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Request failed with status " + response.status);
        }
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data: " + error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]); // fetchData will be called whenever `url` changes

  return { data, loading, error };
};

export default useFetchData;
