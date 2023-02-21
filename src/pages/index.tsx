import ItemsList from "@/components/item-list";
import SearchAppBar from "@/components/search-app-bar";
import { useGetRepo } from "@/hooks/useGetRepo";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";

export default function Home() {
  const { isFetching, error, response, fetchRepo } = useGetRepo();
  const [repoName, setRepoName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetch = setTimeout(() => {
      if (repoName) {
        fetchRepo({ repoName, page: page + 1, rowsPerPage });
      }
    }, 500);

    return () => clearTimeout(fetch);
  }, [repoName, page, rowsPerPage]);

  const handleRowsChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const value = event.target.value;
    setRowsPerPage(Number(value));
    setPage(0);
  };

  const handlePageChange = (
    _event: MouseEvent<HTMLButtonElement> | null,
    page: number,
  ) => {
    setPage(page);
  };

  return (
    <>
      <SearchAppBar onChange={setRepoName} />
      <ItemsList
        isFetching={isFetching}
        data={response}
        error={error}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsChange}
      />
    </>
  );
}
