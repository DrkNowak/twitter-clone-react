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
    }
} as const;
    
const getProps = (type: keyof typeof baseConfig) => {
    if (baseConfig[type]) {
        return baseConfig[type];
    }

    return { size: 'small', placeholder: '' };
};