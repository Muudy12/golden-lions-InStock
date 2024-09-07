import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Api } from '../../../utils/utils.js'
import ArrowBackIcon from "../../../assets/icons/arrow_back-24px.svg";

import './EditInventory.scss'
import FormError from "../../../components/FormError/FormError.jsx";

function EditInventory() {
  const api = new Api();
  const navigate = useNavigate();
  const location = useLocation();
  const { inventoryId } = useParams();
  const [inStock, setInStock] = useState(false);
  const formRef = useRef();
  const [allCategories, setAllCategories] = useState([]);
  const [allWarehouses, setAllWarehouses] = useState([]);

  const [formData, setFormData] = useState({
    item_name: '',
    description: '',
    category: '',
    status: '',
    quantity: '',
    warehouse_id: ''
  });

  const [formErrors, setFormErrors] = useState({
    item_name: { isValid: true, errorMessage: '' },
    description: { isValid: true, errorMessage: '' },
    category: { isValid: true, errorMessage: '' },
    status: { isValid: true, errorMessage: '' },
    quantity: { isValid: true, errorMessage: '' },
    warehouse_id: { isValid: true, errorMessage: '' }
  })

  const validationCheck = (name, value) => {
    let isValid = true;
    let errorMessage = '';

    if (typeof value === 'string' && value.trim() === '') {
      isValid = false;
      errorMessage = `${name.replace('_', ' ')} cannot be empty`
    }

    if (name === 'quantity' && inStock && isNaN(value)) {
      isValid = false;
      errorMessage = 'Quantity must be a number';
    }

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: { isValid, errorMessage },
    }))

    return isValid;
  }

  const getWarehouses = async () => {
    const data = await api.getAllWarehouses();
    const uniqueWarehouses = data.filter((value, index, self) =>
      index === self.findIndex((warehouse) => warehouse.id === value.id));
    console.log(uniqueWarehouses)
    setAllWarehouses(uniqueWarehouses)
  }

  const getCurrentItem = async () => {
    try {
      const data = await api.getInventoryItemDetails(formData.warehouseId, inventoryId);

      setAllCategories(await api.getInventoryCategories());

      setFormData({
        item_name: data.item_name,
        description: data.description,
        category: data.category,
        status: data.status || 'Out of Stock',
        quantity: data.quantity,
        warehouse_id: data.warehouse_id
      })
      setInStock(data.status === 'In Stock')
    } catch (err) {
      console.error("Error getting current item", err)
    }
  }
  useEffect(() => {
    getCurrentItem();
    getWarehouses();
  }, [formData.warehouseId, inventoryId]
  )

  const getUniqueCategories = (currentCategory) => (allCategories.filter(category => category !== currentCategory))

  const getUniqueWarehouses = (currentWarehouse) => (allWarehouses.filter(warehouse => warehouse.id !== currentWarehouse))

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    validationCheck(name, value);

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const handleInStockChange = async (event) => {
    const status = event.target.value;

    setFormData((previous) => ({
      ...previous,
      status,
    }));

    if(formData.status === 'Out of Stock'){
      setFormData((previousFormData) => ({
        ...previousFormData,
        quantity: 0,
      }))
    }

    setInStock(status === 'In Stock')
  }

  const handlePageChange = () => {
    if (location.state?.from?.includes('/warehouses')) {
      navigate(`/warehouses/${formData.warehouseId}`);
    } else if (location.state?.from?.includes('/inventory')) {
      navigate(`/inventory`);
    } else {
      navigate(`/warehouses/${formData.warehouseId}`);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    let formIsValid = true;
    Object.entries(formData).forEach(([name, value]) => {
      if (!validationCheck(name, value)) {
        formIsValid = false;
      }
    })

    if (!formIsValid) {
      return
    }

    try {
      await api.editInventory(inventoryId, formData);
      handlePageChange();
    } catch (err) {
      console.error('Unable to edit item', err)
    }
  };

  return (
    <div className="edit-inventory">
      <header className="edit-inventory__title">
        <img className="edit-inventory__arrow-icon" src={ArrowBackIcon} onClick={handlePageChange} />
        <h1 className="edit-inventory__title-heading">Edit Inventory Item</h1>
      </header>
      <form ref={formRef} className="form">
        <div className="form__container">
          <section className="form__section">
            <h2 className="form__title">Item Details</h2>
            <h3 className="form__label">Item Name</h3>
            <input
              className="form__input"
              type="text"
              placeholder="Television"
              name="item_name"
              value={formData.item_name}
              onChange={handleInputChange} />
            <FormError isValid={formErrors.item_name.isValid} errorMessage={formErrors.item_name.errorMessage} />

            <h3 className="form__label">Description</h3>
            <textarea
              className="form__textarea"
              placeholder='This 50", 4K LED TV provides a crystal-clear picture and vivid colors.'
              value={formData.description}
              onChange={handleInputChange}
              name="description" />
            <FormError isValid={formErrors.description.isValid} errorMessage={formErrors.description.errorMessage} />

            <h3 className="form__label">Category</h3>
            <div className="form__custom-select">
              <select className="form__select"
                type="text"
                name="category" >
                <option defaultValue={formData.category} >{formData.category}</option>
                {getUniqueCategories(formData.category).map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>

          </section>

          <aside className="form__aside">
            <h2 className="form__title">Item Availability</h2>
            <h3 className="form__label">Status</h3>
            <label htmlFor='in-stock' className="form__status" >
              <input className="form__radio-btn"
                type="radio"
                name="in-stock"
                id="in-stock"
                value='In Stock'
                checked={formData.status === 'In Stock'}
                onChange={handleInStockChange}
              />
              <span className="form__radio-circle"></span>
              In Stock
            </label>

            <label htmlFor='out-of-stock' className="form__status">
              <input className="form__radio-btn"
                type="radio"
                name="out-of-stock"
                id="out-of-stock"
                value='Out of Stock'
                checked={formData.status === 'Out of Stock'}
                onChange={handleInStockChange}
              />
              <span className="form__radio-circle"></span>
              Out of Stock</label>
            {inStock &&
              <>
                <h3 className="form__label">Quantity</h3>
                <input className="form__input form__input--quantity"
                  type="text" placeholder="500"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange} />
              </>}
              <FormError isValid={formErrors.quantity.isValid} errorMessage={formErrors.quantity.errorMessage} />

            <h3 className="form__label">Warehouse</h3>
            <div className="form__custom-select">
              <select className="form__select"
                type="text"
                name="warehouse_id"
                defaultValue={formData.warehouse_id}>
                {allWarehouses.map((warehouse) => (
                  <option key={warehouse.id} value={warehouse.id}>{warehouse.warehouse_name}</option>
                ))}
              </select>
            </div>

          </aside>

        </div>
      </form>
      <div className="edit-inventory__bottom">
        <button className="edit-inventory__cancel-btn" onClick={handlePageChange}>Cancel</button>
        <button className="edit-inventory__save-btn" onClick={handleSubmit}>Save</button>
      </div>
    </div>
  )
}

export default EditInventory
