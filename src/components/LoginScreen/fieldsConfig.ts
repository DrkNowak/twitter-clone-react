import { getValidationErrorMessage } from './helpers';


export const fieldsConfig = {
    userName: {
        name: 'userName',
        attributes: {
            size: "small",
            placeholder: 'Username'
        },
        getIsDisplayed: () => true,
        changeHandler: () => { }
    },
    password: {
        name: 'password',
        attributes: {
            size: 'small', 
            placeholder: 'Password', 
            type: 'password',
        },
    },
    email: {
        name: 'email',
        attributes: {
            size: 'small',
            placeholder: 'email'
        },
    },
    fullName: {
        name: 'fullName',
        attributes: {
            size: 'small', 
            placeholder: 'Full Name'
        }
    },
};


export class Field {
    constructor(fieldName) { 
        this.name = fieldName;
        this.attributes = fieldsConfig[fieldName].attributes;
        this.value = '';
    }

    setValue(value) {
        this.value = value;
    }

    getIsDisplayed(isLogin: boolean) {
        if (['userName', 'password'].includes(this.name)) { 
            return true;
        }

        return !isLogin;
    }

    getError() { return !!getValidationErrorMessage[this.name](this.value) }

    getHelperText() { return getValidationErrorMessage[this.name](this.value) }
    
    handleChange(value) { 
        this.setValue(value);
    }
 }