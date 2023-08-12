import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { baseGet } from "../services/api";

type Joke = {
  id?: number;
  title?: string;
  author?: string;
  createdAt?: string;
  views?: number;
};

export default function JokesPage() {
  const [jokes, setJokes] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useQuery("all_jokes", () => baseGet("/?_page=2&_limit=10"), {
    refetchOnWindowFocus: false,
    onSuccess: (data) => setJokes(data.data),
    onError: () => alert("Failed to get jokes!"),
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Container maxWidth="xl">
        <br />
        <Typography variant="h4" fontWeight={700}>
          Home
        </Typography>

        <TableContainer>
          <Table sx={{}}>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="right">Author</TableCell>
                <TableCell align="right">Created Date</TableCell>
                <TableCell align="right">Views</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? jokes.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : jokes
              ).map((joke: Joke) => (
                <TableRow key={joke.id}>
                  <TableCell>{joke.title || "-"}</TableCell>
                  <TableCell align="right">{joke.author || "-"}</TableCell>
                  <TableCell align="right">{joke.createdAt || "-"}</TableCell>
                  <TableCell align="right">{joke.views || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
            component='div'
            rowsPerPageOptions={[5,10]}
            count={jokes.length}
            rowsPerPage={rowsPerPage} 
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
    </>
  );
}
