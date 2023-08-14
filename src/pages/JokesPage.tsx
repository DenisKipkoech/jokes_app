import React, { useState } from "react";

import {
  Button,
  Container,
  Link,
  Stack,
  Typography,
} from "@mui/material";

import MUIDataTable from "mui-datatables";

import { useQuery } from "react-query";
import { baseGet } from "../services/api";

import Header from "../components/Header";

import moment from "moment";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";

type Joke = {
  id?: number;
  title?: string;
  author?: string;
  createdAt?: string;
  views?: number;
};

export default function JokesPage() {
  const navigate = useNavigate();

  const [jokes, setJokes] = useState<Joke[]>([]);


  useQuery("all_jokes", () => baseGet(""), {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setJokes(data.data);
    },
    onError: () => alert("Failed to get jokes!"),
  });

  const onAdd = () => {
    navigate("joke/new");
  };

  const formatAuthor = (val?: string): string => {
    if (val) {
      // eslint-disable-next-line no-useless-escape
      const regex = /@([^\.]+)\./g;
      const replacement = "@***.";

      const result = val.replace(regex, replacement);
      return result;
    } else {
      return "-";
    }
  };

  const formatDate = (val?: string) => {
    if (val) {
      return moment(val).format("DD MMM YYYY");
    } else {
      return "-";
    }
  };

  const getViewColor = (views?: number): string => {
    if (views) {
      if (views >= 0 && views <= 25) {
        return "tomato";
      } else if (views >= 26 && views <= 50) {
        return "orange";
      } else if (views >= 51 && views <= 75) {
        return "yellow";
      } else if (views >= 76 && views <= 100) {
        return "green";
      } else {
        return "grey";
      }
    } else {
      return "grey";
    }
  };

  const columns = [
    {
     name: "title",
     label: "Title",
     options: {
      filter: false,
      sort: false,
      customBodyRenderLite: (dataIndex:number) => (
        <Link component={RouterLink} to={`/joke/${jokes[dataIndex].id}/edit`}>
          {jokes[dataIndex].title|| "-"}
        </Link>
      )
     }
    },
    {
     name: "author",
     label: "Author",
     options: {
      filter: false,
      sort: false,
      customBodyRender: (value: string) => { return formatAuthor(value)}
     }
    },
    {
     name: "createdAt",
     label: "Created Date",
     options: {
      filter: true,
      sort: true,
      customBodyRender: (value: string) => { return formatDate(value)}
     }
    },
    {
     name: "views",
     label: "Views",
     options: {
      filter: true,
      sort: true,
      customBodyRender: (value: number) => (
        <span style={{color: getViewColor(value)}}>{value}</span>
      )
      
     }
    },
  ];

  const options = {
    rowsPerPage: 5,
    rowsPerPageOptions:[5,10]
  }

  return (
    <>
      <Container maxWidth="md">
        <br />
        <Header />
        <br />

        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography variant="h4" fontWeight={700} paragraph>
            Home
          </Typography>
          <div>
            <Button
              color="success"
              variant="contained"
              onClick={onAdd}
              startIcon={<Add />}
            >
              Add Joke
            </Button>
          </div>
        </Stack>

        <MUIDataTable 
          title={''}
          columns={columns}
          data={jokes}
          options={options}
        />

        {/* <TableContainer>
          <Table sx={{}}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, fontSize: 18 }}>
                  Title
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: 700, fontSize: 18 }}
                >
                  Author
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: 700, fontSize: 18 }}
                  onClick={() => handleSort("createdAt")}
                >
                  Created Date
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: 700, fontSize: 18 }}
                  onClick={() => handleSort("views")}
                >
                  Views
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? sortedJokes.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : sortedJokes
              ).map((joke: Joke) => (
                <TableRow key={joke.id}>
                  <TableCell sx={{ borderRight: "1px solid" }}>
                    <Link component={RouterLink} to={`/joke/${joke.id}/edit`}>
                      {joke.title || "-"}
                    </Link>
                  </TableCell>
                  <TableCell align="center" sx={{ borderRight: "1px solid" }}>
                    {formatAuthor(joke?.author)}
                  </TableCell>
                  <TableCell align="center" sx={{ borderRight: "1px solid" }}>
                    {formatDate(joke?.createdAt)}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ color: getViewColor(joke?.views) }}
                  >
                    {joke.views || "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10]}
          count={jokes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Container>
    </>
  );
}
