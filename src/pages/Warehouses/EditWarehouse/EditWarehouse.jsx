import React from 'react'
import { ReactSVG } from "react-svg";
import ArrowBackIcon from "../../../assets/icons/arrow_back-24px.svg"
import './EditWarehouse.scss'
import { useState } from 'react';

function EditWarehouse() {
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
    setFormErrors(currentErrors => ({
      ...currentErrors,
      [name]: value.trim()  !=='',
    }));
  };

  const submitFormHandler = (event) =>{
    event.preventDefault();

    const formData = new FormData(event.target);
    let valid = true;
    let notValid ={};

    for (const [formItem, value] of form.entries()) {
      if (value.trim() === '') {
        notValid[formItem] = false;
        valid = false;
      } else {
        notValid[formItem] = true;
      }
    }

    setFormErrors(notValid);

    if(valid) {
      alert('Form submitted successfully!');
    } else {
      alert('Pleas fill in all required fields.')
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
                  <p className="edit__form-input-error-message">This field is required</p>
                </div>
              )}

            {/* Warehouse Street Address */}
            <h3 className="edit__form-label">Street Address</h3>
            <input
              className="edit__form-input"
              type="text"
              placeholder="Street Address"
              name="street"
            />
            <h3 className="edit__form-label">City</h3>
            <input
              className="edit__form-input"
              type="text"
              placeholder="City"
              name="city"
            />
            <h3 className="edit__form-label">Country</h3>
            <input
              className="edit__form-input"
              type="text"
              placeholder="Country"
              name="country"
            />
          </div>
          <div className="edit__form-contact">
            <h2 className="edit__form-contact-title">Contact Details</h2>
            <h3 className="edit__form-label">Contact Name</h3>
            <input
              className="edit__form-input"
              type="text"
              placeholder="Contact Name"
              name="name"
            />
            <h3 className="edit__form-label" htmlFor="edit__form-contact-position">Position</h3>
            <input
              className="edit__form-input"
              type="text"
              placeholder="Position"
              name="position"
            />
            <h3 className="edit__form-label">Phone Number</h3>
            <input
              className="edit__form-input"
              type="text"
              placeholder="Phone Number"
              name="phone"
            />
            <h3 className="edit__form-label">Email</h3>
            <input
              className="edit__form-input"
              type="text"
              placeholder="Email"
              name="email"
            />
          </div>
        </div>
        <div className="edit__form-buttons">
          <div className="edit__form-buttons-cancel">Cancel</div>
          <div className="edit__form-buttons-save">Save</div>
        </div>
      </form>
    </div >
  )
}

export default EditWarehouse
