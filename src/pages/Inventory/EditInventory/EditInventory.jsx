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
  const [uniqueCategories, setUniqueCategories] = useState([]);
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
    setAllWarehouses(uniqueWarehouses)
  }

  const getCurrentItem = async () => {
    try {
      const data = await api.getInventoryItemDetails(inventoryId);
      const categories = await api.getInventoryCategories();

      setAllCategories(categories);
      setUniqueCategories(categories.filter(category => category !== data.category));

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
      console.error("Error getting current item")
    }
  }
  useEffect(() => {
    document.title = "InStock - Edit Inventory"
    getCurrentItem();
    getWarehouses();
  }, [inventoryId])

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
    setFormData((previousFormData) => ({
      ...previousFormData,
      quantity: status === 'Out of Stock' ? 0 : 1,
    }))

    setInStock(status === 'In Stock')
  }

  const handlePageChange = () => {
    navigate(location.state?.from)
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
      <form ref={formRef} className="edit-inv-form">
        <div className="edit-inv-form__container">
          <section className="edit-inv-form__section">
            <h2 className="edit-inv-form__title">Item Details</h2>
            <h3 className="edit-inv-form__label">Item Name</h3>
            <input
              className="edit-inv-form__input"
              type="text"
              placeholder="Television"
              name="item_name"
              value={formData.item_name}
              onChange={handleInputChange} />
            <FormError isValid={formErrors.item_name.isValid} errorMessage={formErrors.item_name.errorMessage} />

            <h3 className="edit-inv-form__label">Description</h3>
            <textarea
              className="edit-inv-form__textarea"
              placeholder='This 50", 4K LED TV provides a crystal-clear picture and vivid colors.'
              value={formData.description}
              onChange={handleInputChange}
              name="description" />
            <FormError isValid={formErrors.description.isValid} errorMessage={formErrors.description.errorMessage} />

            <h3 className="edit-inv-form__label">Category</h3>
            <div className="edit-inv-form__custom-select">
              <select className="edit-inv-form__select"
                type="text"
                name="category"
                onChange={handleInputChange} >
                <option defaultValue={formData.category} >{formData.category}</option>
                {uniqueCategories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>

          </section>

          <aside className="edit-inv-form__aside">
            <h2 className="edit-inv-form__title">Item Availability</h2>
            <h3 className="edit-inv-form__label">Status</h3>
            <label htmlFor='in-stock' className={`edit-inv-form__status ${!inStock ? "" : "edit-inv-form__status--selected"}`} >
              <input className="edit-inv-form__radio-btn"
                type="radio"
                name="status"
                id="in-stock"
                value='In Stock'
                checked={formData.status === 'In Stock'}
                onChange={handleInStockChange}
              />
              <span className="edit-inv-form__radio-circle"></span>
              In Stock
            </label>

            <label htmlFor='out-of-stock' className={`edit-inv-form__status ${inStock ? "" : "edit-inv-form__status--selected"}`}>
              <input className="edit-inv-form__radio-btn"
                type="radio"
                name="status"
                id="out-of-stock"
                value='Out of Stock'
                checked={formData.status === 'Out of Stock'}
                onChange={handleInStockChange}
              />
              <span className="edit-inv-form__radio-circle"></span>
              Out of Stock</label>
            {inStock &&
              <>
                <h3 className="edit-inv-form__label">Quantity</h3>
                <input className="edit-inv-form__input edit-inv-form__input--quantity"
                  type="text" placeholder="500"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange} />
              </>}
            <FormError isValid={formErrors.quantity.isValid} errorMessage={formErrors.quantity.errorMessage} />

            <h3 className="edit-inv-form__label">Warehouse</h3>
            <div className="edit-inv-form__custom-select">
              <select className="edit-inv-form__select"
                type="text"
                name="warehouse_id"
                onChange={handleInputChange} >
                {allWarehouses.length > 0 && (
                  <option defaultValue={formData.warehouse_id} value={formData.warehouse_id} >{allWarehouses.find(warehouse => warehouse.id === formData.warehouse_id)?.warehouse_name || "Please Select"}</option>
                )}

                {allWarehouses.filter(warehouse => warehouse.id !== formData.warehouse_id)
                .map((warehouse) => (
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
