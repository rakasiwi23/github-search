export type Response = {
  incomplete_result: boolean;
  total_count: number;
  items: {
    id: number;
    full_name: string;
    description: string;
    html_url: string;
    owner: {
      avatar_url: string;
    };
    topics: string[];
  }[];
};

type Params = {
  repoName: string;
  rowsPerPage: number;
  page: number;
};

export type FnFetchGithubRepo = ({
  repoName,
  page,
  rowsPerPage,
}: Params) => Promise<Response>;
