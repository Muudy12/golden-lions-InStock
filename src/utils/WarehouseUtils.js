import { validateForm } from './FormValidation';
import { Api } from './utils';

// Initialize warehouse info and form errors
export const initialWarehouseInfo = {
    name: '',
    street: '',
    city: '',
    country: '',
    contactName: '',
    position: '',
    phone: '',
    email: ''
};

export const initialFormErrors = {
    name: { isValid: true, errorMessage: '' },
    street: { isValid: true, errorMessage: '' },
    city: { isValid: true, errorMessage: '' },
    country: { isValid: true, errorMessage: '' },
    contactName: { isValid: true, errorMessage: '' },
    position: { isValid: true, errorMessage: '' },
    phone: { isValid: true, errorMessage: '' },
    email: { isValid: true, errorMessage: '' }
};


// Validation handler
export const handleValidation = (event, warehouseInfo, setWarehouseInfo, setFormErrors) => {
    const { name, value } = event.target;
    const { isValid, errorMessage } = validateForm(name, value);

    setWarehouseInfo({
        ...warehouseInfo,
        [name]: value
    });

    setFormErrors((currentErrors) => ({
        ...currentErrors,
        [name]: { isValid, errorMessage }
    }));
};

// Submitting the form handler
export const handleSubmitForm = async (event, warehouseInfo, formErrors, apiCall, onSuccess, onFailure) => {
    event.preventDefault();

    const errorState = { ...formErrors };
    Object.keys(warehouseInfo).forEach((formInput) => {
        const { isValid, errorMessage } = validateForm(formInput, warehouseInfo[formInput]);
        errorState[formInput] = { isValid, errorMessage };
    });

    const formIsValid =
        Object.values(errorState).every((error) => error.isValid) &&
        Object.values(warehouseInfo).every((value) => value.trim() !== '');

    if (formIsValid) {
        try {
            await apiCall();
            successHandler();
        } catch (error) {
            FailureHandler(error);
        }
    } else {
        alert('Please fill out all the fields.');
    }
};
