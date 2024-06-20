import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  Paper,
  Stack,
  Typography,
  Button,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import Api from "../utils/api";
import Search from "../components/Search";

const columns = [
  "№",
  "ФИО выпускника",
  "Дата рождения",
  "Телефон",
  "Наименование учреждения",
];

const DataBase = ({ title, my }) => {
  const [data, setData] = useState();
  const [error, setError] = useState();

  //get data
  const getData = (params) => {
    Api.get(
      `/questionnaire/get-list?` +
        `${new URLSearchParams(params)}` +
        `&my=${my}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => {
        setError();
        setData(res.data.data);
      })
      .catch((error) => {
        setData();
        setError(error.response.data.message);
      });
  };
  useEffect(getData, [my]);

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
        {title}
      </Typography>
      <Search onSubmit={getData} />
      <Paper sx={{ width: "100%", overflow: "hidden", px: 2, pt: 2, pb: 2 }}>
        <Button component={RouterLink} to="/create">
          Добавить анкету
        </Button>

        {data && (
          <>
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
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
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
                              <Link
                                component={RouterLink}
                                to={`/person/${row.id}`}
                              >
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
          </>
        )}
        {error && <Typography sx={{ pt: 2 }}>{error}</Typography>}
      </Paper>
    </Container>
  );
};

export default DataBase;
