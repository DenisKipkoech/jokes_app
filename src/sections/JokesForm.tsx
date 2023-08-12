import { LoadingButton } from "@mui/lab";
import { CircularProgress, Stack, TextField } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { basePatch, basePost } from "../services/api";
import moment from "moment";
// import moment from "moment";

type Joke = {
  id?: number;
  title?: string;
  author?: string;
  createdAt?: string;
  views?: number;
};

interface Props {
  isEdit?: boolean;
  joke?: Joke;
  loading?: boolean;
}

export default function JokesForm({ isEdit, joke, loading }: Props) {
  const navigate = useNavigate();

  const client = useQueryClient();

  const defaultValues = useMemo(
    () => ({
      title: joke?.title || "",
      author: joke?.author || "",
      views: joke?.views || 0,
    }),
    [joke]
  );

  const { handleSubmit, reset, control } = useForm({
    defaultValues: defaultValues,
  });

  const createJoke = useMutation((data: object) => basePost("", data));

  const updateJoke = useMutation((data: Object) =>
    basePatch(`${joke?.id}`, data)
  );

  useEffect(() => {
    if (isEdit && joke) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, joke]);

  const onSubmitData = (data: Joke) => {
    // data.id = Math.floor(100000 + Math.random() * 900000);

    const payload = {
      id: isEdit ? joke?.id : 28,
      title: data.title,
      author: data.author,
      views: data.views,
      createdAt: isEdit ? data.createdAt : moment().unix(),
    };

    if (isEdit) {
      updateJoke.mutate(payload, {
        onSuccess: () => {
          alert("Joke updated successfully!");
          client.invalidateQueries("all_jokes");
          navigate("/");
        },
        onError: () => {
          alert("Failed to update joke");
        },
      });
    } else {
      createJoke.mutate(payload, {
        onSuccess: () => {
          alert("Joke created successfully!");
          client.invalidateQueries("all_jokes");
          navigate("/");
        },
        onError: () => {
          alert("Failed to create joke");
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitData)}>
      <Stack spacing={3}>
        {loading ? <CircularProgress /> : null}
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField
              //   {...register("title")}
              value={field.value}
              defaultValue={""}
              variant="outlined"
              label="Title"
              required={true}
              disabled={loading}
              size="small"
              type="text"
            />
          )}
        />

        <Controller
          name="author"
          control={control}
          render={({ field }) => (
            <TextField
              //   {...register("title")}
              value={field.value}
              defaultValue={""}
              variant="outlined"
              label="Author"
              required={true}
              disabled={loading}
              size="small"
              type="text"
            />
          )}
        />

        <Controller
          name="views"
          control={control}
          render={({ field }) => (
            <TextField
              //   {...register("title")}
              value={field.value}
              defaultValue={""}
              variant="outlined"
              label="Views"
              required={true}
              disabled={loading}
              size="small"
              type="text"
            />
          )}
        />

        <LoadingButton
          type="submit"
          variant="contained"
          loading={createJoke.isLoading || updateJoke.isLoading}
        >
          Submit Joke
        </LoadingButton>
      </Stack>
    </form>
  );
}
