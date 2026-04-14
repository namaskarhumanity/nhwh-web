import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const getErrorMessage = (error, fallbackMessage) =>
  error?.response?.data?.message || error?.message || fallbackMessage;

export const useApiResource = ({ url, enabled = true, initialData = null, errorMessage }) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(Boolean(enabled));

  const fetchData = useCallback(async () => {
    if (!enabled || !url) return;

    try {
      setLoading(true);
      const res = await axios.get(url);
      setData(res.data);
    } catch (error) {
      toast.error(getErrorMessage(error, errorMessage || "Failed to load data"));
    } finally {
      setLoading(false);
    }
  }, [enabled, errorMessage, url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, refetch: fetchData, setData };
};
