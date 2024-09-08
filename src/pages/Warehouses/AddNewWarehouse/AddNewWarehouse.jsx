import { Link, useNavigate, useParams } from 'react-router-dom';
import { ReactSVG } from "react-svg";
import { useState, useEffect } from 'react';
import { Api } from "../../../utils/utils";
import { validateForm } from '../../../utils/FormValidation';
import ArrowBackIcon from "../../../assets/icons/arrow_back-24px.svg";
import ErrorIcon from "../../../assets/icons/error-24px.svg";
import './AddNewWarehouse.scss';

function AddNewWarehouse() {

  const api =new Api();
  const { warehouseId } = useParams();
  const warehousesPageNavigator = useNavigate();

  const [warehouseInfo, setWarehouseInfo] = useState({
    name: '',
    street: '',
    city: '',
    country: '',
    contactName: '',
    position: '',
    phone: '',
    email: ''
  });

  const [formErrors, setFormErrors] = useState({
    name: { isValid: true, errorMessage: '' },
    street: { isValid: true, errorMessage: '' },
    city: { isValid: true, errorMessage: '' },
    country: { isValid: true, errorMessage: '' },
    contactName: { isValid: true, errorMessage: '' },
    position: { isValid: true, errorMessage: '' },
    phone: { isValid: true, errorMessage: '' },
    email: { isValid: true, errorMessage: '' }
  });

  // Validation of individual fields
  const validationHandler = (event) => {
    const { name, value } = event.target;
    const { isValid, errorMessage } = validateForm(name, value);

    setWarehouseInfo({
      ...warehouseInfo,
      [name]: value
    });

    setFormErrors(currentErrors => ({
      ...currentErrors,
      [name]: { isValid, errorMessage }
    }));
  };

  const submitFormHandler = async (event) => {
    event.preventDefault();

    // Check if there are any invalid fields
    const formIsValid = Object.values(formErrors).every(error => error.isValid) &&
                        Object.values(warehouseInfo).every(value => value.trim() !== '');

    if (formIsValid) {
      try {
        await api.addWarehouse({
          warehouse_name: warehouseInfo.name.trim(),
          address: warehouseInfo.street.trim(),
          city: warehouseInfo.city.trim(),
          country: warehouseInfo.country.trim(),
          contact_name: warehouseInfo.contactName.trim(),
          contact_position: warehouseInfo.position.trim(),
          contact_phone: warehouseInfo.phone.trim(),
          contact_email: warehouseInfo.email.trim()
        });
        warehousesPageNavigator('/warehouses');
      } catch (error) {
        console.log("There is an error adding the new warehouse.", error);
      }
    } else {
      alert('Please fill out all the fields .');
    }
  };

  return (
    <div className="add">
      <div className="add__header">
        <Link  to="/warehouses">
          <ReactSVG className="add__header-icon" src={ArrowBackIcon} />
        </Link>
        <h1 className="add__header-title">add Warehouse</h1>
      </div>
      <form className="add__form-wrapper" onSubmit={submitFormHandler}>
        <div className="add__form">
          <div className="add__form-warehouse">
            <h2 className="add__form-warehouse-title">Warehouse Details</h2>

            {/* Warehouse Name */}
            <div className="add__form-item">
              <h3 className="add__form-item-label">Warehouse Name</h3>
              <input
                className={`add__form-item-input ${!formErrors.name.isValid && 'invalid'}`}
                type="text"
                placeholder="Warehouse Name"
                name="name"
                value={warehouseInfo.name || ''}
                onChange={validationHandler}
              />
              {!formErrors.name.isValid && (
                <div className="add__form-item-input-error">
                  <ReactSVG className="add__form-item-input-error-icon" src={ErrorIcon} />
                  <p className="add__form-item-input-error-message small">{formErrors.name.errorMessage}</p>
                </div>
              )}
            </div>

            {/* Street Address */}
            <div className="add__form-item">
              <h3 className="add__form-item-label">Street Address</h3>
              <input
                className={`add__form-item-input ${!formErrors.street.isValid && 'invalid'}`}
                type="text"
                placeholder="Street Address"
                name="street"
                value={warehouseInfo.street || ''}
                onChange={validationHandler}
              />
              {!formErrors.street.isValid && (
                <div className="add__form-item-input-error">
                  <ReactSVG className="add__form-item-input-error-icon" src={ErrorIcon} />
                  <p className="add__form-item-input-error-message small">{formErrors.street.errorMessage}</p>
                </div>
              )}
            </div>

            {/* City */}
            <div className="add__form-item">
              <h3 className="add__form-item-label">City</h3>
              <input
                className={`add__form-item-input ${!formErrors.city.isValid && 'invalid'}`}
                type="text"
                placeholder="City"
                name="city"
                value={warehouseInfo.city || ''}
                onChange={validationHandler}
              />
              {!formErrors.city.isValid && (
                <div className="add__form-item-input-error">
                  <ReactSVG className="add__form-item-input-error-icon" src={ErrorIcon} />
                  <p className="add__form-item-input-error-message small">{formErrors.city.errorMessage}</p>
                </div>
              )}
            </div>

            {/* Country */}
            <div className="add__form-item">
              <h3 className="add__form-item-label">Country</h3>
              <input
                className={`add__form-item-input ${!formErrors.country.isValid && 'invalid'}`}
                type="text"
                placeholder="Country"
                name="country"
                value={warehouseInfo.country || ''}
                onChange={validationHandler}
              />
              {!formErrors.country.isValid && (
                <div className="add__form-item-input-error">
                  <ReactSVG className="add__form-item-input-error-icon" src={ErrorIcon} />
                  <p className="add__form-item-input-error-message small">{formErrors.country.errorMessage}</p>
                </div>
              )}
            </div>
          </div>

          <div className="add__form-contact">
            <h2 className="add__form-contact-title">Contact Details</h2>

            {/* Contact Name */}
            <div className="add__form-item">
              <h3 className="add__form-item-label">Contact Name</h3>
              <input
                className={`add__form-item-input ${!formErrors.contactName.isValid && 'invalid'}`}
                type="text"
                placeholder="Contact Name"
                name="contactName"
                value={warehouseInfo.contactName || ''}
                onChange={validationHandler}
              />
              {!formErrors.contactName.isValid && (
                <div className="add__form-item-input-error">
                  <ReactSVG className="add__form-item-input-error-icon" src={ErrorIcon} />
                  <p className="add__form-item-input-error-message small">{formErrors.contactName.errorMessage}</p>
                </div>
              )}
            </div>

            {/* Position */}
            <div className="add__form-item">
              <h3 className="add__form-item-label" htmlFor="add__form-contact-position">Position</h3>
              <input
                className={`add__form-item-input ${!formErrors.position.isValid && 'invalid'}`}
                type="text"
                placeholder="Position"
                name="position"
                value={warehouseInfo.position || ''}
                onChange={validationHandler}
              />
              {!formErrors.position.isValid && (
                <div className="add__form-item-input-error">
                  <ReactSVG className="add__form-item-input-error-icon" src={ErrorIcon} />
                  <p className="add__form-item-input-error-message small">{formErrors.position.errorMessage}</p>
                </div>
              )}
            </div>

            {/* Phone Number */}
            <div className="add__form-item">
              <h3 className="add__form-item-label">Phone Number</h3>
              <input
                className={`add__form-item-input ${!formErrors.phone.isValid && 'invalid'}`}
                type="text"
                placeholder="Phone Number"
                name="phone"
                value={warehouseInfo.phone || ''}
                onChange={validationHandler}
              />
              {!formErrors.phone.isValid && (
                <div className="add__form-item-input-error">
                  <ReactSVG className="add__form-item-input-error-icon" src={ErrorIcon} />
                  <p className="add__form-item-input-error-message small">{formErrors.phone.errorMessage}</p>
                </div>
              )}
            </div>

            {/* Email */}
            <div className="add__form-item">
              <h3 className="add__form-item-label">Email</h3>
              <input
                className={`add__form-item-input ${!formErrors.email.isValid && 'invalid'}`}
                type="text"
                placeholder="Email"
                name="email"
                value={warehouseInfo.email || ''}
                onChange={validationHandler}
              />
              {!formErrors.email.isValid && (
                <div className="add__form-item-input-error">
                  <ReactSVG className="add__form-item-input-error-icon" src={ErrorIcon} />
                  <p className="add__form-item-input-error-message small">{formErrors.email.errorMessage}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="add__form-buttons">
          <Link className="add__form-buttons-cancel" to="/warehouses">Cancel</Link>
          <button className="add__form-buttons-addWarehouse" type="submit">+ Add Warehouse</button>
        </div>
      </form>
    </div>
  );
}

export default AddNewWarehouse;

