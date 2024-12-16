import { getValidationErrorMessage } from './helpers';
import { ValidationRulesTypes } from '../../types/types';
import { useState } from 'react';
 
export function useValidation(){
    const [validation, setValidation] = useState({ id: '', name: '', email: '', password: '' });
    
    function handleValidation(value: string, field: string) {
        setValidation({...validation, [field]: getValidationErrorMessage[field as keyof ValidationRulesTypes](value)});
    };

    return {
        handleValidation,
        validation
    };
}



const baseConfig = {
    id: {
        size: 'small',
        placeholder: 'UserName'
    },
    password: {
        size: 'small',
        placeholder: 'Password',
        type: 'password'
    },
    email: {
        size: 'small',
        placeholder: 'Email' 
    },
    name: {
        size: 'small', 
        placeholder:'Full name' 
    }

} as const;


type EventType = React.ChangeEvent<HTMLInputElement>;
    
export const getProps = (
    type: keyof typeof baseConfig,
    handleChange: (e: EventType, name: string) => void,
    validation = { [type]: '' },
    ):
    {
        size: 'small',
        placeholder: string,
        error: boolean,
        helperText: string,
        onChange: (e: EventType) => void
    } => {
        if (baseConfig[type]) {
            return {
                ...baseConfig[type],
                error: !!validation[type],
                helperText: validation[type],
                onChange: (e: EventType) => handleChange(e, type)
            };
        }

    return { size: 'small', placeholder: '', error: false, helperText: '',  onChange: (e: EventType) => handleChange(e, '')  };
};