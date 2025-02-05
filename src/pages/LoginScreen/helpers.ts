import * as EmailValidator from 'email-validator';
import { ValidationRulesTypes } from '../../types/types';

export const getValidationErrorMessage: ValidationRulesTypes = {
  email: (value: string): string => (EmailValidator.validate(value) || !value ? '' : 'invalid email'),
  password: (value: string): string => (/^.{8,256}$/.test(value) || !value ? '' : 'expected length between 8 and 512'),
  name: (value: string): string => (/^.{3,200}$/.test(value) || !value ? '' : 'expected length between 3 and 200'),
  id: (value: string): string => (/^.{3,20}$/.test(value) || !value ? '' : 'expected length between 3 and 20'),
};
