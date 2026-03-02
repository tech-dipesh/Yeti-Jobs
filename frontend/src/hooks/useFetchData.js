import { useState } from "react";

export default function useFetchData(fetchFn) {
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: ""
  });

  const execute = async (params=null) => {
    setState({ data: null, error: "", loading: true });
    try {
      const {data} = await fetchFn(params);
      setState({ data: data.message, error: "", loading: false });
      return data;
    } catch (err) {
      const {response, message}=err;
      const msg = response?.data?.message || message || "Network Error";
      setState({ data: null, error: msg, loading: false });
      return null;
  }
}
  return {...state, execute}
}
