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
import { User,  } from '../../types/types';

import { useValidation,  } from './fieldsConfig';



function LoginScreen(){
    const styles = GlobalStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { validation, handleValidation } = useValidation();

    const [user, setUser] = useState<User>({id: '', name: '', email: '', password: ''});


    function handleChange(e: React.ChangeEvent<HTMLInputElement>, field : string): void {
        const value = (e.target as HTMLInputElement).value;
        
        handleValidation(value, field);

        setUser({ ...user, [field]: value });
     }
 
    async function handleClick() {  
        Object.keys(user).forEach((field: string): void => handleValidation(user[field as keyof User] || '', field));
        let fetchedUser;

        try {
            fetchedUser = await getUser(user.id) as { data?: User };
        } catch (e) { console.error('err', e); }
        finally {
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
        } catch (e) { console.error(e); } 

        dispatch(setStoreUser({ ...user }));
        navigate('/');
    }
 
    function toggleLogin(): void {
        navigate('/logIn');
    };
    
    function getIsDisabled(user: User): boolean { 
        return !Object.values(user).every(Boolean);
    }

    return (
       <Box>
            <Box  sx={{...styles.borderBox, display: 'flex', flexDirection: 'column', justifyContent:'space-between', height: '300px', padding: '20px 50px'}}>
                <h2>Sign up</h2>
                <TextField 
                    size="small" 
                    placeholder='Username' 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, 'id')}
                />
                <TextField 
                    error={!!validation.password} 
                    helperText={validation.password} 
                    size="small" 
                    placeholder='Password' 
                    type="password" 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, 'password')} />
                <TextField 
                    error={!!validation.email} 
                    helperText={validation.email} 
                    size="small"
                    placeholder='Email' 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, 'email')}
                />
                <TextField 
                    size="small" 
                    placeholder='Full name' 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, 'name')}
                /> 
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button 
                        disabled={ getIsDisabled(user) }
                        onClick={handleClick} 
                        sx={styles.button}>
                            Sign Up
                    </Button>
                </Box>

            </Box>
            <Box sx={{display:'flex', justifyContent:'center'}}>
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