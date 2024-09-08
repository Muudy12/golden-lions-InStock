import { Link, useNavigate, useParams } from 'react-router-dom';
import { ReactSVG } from "react-svg";
import { useState, useEffect } from 'react';
import { Api } from "../../../utils/utils";
import { validateForm } from '../../../utils/FormValidation';
import ArrowBackIcon from "../../../assets/icons/arrow_back-24px.svg";
import ErrorIcon from "../../../assets/icons/error-24px.svg";
import './EditWarehouse.scss';

function EditWarehouse() {

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

  useEffect(() => {
    const getWarehouseInfo = async () => {
      try {
        const warehouse = await api.getWarehouseById(warehouseId);
        setWarehouseInfo({
          name: warehouse.warehouse_name,
          street: warehouse.address,
          city: warehouse.city,
          country: warehouse.country,
          contactName: warehouse.contact_name,
          position: warehouse.contact_position,
          phone: warehouse.contact_phone,
          email: warehouse.contact_email
        });
      } catch (error) {
        console.error("There is an error fetching warehouse information.", error);
      }
    };
    getWarehouseInfo();
  }, [warehouseId]);

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
        await api.updateWarehouse(warehouseId, {
          warehouse_name: warehouseInfo.name.trim(),
          address: warehouseInfo.street.trim(),
          city: warehouseInfo.city.trim(),
          country: warehouseInfo.country.trim(),
          contact_name: warehouseInfo.contactName.trim(),
          contact_position: warehouseInfo.position.trim(),
          contact_phone: warehouseInfo.phone.trim(),
          contact_email: warehouseInfo.email.trim()
        });
        alert('Warehouse updated successfully!');
        warehousesPageNavigator('/warehouses');
      } catch (error) {
        console.log("There is an error editing the warehouse.", error);
      }
    } else {
      alert('Please fill out all the fields .');
    }
  };

  return (
    <div className="edit">
      <div className="edit__header">
        <Link  to="/warehouses">
          <ReactSVG className="edit__header-icon" src={ArrowBackIcon} />
        </Link>
        <h1 className="edit__header-title">Edit Warehouse</h1>
      </div>
      <form className="edit__form-wrapper" onSubmit={submitFormHandler}>
        <div className="edit__form">
          <div className="edit__form-warehouse">
            <h2 className="edit__form-warehouse-title">Warehouse Details</h2>

            {/* Warehouse Name */}
            <div className="edit__form-item">
              <h3 className="edit__form-item-label">Warehouse Name</h3>
              <input
                className={`edit__form-item-input ${!formErrors.name.isValid && 'invalid'}`}
                type="text"
                placeholder="Warehouse Name"
                name="name"
                value={warehouseInfo.name || ''}
                onChange={validationHandler}
              />
              {!formErrors.name.isValid && (
                <div className="edit__form-item-input-error">
                  <ReactSVG className="edit__form-item-input-error-icon" src={ErrorIcon} />
                  <p className="edit__form-item-input-error-message small">{formErrors.name.errorMessage}</p>
                </div>
              )}
            </div>

            {/* Street Address */}
            <div className="edit__form-item">
              <h3 className="edit__form-item-label">Street Address</h3>
              <input
                className={`edit__form-item-input ${!formErrors.street.isValid && 'invalid'}`}
                type="text"
                placeholder="Street Address"
                name="street"
                value={warehouseInfo.street || ''}
                onChange={validationHandler}
              />
              {!formErrors.street.isValid && (
                <div className="edit__form-item-input-error">
                  <ReactSVG className="edit__form-item-input-error-icon" src={ErrorIcon} />
                  <p className="edit__form-item-input-error-message small">{formErrors.street.errorMessage}</p>
                </div>
              )}
            </div>

            {/* City */}
            <div className="edit__form-item">
              <h3 className="edit__form-item-label">City</h3>
              <input
                className={`edit__form-item-input ${!formErrors.city.isValid && 'invalid'}`}
                type="text"
                placeholder="City"
                name="city"
                value={warehouseInfo.city || ''}
                onChange={validationHandler}
              />
              {!formErrors.city.isValid && (
                <div className="edit__form-item-input-error">
                  <ReactSVG className="edit__form-item-input-error-icon" src={ErrorIcon} />
                  <p className="edit__form-item-input-error-message small">{formErrors.city.errorMessage}</p>
                </div>
              )}
            </div>

            {/* Country */}
            <div className="edit__form-item">
              <h3 className="edit__form-item-label">Country</h3>
              <input
                className={`edit__form-item-input ${!formErrors.country.isValid && 'invalid'}`}
                type="text"
                placeholder="Country"
                name="country"
                value={warehouseInfo.country || ''}
                onChange={validationHandler}
              />
              {!formErrors.country.isValid && (
                <div className="edit__form-item-input-error">
                  <ReactSVG className="edit__form-item-input-error-icon" src={ErrorIcon} />
                  <p className="edit__form-item-input-error-message small">{formErrors.country.errorMessage}</p>
                </div>
              )}
            </div>
          </div>

          <div className="edit__form-contact">
            <h2 className="edit__form-contact-title">Contact Details</h2>

            {/* Contact Name */}
            <div className="edit__form-item">
              <h3 className="edit__form-item-label">Contact Name</h3>
              <input
                className={`edit__form-item-input ${!formErrors.contactName.isValid && 'invalid'}`}
                type="text"
                placeholder="Contact Name"
                name="contactName"
                value={warehouseInfo.contactName || ''}
                onChange={validationHandler}
              />
              {!formErrors.contactName.isValid && (
                <div className="edit__form-item-input-error">
                  <ReactSVG className="edit__form-item-input-error-icon" src={ErrorIcon} />
                  <p className="edit__form-item-input-error-message small">{formErrors.contactName.errorMessage}</p>
                </div>
              )}
            </div>

            {/* Position */}
            <div className="edit__form-item">
              <h3 className="edit__form-item-label" htmlFor="edit__form-contact-position">Position</h3>
              <input
                className={`edit__form-item-input ${!formErrors.position.isValid && 'invalid'}`}
                type="text"
                placeholder="Position"
                name="position"
                value={warehouseInfo.position || ''}
                onChange={validationHandler}
              />
              {!formErrors.position.isValid && (
                <div className="edit__form-item-input-error">
                  <ReactSVG className="edit__form-item-input-error-icon" src={ErrorIcon} />
                  <p className="edit__form-item-input-error-message small">{formErrors.position.errorMessage}</p>
                </div>
              )}
            </div>

            {/* Phone Number */}
            <div className="edit__form-item">
              <h3 className="edit__form-item-label">Phone Number</h3>
              <input
                className={`edit__form-item-input ${!formErrors.phone.isValid && 'invalid'}`}
                type="text"
                placeholder="Phone Number"
                name="phone"
                value={warehouseInfo.phone || ''}
                onChange={validationHandler}
              />
              {!formErrors.phone.isValid && (
                <div className="edit__form-item-input-error">
                  <ReactSVG className="edit__form-item-input-error-icon" src={ErrorIcon} />
                  <p className="edit__form-item-input-error-message small">{formErrors.phone.errorMessage}</p>
                </div>
              )}
            </div>

            {/* Email */}
            <div className="edit__form-item">
              <h3 className="edit__form-item-label">Email</h3>
              <input
                className={`edit__form-item-input ${!formErrors.email.isValid && 'invalid'}`}
                type="text"
                placeholder="Email"
                name="email"
                value={warehouseInfo.email || ''}
                onChange={validationHandler}
              />
              {!formErrors.email.isValid && (
                <div className="edit__form-item-input-error">
                  <ReactSVG className="edit__form-item-input-error-icon" src={ErrorIcon} />
                  <p className="edit__form-item-input-error-message small">{formErrors.email.errorMessage}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="edit__form-buttons">
          <Link className="edit__form-buttons-cancel" to="/warehouses">Cancel</Link>
          <button className="edit__form-buttons-save" type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}

export default EditWarehouse;

