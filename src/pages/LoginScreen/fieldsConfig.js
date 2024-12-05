import { getValidationErrorMessage } from './helpers';
import { useState } from 'react';
 
export function useValidation(){
    const [validation, setValidation] = useState({ id: '', name: '', email: '', password: '' });
    
    function handleValidation(value, field) {
        setValidation({...validation, [field]: getValidationErrorMessage[field](value)});
    };

    return {
        handleValidation,
        validation
    };
}
