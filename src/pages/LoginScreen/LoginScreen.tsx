import { useState } from 'react';
import {  } from './helpers';
import { getUser } from '../../api'; 

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { useDispatch } from 'react-redux';
import { setStoreUser } from '../../store/user'; 

import GlobalStyles from '../../ui-kit/GlobalStyles';
import { User } from '../../types/types';
import { useNavigate } from 'react-router';



function LoginScreen(){
    const styles = GlobalStyles;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [user, setUser] = useState<User>({id: '', password: ''});

    function handleChange(e: React.ChangeEvent<HTMLInputElement>, field : string): void {
        const value = (e.target as HTMLInputElement).value;

        setUser({ ...user, [field]: value });
     }
 
    async function handleClick() {  
            let response: { data?: User } = {};

            try {
                response = await getUser(user.id) as { data?: User };
            } catch (e) {
                console.error('invalid user credentials', e);
            } finally { 
                if (response.data?.password) {
                    if (response.data?.password === user.password) { 
                        dispatch(setStoreUser({ ...response.data }));
                    }
                }
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
                    size="small" 
                    placeholder='Username' 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, 'id')}
                />
                <TextField 
                    size="small" 
                    placeholder='Password' 
                    type="password" 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, 'password')}/>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button 
                        disabled={ getIsDisabled(user) }
                        onClick={handleClick} 
                        sx={{
                            justifyContent: 'center',
                            border: '1px solid black',
                            width: '80px',
                            backgroundColor: 'gray',
                            color: 'black'
                        }}>
                           Log in
                    </Button>
                </Box>
            </Box>
            <Box sx={{display:'flex', justifyContent:'flex-end'}}>
                <p>Don't have an account? <a onClick={toggleLogin}>Sign up</a></p>
            </Box>
        </Box>
    );
}


export default LoginScreen;