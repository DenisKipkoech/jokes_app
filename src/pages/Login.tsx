import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import { v4 as uuidV4 } from "uuid";

export default function Login() {
  const navigate = useNavigate();

  const generate_token = () => {
    const token = uuidV4();
    localStorage.setItem("key", token);
    navigate("/");
  };

  return (
    <Stack
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"100vh"}
      gap={6}
    >
      <Typography variant="h5">Login To Continue</Typography>
      <Button variant="contained" onClick={generate_token}>
        Authenticate
      </Button>
    </Stack>
  );
}
