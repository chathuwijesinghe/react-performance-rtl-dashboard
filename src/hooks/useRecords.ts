import { useCallback, useEffect, useState } from "react";
import { getRecords } from "../data/mockApi";
import type { ApiMode, CustomerRecord, RequestStatus } from "../types/record";

interface RecordsState {
  records: CustomerRecord[];
  status: RequestStatus;
  error: string | null;
}

export function useRecords(mode: ApiMode) {
  const [reloadKey, setReloadKey] = useState(0);
  const [state, setState] = useState<RecordsState>({
    records: [],
    status: "loading",
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    async function loadRecords() {
      setState((current) => ({ ...current, status: "loading", error: null }));
      try {
        const data = await getRecords(mode, controller.signal);
        setState({
          records: data,
          status: data.length === 0 ? "empty" : "success",
          error: null,
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setState({
          records: [],
          status: "error",
          error: error instanceof Error ? error.message : "Something went wrong.",
        });
      }
    }

    void loadRecords();
    return () => controller.abort();
  }, [mode, reloadKey]);

  const refetch = useCallback(() => {
    setReloadKey((key) => key + 1);
  }, []);

  return { ...state, refetch };
}
