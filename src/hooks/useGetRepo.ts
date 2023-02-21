import { FnFetchGithubRepo, Response } from "@/types";
import { useState } from "react";

export function useGetRepo(): {
  response: Response | null;
  error: any;
  isFetching: boolean;
  fetchRepo: FnFetchGithubRepo;
} {
  const [isFetching, setIsFetching] = useState(false);
  const [response, setResponse] = useState<Response | null>(null);
  const [error, setError] = useState<any>();

  const fetchRepo: FnFetchGithubRepo = async ({
    repoName,
    page,
    rowsPerPage,
  }) => {
    try {
      setIsFetching(true);
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${repoName}&sort=stars&order=desc&page=${page}&per_page=${rowsPerPage}`,
      );
      const result = await response.json();
      setResponse(result);
      return result;
    } catch (error) {
      console.error(error);
      setError(error);
      setResponse(null);
    } finally {
      setIsFetching(false);
    }
  };

  return {
    response,
    error,
    isFetching,
    fetchRepo,
  };
}
