import { Fragment, useState } from 'react';
import { getValidationErrorMessage } from './helpers';
import { register, getUser } from '../../api'; 

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { useDispatch } from 'react-redux';
import { setStoreUser } from '../../store/user'; 

import GlobalStyles from '../../ui-kit/GlobalStyles';
import { User, ValidationRulesTypes } from '../../types/types';



function LoginScreen(){
    const styles = GlobalStyles;
    const dispatch = useDispatch();

    const [isLogin, setIsLogin] = useState(true);
    const [user, setUser] = useState<User>({id: '', name: '', email: '', password: ''});
    const [validation, setValidation] = useState({ id: '', name: '', email:  '', password: ''});


    function handleChange(e: React.ChangeEvent<HTMLInputElement>, field : string): void {
        const value = (e.target as HTMLInputElement).value;
        
        if(!isLogin){
            handleValidation(value, field);
        }

        setUser({ ...user, [field]: value });
     }
 
    async function handleClick() {  
        if (!isLogin) {
            Object.keys(user).forEach((field: string): void => handleValidation(user[field as keyof User], field));
            
            await register(user);
        } else { 
            let response: { data?: User } = {};

            try {
                response = await getUser(user.id) as { data?: User };
            } catch (e) {
                console.error('invalid user credentials', e);
            } finally { 
                if (response.data?.password) {
                    if (response.data?.password === user.password) { 
                        dispatch(setStoreUser({ ...response.data }));
                        toggleLogin();
                    }
                }
            }
        }
     }
 
    function toggleLogin(): void {
         setIsLogin(!isLogin);
    };
 
    function handleValidation(value: string = '', field: string = '') {
         setValidation({...validation, [field]: getValidationErrorMessage[field as keyof ValidationRulesTypes](value)});
    };
    
    function getIsDisabled(user: User): boolean { 
        if (isLogin) { 
            return !(user.id && user.password);
        }

        return !Object.values(user).every(Boolean);
    }   

     const headerText = isLogin ? 'Log in' : 'Sign up';

     const RegistrationFields = (
         <Fragment>
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
         </Fragment> );

    return (
       <Box>
            <Box  sx={{...styles.borderBox, display: 'flex', flexDirection: 'column', justifyContent:'space-between', height: isLogin ? '200px' : '300px', padding: '20px 50px'}}>
                <h2>{headerText}</h2>
                { !isLogin && RegistrationFields}
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
                            {headerText}
                    </Button>
                </Box>
            </Box>
            <Box sx={{display:'flex', justifyContent:'flex-end'}}>
                { isLogin && <p>Don't have an account? <a onClick={toggleLogin}>Sign up</a></p>}
                { !isLogin && <p>Already have an account? <a onClick={toggleLogin}>Log in</a></p>}
            </Box>
        </Box>
    );
}


export default LoginScreen;