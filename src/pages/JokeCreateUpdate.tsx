import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { baseDelete, baseGet } from "../services/api";
import { Button, Container, Stack, Typography } from "@mui/material";
import JokesForm from "../sections/JokesForm";
import Header from "../components/Header";
import { LoadingButton } from "@mui/lab";
import { Close, Delete } from "@mui/icons-material";

type Joke = {
  id?: number;
  title?: string;
  author?: string;
  createdAt?: string;
  views?: number;
};

// type JokeInfo = {
//     id?: number;
//     Title?: string;
//     Author?: string;
//     CreatedAt?: number;
//     Views?: number;
// };

export default function JokeCreateUpdate() {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const client = useQueryClient();

  const { id = "" } = useParams();

  const [joke, setJoke] = useState<Joke>({
    title: "",
    author: "",
    createdAt: "",
    views: 0,
  });

  const isEdit = pathname.includes("edit");

  const fetchJoke = useQuery(["get_joke", id], () => baseGet(`/${id}`), {
    refetchOnWindowFocus: false,
    enabled: isEdit,
    onSuccess: (data) => {
      const info: Joke = data.data;
      // console.log(info);
      // setJoke({
      //     id: info?.id,
      //     title: info.Title,
      //     author: info.Author,
      //     createdAt: info.CreatedAt,
      //     views: info.Views
      // })
      setJoke(info);
    },
    onError: () => alert("Failed to get joke!"),
  });

  const deleteJoke = useMutation((id?: number) => baseDelete(`${id}`));

  const onClose = () => {
    navigate("/");
  };

  const onDeleteJoke = (id?: number) => {
    deleteJoke.mutate(id, {
      onSuccess: () => {
        alert("Joke deleted successfully!");
        client.invalidateQueries("all_jokes");
        navigate("/");
      },
      onError: () => {
        alert("Failed to delete joke");
      },
    });
  };

  return (
    <Container maxWidth="md">
      <br />
      <Header />
      <br />

      <Typography variant="h4" paragraph>
        {isEdit ? `Edit ${joke?.title}` : "Add New Joke"}
      </Typography>

      {isEdit && (
        <Stack direction="row" justifyContent={"space-between"}>
          <Button
            variant="outlined"
            color="info"
            onClick={onClose}
            startIcon={<Close />}
          >
            close
          </Button>

          <LoadingButton
            variant="outlined"
            color="error"
            onClick={() => onDeleteJoke(joke?.id)}
            loading={deleteJoke.isLoading}
            startIcon={<Delete />}
          >
            Delete
          </LoadingButton>
        </Stack>
      )}
      <br />

      <JokesForm isEdit={isEdit} joke={joke} loading={fetchJoke.isLoading} />
    </Container>
  );
}
