import {
  Button,
  Container,
  Grid,
  Paper,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const Blog = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isEdit = location.state?.blog.blogId ? true : false;

  const initialBlog = {
    blogId: 0,
    title: "",
    url: "",
    rating: 0,
  };

  const [blog, setBlog] = useState(isEdit ? location.state?.blog : initialBlog);

  const handleChange = (event: any) => {
    setBlog((prev: any) => ({
      ...prev,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    }));
  };

  const handleAdd = () => {
    axiosInstance
      .post("/blogs/add", blog)
      .then((res) => {
        if (res.status === 201) {
          alert("Add blog successfully!!!");
          setBlog(initialBlog);
        }
      })
      .catch((err) => {
        alert("Add blog fail!!!");
      });
  };

  const handleEdit = () => {
    axiosInstance
      .put("/blogs/update", blog)
      .then((res) => {
        if (res.status === 200) {
          alert("Update blog successfully!!!");
          navigate(-1);
        }
      })
      .catch((err) => {
        alert("Add blog fail!!!");
      });
  };

  return (
    <Container>
      <Paper sx={{ padding: "20px" }}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={12}>
            <Typography variant="h3" align="center">
              {isEdit ? "Update Blog" : "Create Blog"}
            </Typography>
          </Grid>
          <Grid item xs={6} md={6}>
            <TextField
              name="blogId"
              label="Id"
              fullWidth
              size="small"
              value={blog.blogId}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <TextField
              name="title"
              label="Title"
              fullWidth
              size="small"
              value={blog.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              name="url"
              label="Url"
              fullWidth
              size="small"
              value={blog.url}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography component="legend">Rating</Typography>
            <Rating
              name="rating"
              size="large"
              value={blog.rating}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={12} textAlign={"center"}>
            <Button
              variant="contained"
              color={isEdit ? "secondary" : "success"}
              size="large"
              onClick={isEdit ? handleEdit : handleAdd}
            >
              Save
            </Button>
            {` `}
            <Button
              variant="contained"
              color={"inherit"}
              size="large"
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Blog;
