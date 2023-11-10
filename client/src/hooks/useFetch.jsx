import { useState, useEffect } from 'react';

function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=> {
    setLoading(true)
    fetch(url, options)
    .then(res => res.json())
    .then(res => setData(res))
    .catch(error => setError(error)) 
  }, [url, options])

  return {data, loading, error}
}

export default useFetch;
