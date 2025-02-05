import { useState } from 'react';
import { apiService } from '../../api';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import { useDispatch } from 'react-redux';
import { setStoreUser } from '../../store/user';

import GlobalStyles from '../../ui-kit/GlobalStyles';
import { User } from '../../types/types';
import { useNavigate } from 'react-router';
import { getProps } from './fieldsConfig';

function LoginScreen() {
  const styles = GlobalStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState<User>({ id: '', password: '' });
  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>, field: string) {
    const value = (e.target as HTMLInputElement).value;

    setUser({ ...user, [field]: value });
  }

  async function handleClick() {
    let response: User = {};

    // todo check this out
    // const [error, data] = await fetch("https://api.example.com/data").json()?=;
    // https://medium.com/@pranshiksharma/say-goodbye-to-try-catch-mastering-the-new-operator-in-javascript-b4ffd589da94
    // if (error) {
    //   console.error('Error occurred:', error);
    // } else {
    //   console.log('Data fetched successfully:', data);
    // }

    try {
      response = await apiService.getUser(user.id);
    } catch (e) {
      console.error('invalid user credentials', e);
    }

    const BEPass = response?.password;

    if (BEPass && BEPass === user.password) {
      dispatch(setStoreUser({ ...response }));
      navigate('/');
    } else {
      setLoginErrorMessage('invalid user credentials');
    }
  }

  function getIsDisabled(user: User): boolean {
    return !Object.values(user).every(Boolean);
  }

  function toggleLogin() {
    navigate('/signUp');
  }

  const loginWrapperStyles = {
    ...styles.borderBox,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '200px',
    padding: '20px 50px',
  };

  return (
    <Box>
      <Box sx={loginWrapperStyles}>
        <h2>Log In</h2>
        <TextField {...getProps('id', handleChange)} />
        <TextField {...getProps('password', handleChange)} />
        <Typography variant="body1">{loginErrorMessage}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button disabled={getIsDisabled(user)} onClick={handleClick} sx={styles.button}>
            Log in
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant="body1">
          Don't have an account?
          <Link sx={{ cursor: 'pointer', textDecoration: 'none' }} onClick={toggleLogin}>
            Sign Up!
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default LoginScreen;
