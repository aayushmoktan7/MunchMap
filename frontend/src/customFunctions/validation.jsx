export const signupValidation = (formData) => {

    let isValid = true;

    const credErrors = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        general: ''
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (formData.username.length < 3) {
        credErrors.username = 'Username must be at least 3 characters!';
        isValid = false;
    }

    if (!emailRegex.test(formData.email)) {
        credErrors.email = 'Please enter a valid email address!';
        isValid = false;
    }

    if (formData.password.length < 6) {
        credErrors.password = 'Password must be at least 6 characters!';
        isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
        credErrors.confirmPassword = 'The given passwords do not match!';
        isValid = false;
    }

    return { isValid, credErrors };
};

