import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
  Stack,
  Button,
  Container,
  Typography,
  Box,
  Card,
  CardActions,
  CardContent,
  Grid,
  CircularProgress,
  Chip,
  Divider,
} from '@mui/material';
import { selectIsAuth } from '../redux/slices/auth';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import { fetchTodo } from '../redux/slices/todo';

export default function User() {
  const dispatch = useDispatch();
  const { todo } = useSelector((state) => state.todo);
  const isTodoLoading = todo.status === 'loading';
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    dispatch(fetchTodo());
  }, []);

  const date = (param) => {
    const dateNew = new Date(param);
    const data = dateNew.toLocaleDateString('en-US');
    return data;
  };

  return (
    <Page title="Задачи">
      <Container>
      
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Задачи
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/app/todo/create"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Создать
          </Button>
        </Stack>
        <Grid container spacing={3}>
          {/* <Grid item xs={12} sm={3}> */}
          {(isTodoLoading ? [...Array(1)] : todo.items).map((obj, index) =>
            isTodoLoading ? (
              <Box key={index} sx={{ display: 'inline-block' }}>
                <CircularProgress />
              </Box>
            ) : (
              <Box ml={2} mb={2}>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Chip color="info" size="small" label={obj.group} sx={{ mb: 0.5 }} />
                    <Typography variant="h5" component="div">
                      {obj.title}
                    </Typography>
                    <Typography color="text.secondary">{obj.comment}</Typography>
                  </CardContent>
                  <Divider variant="middle" />
                  <CardActions>
                    <Button size="small">Подробнее</Button>
                    {/* <AccessTimeIcon /> */}
                    {/* <Typography variant="body2">{date(obj.createdAt)}</Typography> */}
                  </CardActions>
                </Card>
              </Box>
            )
          )}
        </Grid>
        {/* </Grid> */}
      </Container>
    </Page>
  );
}
