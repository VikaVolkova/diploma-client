import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import QueryHandler from "../../api";
// import roles from "../../constants/roles";
// import useAuth from "../../useAuth";
// import { useLoading } from "../../useLoading";
// import ActionPanel from "../ActionPanel";
import Comment from "../Comment";

export const CommentsList = ({ data, type, removeItem }) => {
  //   const { user } = useAuth();
  //   const getComments = useLoading(QueryHandler.unpubshishedComments);

  //   useEffect(() => {
  //     getComments.onLoading();
  //   }, []);

  //   const publishComment = async (id) => {
  //     try {
  //       await QueryHandler.publishComment(id);
  //       removeItem(id);
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //   };

  //   const removeComment = async (id) => {
  //     try {
  //       await QueryHandler.deleteComment(id);
  //       removeItem(id);
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //   };
  return data.map((comment) => (
    <div key={comment._id}>
      {/* {type === "unpublished" ? (
        <>
          <Typography
            sx={{ display: "inline", mr: "15px" }}
            component="span"
            variant="body2"
            color="text.primary"
          >
            Comment for{" "}
            <Link
              to={`/news/${comment.articleId.url}`}
              style={{
                color: "royalblue",
                textDecoration: "none",
                fontFamily: "sans-serif",
                fontSize: 14,
              }}
            >
              {comment.articleId.title}
            </Link>
            :
          </Typography>
          <CommentElement comment={comment} />
          {[roles.admin, roles.manager].includes(user.role) && (
            <ActionPanel
              handlePublish={() => {
                publishComment(comment.id);
              }}
              handleDelete={() => {
                removeComment(comment.id);
              }}
            />
          )}
        </>
      ) : ( */}
      <Comment comment={comment} />
      {/* )} */}
    </div>
  ));
};
