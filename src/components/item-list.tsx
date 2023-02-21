import { Response } from "@/types";
import {
  Box,
  Chip,
  CircularProgress,
  Link,
  Stack,
  TablePagination as Pagination,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { ChangeEvent, Fragment, MouseEvent } from "react";
import { PaginationActions } from "./pagination-action";

type Props = {
  isFetching: boolean;
  data: Response | null | undefined;
  error: any;
  rowsPerPage: number;
  page: number;
  onRowsPerPageChange: (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void;
  onPageChange: (
    event: MouseEvent<HTMLButtonElement> | null,
    page: number,
  ) => void;
};

export default function ItemsList({
  isFetching,
  data,
  error,
  rowsPerPage,
  page,
  onPageChange,
  onRowsPerPageChange,
}: Props) {
  return (
    <>
      {isFetching && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "100px",
          }}
        >
          <Stack alignItems="center" spacing={2}>
            <CircularProgress />
            <Typography>Getting data...</Typography>
          </Stack>
        </Box>
      )}

      {!isFetching && data && (
        <>
          <List sx={{ bgcolor: "background.paper" }}>
            {data?.items.map((item) => {
              return (
                <Fragment key={item.id}>
                  <ListItem
                    alignItems="flex-start"
                    sx={{ marginBottom: "12px" }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt={item.full_name}
                        src={item.owner.avatar_url}
                      />
                    </ListItemAvatar>
                    <Stack>
                      <Link
                        underline="none"
                        sx={{ cursor: "pointer", width: "fit-content" }}
                        href={item.html_url}
                        target="_blank"
                        rel="noopener"
                      >
                        <ListItemText primary={item.full_name} />
                      </Link>
                      <ListItemText secondary={item.description} />

                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ marginTop: "4px" }}
                      >
                        {item.topics.map((topic) => {
                          return (
                            <Chip
                              key={topic}
                              label={topic}
                              color="primary"
                              variant="outlined"
                            />
                          );
                        })}
                      </Stack>
                    </Stack>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </Fragment>
              );
            })}
          </List>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "24px",
            }}
          >
            <Pagination
              sx={{
                border: 0,
                padding: 0,
              }}
              rowsPerPageOptions={[5, 10, 25, 100]}
              count={data.total_count}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onPageChange}
              onRowsPerPageChange={onRowsPerPageChange}
              ActionsComponent={PaginationActions}
            />
          </Box>
        </>
      )}

      {!isFetching && error && data === null && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "100px",
          }}
        >
          <Typography>Something went wrong!</Typography>
        </Box>
      )}
    </>
  );
}
