import { useState } from 'react';
import { useNavigate } from 'react-router';
import { register, getUser } from '../../api';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import { useDispatch } from 'react-redux';
import { setStoreUser } from '../../store/user';

import GlobalStyles from '../../ui-kit/GlobalStyles';
import { User } from '../../types/types';

import { useValidation, getProps } from './fieldsConfig';

function LoginScreen() {
  const styles = GlobalStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { validation, handleValidation } = useValidation();

  const [user, setUser] = useState<User>({
    id: '',
    name: '',
    email: '',
    password: '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>, field: string) {
    const value = (e.target as HTMLInputElement).value;

    handleValidation(value, field);

    setUser({ ...user, [field]: value });
  }

  async function handleClick() {
    Object.keys(user).forEach((field: string) => handleValidation(user[field as keyof User] || '', field));

    let fetchedUser;

    try {
      //it throws an error if user is not in data base to improve
      fetchedUser = (await getUser(user.id)) as { data?: User };
    } catch (e) {
      console.error('err', e);
    } finally {
      if (fetchedUser?.data?.id) {
        console.error('user exists');
      } else {
        signUp(user);
      }
    }
  }

  async function signUp(user: User) {
    try {
      register(user);
    } catch (e) {
      console.error(e);
    }

    dispatch(setStoreUser({ ...user }));
    navigate('/');
  }

  function toggleLogin() {
    navigate('/logIn');
  }

  function getIsDisabled(user: User): boolean {
    return !Object.values(user).every(Boolean);
  }

  const fields = ['id', 'password', 'email', 'name'] as const;

  return (
    <Box>
      <Box
        sx={{
          ...styles.borderBox,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '300px',
          padding: '20px 50px',
        }}>
        <h2>Sign up</h2>
        {fields.map((field) => (
          <TextField {...getProps(field, handleChange, validation)} key={field} />
        ))}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button disabled={getIsDisabled(user)} onClick={handleClick} sx={styles.button}>
            Sign Up
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant="body1">
          Already have an account?
          <Link sx={{ cursor: 'pointer', textDecoration: 'none' }} onClick={toggleLogin}>
            Sign In
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default LoginScreen;
