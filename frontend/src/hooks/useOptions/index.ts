import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/contsants";
export interface Option {
  enodebId: string;
  cellId: string;
}

export const useOptions = () => {
  const [options, setOptions] = useState<Option[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchOptions = () => {
    fetch(`${API_BASE_URL}/raw-data/options`)
      .then((r) => r.json())
      .then(setOptions)
      .catch(() => setError("Gagal memuat daftar node"));
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  return { options, error, refetch: fetchOptions };
};
