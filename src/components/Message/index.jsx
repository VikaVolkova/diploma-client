import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";

function Message() {
  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1">
          Тільки зареєстровані користувачі можуть залишати повідомлення.
          Будь-ласка зайдіть або зареєструйстесь.
        </Typography>
      </CardContent>
      <CardActions sx={{ marginLeft: "8px" }}>
        <Button href="/login" variant="contained">
          Зайти
        </Button>
        <Button href="/register" variant="contained">
          Зареєструватись
        </Button>
      </CardActions>
    </Card>
  );
}

export default Message;
