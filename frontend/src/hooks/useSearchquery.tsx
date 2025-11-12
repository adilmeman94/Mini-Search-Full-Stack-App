import { useMutation } from "@tanstack/react-query";

const SERVER_URL = import.meta.env.VITE_API_BASE_URL;

interface SearchResult {
  id: string;
  title: string;
  snippet: string;
  score: number;
}

interface SearchResponseOk {
  results: SearchResult[];
  message?: string;
  summary?: string;
  sources?: string[];
}

interface SearchError {
  message: string;
}

async function __searchFaqs(query: string): Promise<SearchResponseOk> {
  const trimmed = query.trim();

  const res = await fetch(`${SERVER_URL}/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: trimmed }),
  });

  if (!res.ok) {
    const errData = (await res.json().catch(() => ({}))) as SearchError;
    throw new Error(
      errData?.message
        ? `${errData.message} (${res.status})`
        : `Search failed (${res.status})`
    );
  }

  const data = (await res.json()) as SearchResponseOk;
  return data;
}

const useSearchQuery = (mutationOptions?: any) => {
  return useMutation<SearchResponseOk, Error, string>({
    mutationFn: async (query: string) => {
      return await __searchFaqs(query);
    },
    ...mutationOptions,

    onSuccess: (data) => {
      mutationOptions?.onSuccess?.(data);
    },

    onError: (err: unknown) => {
      const error = err as Error;
      mutationOptions?.onError?.(error);
      console.error("Error during search:", error);
    },
  });
};

export default useSearchQuery;
