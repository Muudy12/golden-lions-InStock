import { Link, useNavigate, useParams } from 'react-router-dom';
import { ReactSVG } from "react-svg";
import { useState, useEffect } from 'react';
import { Api } from "../../../utils/utils";
import { validateForm } from '../../../utils/WarehouseFormValidationUtils';
import ArrowBackIcon from "../../../assets/icons/arrow_back-24px.svg";
import WarehouseForm from '../../../components/Warehouse/WarehouseForm/WarehouseForm';
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
        warehousesPageNavigator('/warehouses');
      } catch (error) {
        console.log("There is an error editing the warehouse.", error);
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
        <h1 className="form__header-title">Edit Warehouse</h1>
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
          <button className="form__element-buttons-save" type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}

export default EditWarehouse;

