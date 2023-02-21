import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Box, IconButton } from "@mui/material";
import { MouseEvent } from "react";

type Props = {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: MouseEvent<HTMLButtonElement>, newPage: number) => void;
};

export const PaginationActions = (props: Props) => {
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleBackButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  return (
    <Box sx={{ display: "flex", marginLeft: "auto" }}>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        sx={{
          padding: "0 !important",
          marginRight: "12px !important",
          marginLeft: "12px !important",
        }}
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        sx={{
          padding: "0 !important",
        }}
      >
        <KeyboardArrowRight />
      </IconButton>
    </Box>
  );
};
