import { useState } from 'react';
import { useNavigate } from 'react-router';
import { getValidationErrorMessage } from './helpers';
import { register, getUser } from '../../api'; 

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { useDispatch } from 'react-redux';
import { setStoreUser } from '../../store/user'; 

import GlobalStyles from '../../ui-kit/GlobalStyles';
import { User, ValidationRulesTypes } from '../../types/types';

import { useValidation } from './fieldsConfig';



function LoginScreen(){
    const styles = GlobalStyles;
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
        Object.keys(user).forEach((field: string): void => handleValidation(user[field as keyof User], field));
        
        await register(user);
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
                    size="small" placeholder='Email' 
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
                        sx={{
                            justifyContent: 'center',
                            border: '1px solid black',
                            width: '80px',
                            backgroundColor: 'gray',
                            color: 'black'
                        }}>
                            Sign Up
                    </Button>
                </Box>

            </Box>
            <Box sx={{display:'flex', justifyContent:'flex-end'}}>
               <p>Already have an account? <a onClick={toggleLogin}>Sign In</a></p>
            </Box>
        </Box>
    );
}


export default LoginScreen;