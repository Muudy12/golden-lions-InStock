// validation.js
export const validateForm = (name, value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?(\d{1,3})?[-.\s]?\(?(\d{3})\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

    let isValid = true;
    let errorMessage = '';

    if (name === "email") {
        if (value.trim() === '') {
            isValid = false;
            errorMessage = 'This field is required';
        } else if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email';
        }
    } else if (name === "phone") {
        if (value.trim() === '') {
            isValid = false;
            errorMessage = 'This field is required';
        } else if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    } else if (value.trim() === '') {
        isValid = false;
        errorMessage = 'This field is required';
    }

    return { isValid, errorMessage };
};
