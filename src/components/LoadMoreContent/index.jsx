import React, { useEffect } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import { useLoading } from "../../useLoading";
import PropTypes from "prop-types";

export const LoadMoreContent = ({ render: Render, request, type }) => {
  const getData = useLoading(request);

  useEffect(() => {
    getData.setData([]);
    getData.onLoading();
  }, [request]);
  const data = getData.data;

  const removeItem = (id) =>
    getData.setData((prev) => prev.filter((item) => item.id !== id));

  return (
    <>
      <Render data={data} type={type} removeItem={removeItem} />
      {getData.isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        getData.showLoadMore && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="outlined"
              size="large"
              onClick={getData.onLoading}
              sx={{
                width: 460,
                height: 60,
                margin: "0 auto",
              }}
            >
              LOAD MORE
            </Button>
          </div>
        )
      )}
    </>
  );
};

LoadMoreContent.propTypes = {
  render: PropTypes.func.isRequired,
  request: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  type: PropTypes.string,
};
