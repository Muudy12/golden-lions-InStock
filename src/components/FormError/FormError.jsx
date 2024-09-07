import './FormError.scss'
import ErrorIcon from "../../assets/icons/error-24px.svg";
import { ReactSVG } from 'react-svg';

function FormError({isValid, errorMessage}) {
    if (isValid) return null;

    return (
        <div className="edit__form-item-input-error">
            <ReactSVG className="edit__form-item-input-error-icon" src={ErrorIcon} />
            <p className="edit__form-item-input-error-message small">{errorMessage}</p>
        </div>

    )
}

export default FormError
