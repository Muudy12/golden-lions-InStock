import ErrorIcon from "../../assets/icons/error-24px.svg";
import { ReactSVG } from 'react-svg';

function FormError({isValid, errorMessage}) {
    if (isValid) return null;

    return (
        <div className="form__element-item-input-error">
            <ReactSVG className="form__element-item-input-error-icon" src={ErrorIcon} />
            <p className="form__element-item-input-error-message small">{errorMessage}</p>
        </div>

    )
}

export default FormError
