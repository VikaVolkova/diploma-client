import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";

function Message({ text, type }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1">{text}</Typography>
      </CardContent>
      <CardActions sx={{ marginLeft: "8px" }}>
        {type === "login" && (
          <>
            <Button href="/login" variant="contained">
              Зайти
            </Button>
            <Button href="/register" variant="contained">
              Зареєструватись
            </Button>
          </>
        )}
        {type === "main" && (
          <>
            <Button href="/" variant="contained">
              Повернутись на головну
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
}

export default Message;
