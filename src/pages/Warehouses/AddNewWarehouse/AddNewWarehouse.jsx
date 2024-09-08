import { Link, useNavigate } from 'react-router-dom';
import { ReactSVG } from "react-svg";
import { useState } from 'react';
import { Api } from "../../../utils/utils";
import { initialWarehouseInfo, initialFormErrors, handleValidation, handleSubmitForm } from '../../../utils/WarehouseUtils';
import ArrowBackIcon from "../../../assets/icons/arrow_back-24px.svg";
import WarehouseForm from '../../../components/Warehouse/WarehouseForm/WarehouseForm';
import './AddNewWarehouse.scss';

function AddNewWarehouse() {

  const api = new Api();
  const warehousesPageNavigator = useNavigate();

  // State to track the current warehouse information
  const [warehouseInfo, setWarehouseInfo] = useState(initialWarehouseInfo)
  // State to track validation errors for the form fields
  const [formErrors, setFormErrors] = useState(initialFormErrors)

  const submitFormHandler = async (event) => {
    handleSubmitForm(
      event,
      warehouseInfo,
      formErrors,
      () => api.addWarehouse({
        warehouse_name: warehouseInfo.name.trim(),
        address: warehouseInfo.street.trim(),
        city: warehouseInfo.city.trim(),
        country: warehouseInfo.country.trim(),
        contact_name: warehouseInfo.contactName.trim(),
        contact_position: warehouseInfo.position.trim(),
        contact_phone: warehouseInfo.phone.trim(),
        contact_email: warehouseInfo.email.trim()
      }),
      //success handler
      () => warehousesPageNavigator('/warehouses'),
      // error handler
      (error) => console.log("There is an error adding the new warehouse.", error)
    );
  };

  return (
    <div className="form">
      <div className="form__header">
        <Link to="/warehouses">
          <ReactSVG className="form__header-icon" src={ArrowBackIcon} />
        </Link>
        <h1 className="form__header-title">add Warehouse</h1>
      </div>
      <form className="form__wrapper" onSubmit={submitFormHandler}>
        <WarehouseForm
          warehouseInfo={warehouseInfo}
          formErrors={formErrors}
          validationHandler={(event) => handleValidation(event, warehouseInfo, setWarehouseInfo, setFormErrors)}
        />
        <div className="form__element-buttons">
          <Link className="form__element-buttons-cancel" to="/warehouses">Cancel</Link>
          <button className="form__element-buttons-addWarehouse" type="submit">+ Add Warehouse</button>
        </div>
      </form>
    </div>
  );
}

export default AddNewWarehouse;

