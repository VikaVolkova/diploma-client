import React, { useState } from "react";
import { Button, CircularProgress, FormHelperText, Stack } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import QueryHandler from "../../api";
import PropTypes from "prop-types";
import MDEditor from "@uiw/react-md-editor";

const validationSchema = yup
  .object({
    text: yup.string().required(),
  })
  .required();

function AddComment({ articleId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      text: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = ({ text }) => {
    setServerError("");
    setIsLoading(true);

    QueryHandler.createComment(text, articleId)
      .then(() => {
        reset();
      })
      .catch(() => {
        setServerError("Server Error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const isButtonDisabled = Object.keys(errors).length > 0 || isLoading;

  return (
    <Stack component="form" spacing={2} onSubmit={handleSubmit(onSubmit)}>
      {!!serverError && <FormHelperText error>{serverError}</FormHelperText>}
      <Controller
        name="text"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <div data-color-mode="light">
            <MDEditor {...field} preview="edit" />
            {errors.text && (
              <FormHelperText error>{errors.text?.message}</FormHelperText>
            )}
          </div>
        )}
      />
      <Button
        type="submit"
        variant="contained"
        size="medium"
        sx={{ marginTop: "15px" }}
        disabled={isButtonDisabled}
        startIcon={isLoading && <CircularProgress size={20} />}
      >
        Add comment
      </Button>
    </Stack>
  );
}

AddComment.propTypes = {
  articleId: PropTypes.number.isRequired,
};

export default AddComment;
