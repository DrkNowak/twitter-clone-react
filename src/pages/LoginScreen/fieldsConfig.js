import { getValidationErrorMessage } from './helpers';


export const fieldsConfig = {
    id: {
        name: 'userName',
        attributes: {
            size: "small",
            placeholder: 'Username'
        },
        value: '',
        error: '',
        helperText: '',
    },
    password: {
        name: 'password',
        attributes: {
            size: 'small', 
            placeholder: 'Password', 
            type: 'password',
        },
        value: '',
        error: '',
        helperText: '',
    },
    email: {
        name: 'email',
        attributes: {
            size: 'small',
            placeholder: 'email'
        },
        value: '',
        error: '',
        helperText: '',
    },
    fullName: {
        name: 'fullName',
        attributes: {
            size: 'small', 
            placeholder: 'Full Name'
        },
        value: '',
        error: '',
        helperText: '',
    },
};


export class Field {
    constructor(setUser) { 
        this.form = { ...fieldsConfig };
        this.setUser = setUser;
        this.setUser(this.form);
    }

    setValue(value) {
        this.value = value;
    }

    getIsDisplayed(isLogin) {
        if (['userName', 'password'].includes(this.name)) { 
            return true;
        }

        return !isLogin;
    }

    getError(fieldName, value) {
        return !!getValidationErrorMessage[fieldName](value);
     }

    getHelperText(fieldName, value) {
       return getValidationErrorMessage[fieldName](value);
    }
    
    handleChange(event, fieldName) { 
        const newValue = event.target.value;

        this.setUser({
            ...this.form,
            [fieldName]: {
                ...this.form[fieldName], 
                helperText: this.getHelperText(fieldName, newValue),
                value: newValue,
                error: this.getError(fieldName, newValue)
            }
        })
    }
}
 

