import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ReactSVG } from "react-svg";
import ArrowBackIcon from "../../../assets/icons/arrow_back-24px.svg";
import ErrorIcon from "../../../assets/icons/error-24px.svg";
import './EditWarehouse.scss';
import { useState } from 'react';

function EditWarehouse() {
  // Use navigate hook to redirect to the warehouse page after form submission or cancellation
  const warehousesPageNavigator = useNavigate();

  // State to keep tracking validation for each field
  const [formErrors, setFormErrors] = useState({
    name: true,
    street: true,
    city: true,
    country: true,
    contactName: true,
    position: true,
    phone: true,
    email: true
  });

  // Validation of individual fields
  const validationHandler = (event) => {
    const { name, value } = event.target;

    //Regex for phone and email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    let isValid = true;

    if (name === "email") {
      isValid = emailRegex.test(value);
    } else if (name === "phone") {
      isValid = phoneRegex.test(value);
    } else {
      isValid = value.trim() !== ''
    }

    setFormErrors(currentErrors => ({
      ...currentErrors,
      [name]: isValid,
    }));
  };

  const submitFormHandler = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    let valid = true;
    let notValid = {};

    for (const [formItem, value] of formData.entries()) {
      if (value.trim() === '') {
        notValid[formItem] = false;
        valid = false;
      } else {
        notValid[formItem] = true;
      }
    }

    setFormErrors(notValid);

    if (valid) {
      alert('Form is submitted successfully!');
      warehousesPageNavigator('/');
    } else {
      alert('Please fill in all the fields.')
    }
  };
  return (
    <div className="edit">
      <div className="edit__header">
        <ReactSVG className="edit__header-icon" src={ArrowBackIcon} />
        <h1 className="edit__header-title">Edit Warehouse</h1>
      </div>
      <form className="edit__form-wrapper" onSubmit={submitFormHandler}>
        <div className="edit__form">
          <div className="edit__form-warehouse">
            <h2 className="edit__form-warehouse-title">Warehouse Details</h2>

            {/* Warehouse Name */}
            <h3 className="edit__form-label">Warehouse Name</h3>
            <input
              className={`edit__form-input ${!formErrors.name && 'invalid'}`}
              type="text"
              placeholder="Warehouse Name"
              name="name"
              onBlur={validationHandler}
            />
            {!formErrors.name && (
              <div className="edit__form-input-error">
                <ReactSVG className="edit__form-input-error-icon" src={ErrorIcon} />
                <p className="edit__form-input-error-message  small">This field is required</p>
              </div>
            )}

            {/* Warehouse Street Address */}
            <h3 className="edit__form-label">Street Address</h3>
            <input
              className={`edit__form-input ${!formErrors.street && 'invalid'}`}
              type="text"
              placeholder="Street Address"
              name="street"
              onBlur={validationHandler}
            />
            {!formErrors.street && (
              <div className="edit__form-input-error">
                <ReactSVG className="edit__form-input-error-icon" src={ErrorIcon} />
                <p className="edit__form-input-error-message  small">This field is required</p>
              </div>
            )}

            {/* Warehouse City */}
            <h3 className="edit__form-label">City</h3>
            <input
              className={`edit__form-input ${!formErrors.city && 'invalid'}`}
              type="text"
              placeholder="City"
              name="city"
              onBlur={validationHandler}
            />
            {!formErrors.city && (
              <div className="edit__form-input-error">
                <ReactSVG className="edit__form-input-error-icon" src={ErrorIcon} />
                <p className="edit__form-input-error-message  small">This field is required</p>
              </div>
            )}

            {/* Warehouse Country */}
            <h3 className="edit__form-label">Country</h3>
            <input
              className={`edit__form-input ${!formErrors.country && 'invalid'}`}
              type="text"
              placeholder="Country"
              name="country"
              onBlur={validationHandler}
            />

            {!formErrors.country && (
              <div className="edit__form-input-error">
                <ReactSVG className="edit__form-input-error-icon" src={ErrorIcon} />
                <p className="edit__form-input-error-message  small">This field is required</p>
              </div>
            )}
          </div>
          <div className="edit__form-contact">
            <h2 className="edit__form-contact-title">Contact Details</h2>

            {/* Contact Name */}
            <h3 className="edit__form-label">Contact Name</h3>
            <input
              className={`edit__form-input ${!formErrors.contactName && 'invalid'}`}
              type="text"
              placeholder="Contact Name"
              name="contactName"
              onBlur={validationHandler}
            />
            {!formErrors.contactName && (
              <div className="edit__form-input-error">
                <ReactSVG className="edit__form-input-error-icon" src={ErrorIcon} />
                <p className="edit__form-input-error-message  small">This field is required</p>
              </div>
            )}

            {/* Position */}
            <h3 className="edit__form-label" htmlFor="edit__form-contact-position">Position</h3>
            <input
              className={`edit__form-input ${!formErrors.position && 'invalid'}`}
              type="text"
              placeholder="Position"
              name="position"
              onBlur={validationHandler}
            />
            {!formErrors.position && (
              <div className="edit__form-input-error">
                <ReactSVG className="edit__form-input-error-icon" src={ErrorIcon} />
                <p className="edit__form-input-error-message  small">This field is required</p>
              </div>
            )}

            {/* Phone Number */}
            <h3 className="edit__form-label">Phone Number</h3>
            <input
              className={`edit__form-input ${!formErrors.phone && 'invalid'}`}
              type="text"
              placeholder="Phone Number"
              name="phone"
              onBlur={validationHandler}
            />
            {!formErrors.phone && (
              <div className="edit__form-input-error">
                <ReactSVG className="edit__form-input-error-icon" src={ErrorIcon} />
                <p className="edit__form-input-error-message  small">This field is required</p>
              </div>
            )}

            {/* Email */}
            <h3 className="edit__form-label">Email</h3>
            <input
              className={`edit__form-input ${!formErrors.email && 'invalid'}`}
              type="text"
              placeholder="Email"
              name="email"
              onBlur={validationHandler}
            />
            {!formErrors.email && (
              <div className="edit__form-input-error">
                <ReactSVG className="edit__form-input-error-icon" src={ErrorIcon} />
                <p className="edit__form-input-error-message  small">This field is required</p>
              </div>
            )}
          </div>
        </div>
        <div className="edit__form-buttons">
          <Link className="edit__form-buttons-cancel" to="/">Cancel</Link>
          <button className="edit__form-buttons-save" type="submit">Save</button>
        </div>
      </form>
    </div >
  )
}

export default EditWarehouse
