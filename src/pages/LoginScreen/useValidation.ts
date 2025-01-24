import { getValidationErrorMessage } from './helpers';
import { ValidationRulesTypes } from '../../types/types';
import { useState } from 'react';

export default function useValidation() {
  const [validation, setValidation] = useState({ id: '', name: '', email: '', password: '' });

  function handleValidation(value: string, field: string) {
    setValidation({ ...validation, [field]: getValidationErrorMessage[field as keyof ValidationRulesTypes](value) });
  }

  return {
    handleValidation,
    validation,
  };
}
