import { Link, useNavigate } from 'react-router-dom';
import { ReactSVG } from "react-svg";
import { useState } from 'react';
import { Api } from "../../../utils/utils";
import { validateForm } from '../../../utils/WarehouseFormValidationUtils';
import ArrowBackIcon from "../../../assets/icons/arrow_back-24px.svg";
import WarehouseForm from '../../../components/Warehouse/WarehouseForm/WarehouseForm';
import './AddNewWarehouse.scss';

function AddNewWarehouse() {

  const api =new Api();
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
    
    let errorState = { ...formErrors };
    Object.keys(warehouseInfo).forEach((formInput) => {
      const { isValid, errorMessage } = validateForm(formInput, warehouseInfo[formInput]);
      errorState = {
        ...errorState,
        [formInput]: { isValid, errorMessage }
      };
    });
  
    setFormErrors(errorState);

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
      alert('Please fill out all the fields.');
    }
  };

  return (
    <div className="form">
      <div className="form__header">
        <Link  to="/warehouses">
          <ReactSVG className="form__header-icon" src={ArrowBackIcon} />
        </Link>
        <h1 className="form__header-title">add Warehouse</h1>
      </div>
      <form className="form__wrapper" onSubmit={submitFormHandler}>
        <WarehouseForm
        warehouseInfo={warehouseInfo}
        formErrors={formErrors}
        validationHandler={validationHandler}
        submitFormHandler={submitFormHandler}
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

