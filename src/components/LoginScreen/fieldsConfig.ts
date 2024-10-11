export const fieldsConfig = {
    userName: {
        attributes: {
            size: "small",
            placeholder: 'Username'
        },
        getIsDisplayed: () => true,
        changeHandler: () => { }
    },
    password: {
        attributes: {
            size: 'small', 
            placeholder: 'Password', 
            type: 'password' 
        },
        getIsDisplayed: () => true,
        changeHandler: () => { }
    },
    email: {
        attributes: {
            size: 'small',
            placeholder: 'email'
        },
        getIsDisplayed,
        changeHandler: () => { },
    },
    fullName: {
        attributes: {
            size: 'small', 
            placeholder: 'Full Name'
        },
        getIsDisplayed,
        changeHandler: () => { },
    },
};


function getIsDisplayed(isLogin: boolean) { return !isLogin; }