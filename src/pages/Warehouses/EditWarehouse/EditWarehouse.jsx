import React from 'react'
import { ReactSVG } from "react-svg";
import ArrowBackIcon from "../../../assets/icons/arrow_back-24px.svg"
import './EditWarehouse.scss'

function EditWarehouse() {
  return (
    <div className="edit">
      <div className="edit__header">
        <ReactSVG className="edit__header-icon" src={ArrowBackIcon} />
        <h1 className="edit__header-title">Edit Warehouse</h1>
      </div>
      <form className="edit__form">
        <div className="edit__form-warehouse">
          <h2 className="edit__form-warehouse-title">Warehouse Details</h2>
          <label className="edit__form-label" htmlFor="edit__form-warehouse-name">Warehouse Name</label>
          <input
            className="edit__form-input"
            id="edit__form-warehouse-name"
            type="text"
            placeholder="Warehouse Name"
            name="name"
          />
          <label className="edit__form-label" htmlFor="edit__form-warehouse-street">Street Address</label>
          <input
            className="edit__form-input"
            id="edit__form-warehouse-street"
            type="text"
            placeholder="Street Address"
            name="street"
          />
          <label className="edit__form-label" htmlFor="edit__form-warehouse-city">City</label>
          <input
            className="edit__form-input"
            id="edit__form-warehouse-city"
            type="text"
            placeholder="City"
            name="city"
          />
          <label className="edit__form-label" htmlFor="edit__form-warehouse-country">Country</label>
          <input
            className="edit__form-input"
            id="edit__form-warehouse-country"
            type="text"
            placeholder="Country"
            name="country"
          />
        </div>
        <div className="edit__form-contact">
        <h2 className="edit__form-contact-title">Contact Details</h2>
          <label className="edit__form-label" htmlFor="edit__form-contact-name">Contact Name</label>
          <input
            className="edit__form-input"
            id="edit__form-contact-name"
            type="text"
            placeholder="Full Name"
            name="name"
          />
          <label className="edit__form-label" htmlFor="edit__form-contact-position">Position</label>
          <input
            className="edit__form-input"
            id="edit__form-contact-position"
            type="text"
            placeholder="Position"
            name="position"
          />
          <label className="edit__form-label" htmlFor="edit__form-contact-phone">Phone Number</label>
          <input
            className="edit__form-input"
            id="edit__form-contact-phone"
            type="text"
            placeholder="Phone Number"
            name="phone"
          />
          <label className="edit__form-label" htmlFor="edit__form-contact-email">Email</label>
          <input
            className="edit__form-input"
            id="edit__form-contact-email"
            type="text"
            placeholder="Email"
            name="email"
          />                              
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
