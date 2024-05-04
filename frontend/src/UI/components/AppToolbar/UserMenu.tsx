import React from 'react';
import { Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { User } from '../../../type';
import { logout } from '../../../features/Users/usersThunks';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();

  const handelLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      dispatch(logout());
    }
  };

  return (
    <Grid container alignItems={'center'} gap={1}>
      <strong>Hello, {user.displayName}</strong>

      <Link to={'/add-post'}>Add new item</Link>

      <strong>or</strong>

      <Button color="inherit" onClick={handelLogout}>
        Logout
      </Button>
    </Grid>
  );
};

export default UserMenu;
