import { Link, useNavigate, useParams } from 'react-router-dom';
import { ReactSVG } from "react-svg";
import { useState, useEffect } from 'react';
import { Api } from "../../../utils/utils";
import { initialWarehouseInfo, initialFormErrors, handleValidation, handleSubmitForm } from '../../../utils/WarehouseUtils';
import ArrowBackIcon from "../../../assets/icons/arrow_back-24px.svg";
import WarehouseForm from '../../../components/Warehouse/WarehouseForm/WarehouseForm';
import './EditWarehouse.scss';

function EditWarehouse() {

  const api = new Api();
  const { warehouseId } = useParams();
  const warehousesPageNavigator = useNavigate();

  // State to track the current warehouse information
  const [warehouseInfo, setWarehouseInfo] = useState(initialWarehouseInfo)
  // State to track validation errors for the form fields
  const [formErrors, setFormErrors] = useState(initialFormErrors)

  useEffect(() => {
    document.title = "InStock - Edit Warehouse"; // Set the page title
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

  const submitFormHandler = async (event) => {
    handleSubmitForm(
      event,
      warehouseInfo,
      formErrors,
      () => api.updateWarehouse(warehouseId, {
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
      () => console.log("There is an error editing the warehouse.")
  );
};

  return (
    <div className="form">
      <div className="form__header">
        <Link to="/warehouses">
          <ReactSVG className="form__header-icon" src={ArrowBackIcon} />
        </Link>
        <h1 className="form__header-title">Edit Warehouse</h1>
      </div>
      <form className="form__wrapper" onSubmit={submitFormHandler}>
        <WarehouseForm
          warehouseInfo={warehouseInfo}
          formErrors={formErrors}
          validationHandler={(event) => handleValidation(event, warehouseInfo, setWarehouseInfo, setFormErrors)}
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
