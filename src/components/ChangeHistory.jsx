import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  Paper,
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
} from "@mui/material";

import Api from "../utils/api";
import Search from "../components/Search";

const columns = ["№", "Дата и время", "ФИО сотрудника", "Действие"];

const ChangeHistory = ({ personId }) => {
  const [data, setData] = useState();
  const [error, setError] = useState();

  //get data
  const getData = () => {
    Api.get(`/questionnaire/get-history/` + `${personId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        setError();
        setData(res.data.data);
      })
      .catch((error) => {
        setData();
        setError(error.response.data.message);
      });
  };
  useEffect(getData, []);

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
    <div>
      <Typography variant="h5">История изменений</Typography>
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
                            {row.date}
                          </TableCell>
                          <TableCell
                            sx={{
                              pl: 0,
                              fontSize: "16px",
                            }}
                          >
                            {row.fio}
                          </TableCell>
                          <TableCell
                            sx={{
                              pl: 0,
                              fontSize: "16px",
                              minWidth: "150px",
                            }}
                          >
                            {row.action}
                          </TableCell>
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            labelRowsPerPage="Показывать по:"
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
    </div>
  );
};

export default ChangeHistory;
