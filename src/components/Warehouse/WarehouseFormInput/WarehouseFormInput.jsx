import "./WarehouseFormInput.scss"
import { ReactSVG } from "react-svg"
import ErrorIcon from "../../../assets/icons/error-24px.svg"

function FormInput({ label, name, value, error, onChange }) {
    return (
        <div className="form__element-item">
            <h3 className="form__element-item-label">{label}</h3>
            <input
                className={`form__element-item-input ${!error.isValid && 'invalid'}`}
                type="text"
                placeholder={label}
                name={name}
                value={value || ''}
                onChange={onChange}
            />
            {
                !error.isValid && (
                    <div className="form__element-item-input-error">
                        <ReactSVG className="form__element-item-input-error-icon" src={ErrorIcon} />
                        <p className="form__element-item-input-error-message small">{error.errorMessage}</p>
                    </div>
                )
            }
        </div >
    )
}

export default FormInput