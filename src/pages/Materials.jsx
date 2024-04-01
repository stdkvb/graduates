import { useEffect, useState } from "react";
import { Container, Paper, Stack, Typography, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";

import Api from "../utils/api";

const columns = ["Наименование материала", "Описание", "Дата", ""];

const Materials = () => {
  const [materials, setMaterials] = useState();
  const [loading, setLoading] = useState(true);

  //get data
  const getMaterials = () => {
    Api.get(`/material/get-list`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        setMaterials(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.response.data);
      });
  };

  useEffect(getMaterials, []);

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
        Методические материалы
      </Typography>
      {loading ? (
        <CircularProgress
          sx={{
            position: "absolute",
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
            margin: "auto",
          }}
        />
      ) : (
        <>
          {!materials ? (
            <Typography
              color="text.secondary"
              sx={{
                width: "fit-content",
                height: "fit-content",
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                margin: "auto",
              }}
            >
              Методических материалов пока нет
            </Typography>
          ) : (
            <Paper
              sx={{
                width: "100%",
                overflow: "hidden",
                px: 2,
              }}
            >
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
                    {materials &&
                      materials
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                          return (
                            <TableRow tabIndex={-1} key={row.id}>
                              <TableCell
                                sx={{
                                  pl: 0,
                                  minWidth: "250px",
                                }}
                              >
                                <Stack
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    gap: 2,
                                    fontSize: "16px",
                                  }}
                                >
                                  <InsertDriveFileOutlinedIcon
                                    sx={{ mt: "-4px" }}
                                  />
                                  {row.name}
                                </Stack>
                              </TableCell>
                              <TableCell
                                sx={{
                                  pl: 0,
                                  fontSize: "16px",
                                }}
                              >
                                {row.description}
                              </TableCell>
                              <TableCell
                                sx={{
                                  pl: 0,
                                  fontSize: "16px",
                                  minWidth: "150px",
                                }}
                              >
                                {row.date}
                              </TableCell>
                              <TableCell sx={{ minWidth: "200px" }}>
                                <Button
                                  component="a"
                                  variant="text"
                                  href={row.file.url}
                                  target="_blank"
                                >
                                  Скачать документ
                                </Button>
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
                count={materials && materials.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          )}
        </>
      )}
    </Container>
  );
};

export default Materials;
