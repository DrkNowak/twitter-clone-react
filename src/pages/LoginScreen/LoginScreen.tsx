import { useState } from 'react';
import { getUser } from '../../api'; 

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
import { getProps  } from './fieldsConfig';



function LoginScreen(){
    const styles = GlobalStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [user, setUser] = useState<User>({ id: '', password: '' });
    const [loginErrorMessage, setLoginErrorMessage] = useState('');

    function handleChange(e: React.ChangeEvent<HTMLInputElement>, field : string): void {
        const value = (e.target as HTMLInputElement).value;

        setUser({ ...user, [field]: value });
     }
 
    async function handleClick() {  
        let response: { data?: User } = {};
        
        // todo check this out
        // const [error, data] = await fetch("https://api.example.com/data").json()?=;
        // https://medium.com/@pranshiksharma/say-goodbye-to-try-catch-mastering-the-new-operator-in-javascript-b4ffd589da94
        // if (error) {
        //   console.error('Error occurred:', error);
        // } else {
        //   console.log('Data fetched successfully:', data);
        // }

        try {
            response = await getUser(user.id) as { data?: User };
        } catch (e) {
            console.error('invalid user credentials', e);
        } 
        const BEPass = response.data?.password;

        if (BEPass && (BEPass === user.password)) {
            dispatch(setStoreUser({ ...response.data }));
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

    return (
       <Box>
            <Box  sx={{...styles.borderBox, display: 'flex', flexDirection: 'column', justifyContent:'space-between', height:'200px', padding: '20px 50px'}}>
                <h2>Log In</h2>
                <TextField 
                    {...getProps('id')}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, 'id')}
                />
                <TextField 
                    {...getProps('password')}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, 'password')}
                />
                <Typography variant="body1">{ loginErrorMessage }</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button 
                        disabled={ getIsDisabled(user) }
                        onClick={handleClick} 
                        sx={styles.button}>
                           Log in
                    </Button>
                </Box>
            </Box>
            <Box sx={{display:'flex', justifyContent:'center'}}>
                <Typography variant="body1">Don't have an account?  <Link sx={{cursor: 'pointer', textDecoration:'none'}} onClick={toggleLogin}>Sign Up!</Link></Typography>
            </Box>
        </Box>
    );
}


export default LoginScreen;