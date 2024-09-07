import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ReactSVG } from "react-svg";
import ArrowBackIcon from "../../../assets/icons/arrow_back-24px.svg";
import ErrorIcon from "../../../assets/icons/error-24px.svg";
import './AddNewWarehouse.scss';
import { useState } from 'react';

function AddNewWarehouse() {
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
    const phoneRegex = /^\+?(\d{1,3})?[-.\s]?\(?(\d{3})\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
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
      warehousesPageNavigator('/warehouses');
    } else {
      alert('Please fill in all the fields.')
    }
  };
  return (
    <div className="add">
      <div className="add__header">
        <Link  to="/warehouses">
          <ReactSVG className="add__header-icon" src={ArrowBackIcon} />
        </Link>
        <h1 className="add__header-title">Add New Warehouse</h1>
      </div>
      <form className="add__form-wrapper" onSubmit={submitFormHandler}>
        <div className="add__form">
          <div className="add__form-warehouse">
            <h2 className="add__form-warehouse-title">Warehouse Details</h2>

            {/* Warehouse Name */}
            <div className="add__form-item">
              <h3 className="add__form-item-label">Warehouse Name</h3>
              <input
                className={`add__form-item-input ${!formErrors.name && 'invalid'}`}
                type="text"
                placeholder="Warehouse Name"
                name="name"
                onBlur={validationHandler}
              />
              {!formErrors.name && (
                <div className="add__form-item-input-error">
                  <ReactSVG className="add__form-item-input-error-icon" src={ErrorIcon} />
                  <p className="add__form-item-input-error-message  small">This field is required</p>
                </div>
              )}
            </div>

            {/* Warehouse Street Address */}
            <div className="add__form-item">
              <h3 className="add__form-item-label">Street Address</h3>
              <input
                className={`add__form-item-input ${!formErrors.street && 'invalid'}`}
                type="text"
                placeholder="Street Address"
                name="street"
                onBlur={validationHandler}
              />
              {!formErrors.street && (
                <div className="add__form-item-input-error">
                  <ReactSVG className="add__form-item-input-error-icon" src={ErrorIcon} />
                  <p className="add__form-item-input-error-message  small">This field is required</p>
                </div>
              )}
            </div>

            {/* Warehouse City */}
            <div className="add__form-item">
              <h3 className="add__form-item-label">City</h3>
              <input
                className={`add__form-item-input ${!formErrors.city && 'invalid'}`}
                type="text"
                placeholder="City"
                name="city"
                onBlur={validationHandler}
              />
              {!formErrors.city && (
                <div className="add__form-item-input-error">
                  <ReactSVG className="add__form-item-input-error-icon" src={ErrorIcon} />
                  <p className="add__form-item-input-error-message  small">This field is required</p>
                </div>
              )}
            </div>

            {/* Warehouse Country */}
            <div className="add__form-item">
              <h3 className="add__form-item-label">Country</h3>
              <input
                className={`add__form-item-input ${!formErrors.country && 'invalid'}`}
                type="text"
                placeholder="Country"
                name="country"
                onBlur={validationHandler}
              />
              {!formErrors.country && (
                <div className="add__form-item-input-error">
                  <ReactSVG className="add__form-item-input-error-icon" src={ErrorIcon} />
                  <p className="add__form-item-input-error-message  small">This field is required</p>
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
                className={`add__form-item-input ${!formErrors.contactName && 'invalid'}`}
                type="text"
                placeholder="Contact Name"
                name="contactName"
                onBlur={validationHandler}
              />
              {!formErrors.contactName && (
                <div className="add__form-item-input-error">
                  <ReactSVG className="add__form-item-input-error-icon" src={ErrorIcon} />
                  <p className="add__form-item-input-error-message  small">This field is required</p>
                </div>
              )}
            </div>

            {/* Position */}
            <div className="add__form-item">
              <h3 className="add__form-item-label" htmlFor="add__form-contact-position">Position</h3>
              <input
                className={`add__form-item-input ${!formErrors.position && 'invalid'}`}
                type="text"
                placeholder="Position"
                name="position"
                onBlur={validationHandler}
              />
              {!formErrors.position && (
                <div className="add__form-item-input-error">
                  <ReactSVG className="add__form-item-input-error-icon" src={ErrorIcon} />
                  <p className="add__form-item-input-error-message  small">This field is required</p>
                </div>
              )}
            </div>

            {/* Phone Number */}
            <div className="add__form-item">
              <h3 className="add__form-item-label">Phone Number</h3>
              <input
                className={`add__form-item-input ${!formErrors.phone && 'invalid'}`}
                type="text"
                placeholder="Phone Number"
                name="phone"
                onBlur={validationHandler}
              />
              {!formErrors.phone && (
                <div className="add__form-item-input-error">
                  <ReactSVG className="add__form-item-input-error-icon" src={ErrorIcon} />
                  <p className="add__form-item-input-error-message  small">This field is required</p>
                </div>
              )}
            </div>

            {/* Email */}
            <div className="add__form-item">
              <h3 className="add__form-item-label">Email</h3>
              <input
                className={`add__form-item-input ${!formErrors.email && 'invalid'}`}
                type="text"
                placeholder="Email"
                name="email"
                onBlur={validationHandler}
              />
              {!formErrors.email && (
                <div className="add__form-item-input-error">
                  <ReactSVG className="add__form-item-input-error-icon" src={ErrorIcon} />
                  <p className="add__form-item-input-error-message  small">This field is required</p>
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
    </div >
  )
}

export default AddNewWarehouse
