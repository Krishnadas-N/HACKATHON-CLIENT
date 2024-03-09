const emailValidation = (email, error) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.length === 0) {
        error('!! Enter Email !!')
        return false
    }
    if (!emailRegex.test(email)) {
        error('!! Enter Email Properly !!')
        return false
    }
    return true
}

const phoneNumberValidation = (number, error) => {
    const phoneNumberRegex = /^\d{3}[-\s]?\d{3}[-\s]?\d{4}$/;

    if (!number) {
        error('!! Enter Phone Number !!')
        return false
    }
    if (!phoneNumberRegex.test(number)) {
        error('!! Enter Phone Number Properly !!')
        return false  
    }
    return true;
};

const passwordValidation = (password, error) => {
    const passwordRegex =  /^.{6,}$/;
    if (password.trim().length === 0) {
        error('!! Enter Password !!')
        return false
    }
    if(!passwordRegex.test(password.trim())) {
        error('!! Password With Minimum 6 Characters !!')
        return false
    }
    return true
}

const nameValidation = (name, error) => {
    const nameRegex = /^[a-zA-Z]+(?:[\s.]+[a-zA-Z]+)*$/;
    if (name.length === 0) {
        error('!! Enter Name !!')
        return false
    } else {
        if (!nameRegex.test(name)) {
            error('!! Enter name Properly !!')
            return false
        } else {
            return true
        }
    }
}

const usernameValidation = (username, error) => {
    const usernameRegex = /^[a-z]{3,16}$/;
    if (username.length < 3) {
        error('Minimum Three Characters')
        return false
    }
    if (!usernameRegex.test(username)) {
        error('Only small letter alphabets')
        return false
    }
    return true
}

export { nameValidation, emailValidation, passwordValidation, usernameValidation, phoneNumberValidation }