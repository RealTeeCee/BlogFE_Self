import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Pagination,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import Blog, { Page } from "../models/Blog";

const BlogList = () => {
  const navigate = useNavigate();

  const [blog, setBlog] = useState<Page>({
    content: [],
    empty: false,
    first: false,
    number: 0,
    numberOfElements: 0,
    size: 0,
    totalElements: 0,
    totalPages: 0,
  });

  const [isLogin, setIsLogin] = useState(false);

  const getBlogs = async (page: any) => {
    const resp = await (page
      ? axiosInstance.get(`/blogs?pageNo=${page - 1}`)
      : axiosInstance.get("/blogs"));

    if (resp.status === 200) {
      const {
        content,
        empty,
        first,
        number,
        numberOfElements,
        size,
        totalElements,
        totalPages,
      } = resp.data;

      setBlog({
        content,
        empty,
        first,
        number,
        numberOfElements,
        size,
        totalElements,
        totalPages,
      });
    }
  };

  useEffect(() => {
    const logIn = async () => {
      const data = { username: "user", password: "password" };
      const options = {
        method: "POST",
        // headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify(data),
        url: "http://localhost:8080/login",
      };
      const res = await axiosInstance(options);
      console.log(res);
      return res;
    };

    console.log("RUN LOGIN");
    logIn()
      .then((res) => {
        console.log("Response after login success: ", res);
        setIsLogin(true);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  }, []);

  useEffect(() => {
    if (isLogin) {
      getBlogs(1);
    }
  }, [isLogin]);

  const handleChange = (_e: any, page: any) => {
    getBlogs(page);
  };
  const handleAdd = () => {
    navigate("/blog/create");
  };
  const handleEdit = (blog: Blog) => {
    navigate("/blog/edit", { state: { blog } });
  };
  const handleDelete = (blog: any) => {};

  return (
    <Container>
      <Paper sx={{ padding: "10px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Typography variant="h2" align="center">
              Blogs List
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Button variant="contained" color="success" onClick={handleAdd}>
              Create
            </Button>
          </Grid>
          {blog.content.map((item) => (
            <Grid key={item.blogId} item xs={4} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h4">{item.title}</Typography>
                  <Typography variant="inherit">{item.url}</Typography>
                  <Typography variant="inherit">{item.rating}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(item)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
          <Grid item md={12} xs={12} mt={2}>
            <Stack spacing={1}>
              <Pagination
                count={blog.totalPages}
                page={blog.number + 1}
                onChange={handleChange}
              />
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default BlogList;
