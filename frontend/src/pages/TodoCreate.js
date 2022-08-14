import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Stack, Container, InputLabel, Select, TextField, MenuItem, Grid, Typography, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { selectIsAuth } from '../redux/slices/auth';
import { fetchNewTodo } from '../redux/slices/todo';
import Page from '../components/Page';
import Iconify from '../components/Iconify';

// ----------------------------------------------------------------------

export default function TodoCreate() {
  // const [group, setGroup] = useState('');
  // const [status, setStatus] = useState('');

  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  // const handleChange = (event) => {
  //   setGroup(event.target.value);
  //   setStatus(event.target.value);
  // };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: '',
      group: '',
      comment: '',
      status: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchNewTodo(values));

    if (!data.payload) {
      return alert('Не удалось сделать пост');
    }
  };

  return (
    <Page title="Добавление задач">
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
        <Grid container spacing={3} direction="column" justifyContent="center" alignItems="center">
        <form onSubmit={handleSubmit(onSubmit)}>
                {/* <Box ml={4} mb={4}> */}
                <Stack spacing={2} sx={{ minWidth: 400, mb: 2 }}>
                  <TextField
                    name="title"
                    label="Название"
                    error={Boolean(errors.name?.message)}
                    helperText={errors.name?.message}
                    {...register('title', { required: 'Укажите название' })}
                  />
                  <FormControl>
                    <InputLabel htmlFor="group-select">Группа</InputLabel>
                    <Select
                      id="group-select"
                      // value={group}
                      label="Группа"
                      name="group"
                      {...register('group', { required: 'Укажите группу' })}
                    >
                      <MenuItem value="Отстутсвует">Отстутсвует</MenuItem>
                      <MenuItem value="Twenty">Twenty</MenuItem>
                      <MenuItem value="Thirty">Thirty</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField name="comment" label="Комменатрий" {...register('comment')} />
                  <FormControl>
                    <InputLabel htmlFor="status-select">Статус</InputLabel>
                    <Select
                      id="status-select"
                      // value={status}
                      label="status"
                      name="status"
                      {...register('status', { required: 'Укажите статус' })}
                    >
                      <MenuItem value={10}>Создана</MenuItem>
                      <MenuItem value={20}>В процессе</MenuItem>
                      <MenuItem value={30}>Завершена</MenuItem>
                    </Select>
                  </FormControl>
                  <LoadingButton disabled={!isValid} fullWidth size="large" type="submit" variant="contained">
                    Создать
                  </LoadingButton>
                </Stack>
                {/* </Box> */}
              </form>
        </Grid>
      </Container>
    </Page>
  );
}
