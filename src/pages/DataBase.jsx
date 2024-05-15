import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  Paper,
  Stack,
  Typography,
  Button,
  Link,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

const columns = [
  "№",
  "ФИО выпускника",
  "Дата рождения",
  "Телефон",
  "Адрес проживания",
];

const DataBase = ({ data, getData }) => {
  //search
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.currentTarget);
    console.log(getData);
    getData(params);
  };

  //pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Container
      maxWidth="false"
      sx={{
        mb: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography component="h1" variant="h4">
        База анкет
      </Typography>
      <Paper
        component="form"
        onSubmit={handleSearchSubmit}
        sx={{
          width: "100%",
          overflow: "hidden",
          p: 2,
          display: "flex",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Stack
          sx={{
            position: "relative",
            width: "100%",
          }}
        >
          <SearchIcon
            sx={{ position: "absolute", left: "10px", top: "10px" }}
          />
          <TextField
            name="fio"
            size="small"
            fullWidth
            label="Поиск выпускника"
            InputLabelProps={{ shrink: true }}
            inputProps={{
              style: {
                paddingLeft: 40,
              },
            }}
          />
        </Stack>
        <Button type="submit" sx={{ width: "180px" }}>
          Поиск
        </Button>
      </Paper>
      <Paper sx={{ width: "100%", overflow: "hidden", px: 2, pt: 2, pb: 2 }}>
        <Button component={RouterLink} to="create">
          Добавить анкету
        </Button>
        <TableContainer>
          <Table aria-label="table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column}
                    sx={{
                      fontSize: "14px",
                      pl: 0,
                      color: "text.secondary",
                      fontWeight: "400",
                    }}
                  >
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, i) => {
                    return (
                      <TableRow tabIndex={-1} key={row.id}>
                        <TableCell
                          sx={{
                            pl: 0,
                            fontSize: "16px",
                          }}
                        >
                          {i + 1}
                        </TableCell>
                        <TableCell
                          sx={{
                            pl: 0,
                            minWidth: "250px",
                            fontSize: "16px",
                          }}
                        >
                          <Link component={RouterLink} to={`person/${row.id}`}>
                            {row.name}
                          </Link>
                        </TableCell>
                        <TableCell
                          sx={{
                            pl: 0,
                            fontSize: "16px",
                          }}
                        >
                          {row.birthDate}
                        </TableCell>
                        <TableCell
                          sx={{
                            pl: 0,
                            fontSize: "16px",
                            minWidth: "150px",
                          }}
                        >
                          {row.phone}
                        </TableCell>
                        <TableCell sx={{ minWidth: "200px" }}>
                          {row.institution}
                        </TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          labelRowsPerPage="Документов на странице"
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data && data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
};

export default DataBase;
