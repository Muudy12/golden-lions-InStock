import { React, useEffect, useState } from 'react';
import { ReactSVG } from "react-svg";
import { useNavigate  } from 'react-router-dom';
import { Api } from "../../utils/utils.js"

import './InventoryCard.scss'
import ArrowBackIcon from "../../assets/icons/arrow_back-24px.svg"
import FormError from '../FormError/FormError.jsx';

function InventoryCard({cardTitle, inventoryItem}) {

  const api  = new Api();
  const navigate = useNavigate();
  const [inStock, setInStock] = useState(true);
  const [createInventoryPage, setCreateInventoryPage] = useState(true);
  const [inventoryList, setinventoryList] = useState([])
  const [inventoryItemData, setInventoryItemData] = useState({
    item_name: inventoryItem?.item_name || '',
    description: inventoryItem?.description || '',
    category: inventoryItem?.category || '',
    status: inventoryItem?.status || 'In Stock',
    quantity: inventoryItem?.quantity || 1,
    warehouse_id: inventoryItem?.warehouse_id || null});
  const warehouseNameRegex = /"(.*?)"/;
  const warehouseIdRegex = /,(.*?)\]/;

  const [formErrors, setFormErrors] = useState({
    item_name: { isValid: true, errorMessage: '' },
    description: { isValid: true, errorMessage: '' },
    category: { isValid: true, errorMessage: '' },
    status: { isValid: true, errorMessage: '' },
    quantity: { isValid: true, errorMessage: '' },
    warehouse_id: { isValid: true, errorMessage: '' }
  })

  if (inventoryItem){
    setCreateInventoryPage(false);
  }

  useEffect(() => {
    const getInventoryList = async () => {
      const response = await api.getAllInventories();
      setinventoryList(response);
      }
    getInventoryList();
  }, []);

  const warehouseTypes = Array.from(
    new Set(inventoryList?.map((item)=>([item.warehouse_name, item.warehouse_id])).map(JSON.stringify)));
  const categoryTypes = Array.from(new Set(inventoryList?.map((item)=>(item.category))));

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    validationCheck(name, value);

    setInventoryItemData((prevData) => ({
        ...prevData,
          [name]: name ==='quantity'|| name ==='warehouse_id' ? parseInt(value, 10):value
        }));
    if (name === "status"){
      setInStock(value === 'In Stock')
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let formIsValid = true;
    Object.entries(inventoryItemData).forEach(([name, value]) => {
      if (!validationCheck(name, value)) {
        formIsValid = false;
      }
    })

    if (!formIsValid) {
      return
    }

    if(inventoryItemData.status === "Out of Stock"){
      inventoryItemData.quantity = 0;
    }else if (inventoryItemData.quantity === 0){
      inventoryItemData.status = "Out of Stock"
    }
    const response = api.createInventoryItem(inventoryItemData);
    navigate(`/inventory`);
    
  };

  const handlePageChange = () => {
    navigate(`/inventory`);
  }

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


  return (
    <div className='inventory-card'>
      <div className="inventory-card__header">
        <ReactSVG className="inventory-card__header-icon" src={ArrowBackIcon} onClick={handlePageChange} />
        <h1 className="inventory-card__header-title">{cardTitle}</h1>
      </div>
      <form className="inventory-card__form-wrapper" onSubmit={handleSubmit}>
        <div className='inventory-card__form'>
          <div className='inventory-card__form-details'>
          <h2 className="inventory-card__form-details-title">Item Details</h2>
            <h3 className="inventory-card__form-label">Item Name</h3>
            <input
              className="inventory-card__form-input"
              type="text"
              placeholder="Item Name"
              name="item_name"
              value={inventoryItemData.item_name}
              onChange={handleChange}
            />
            <FormError isValid={formErrors.item_name.isValid} errorMessage={formErrors.item_name.errorMessage} />

            <h3 className="inventory-card__form-label">Description</h3>
            <textarea
              className="inventory-card__form-input"
              type="text"
              placeholder="Please enter a brief item description..."
              name="description"
              value={inventoryItemData.description}
              onChange={handleChange}
            />
            <FormError isValid={formErrors.description.isValid} errorMessage={formErrors.description.errorMessage} />

            <h3 className="inventory-card__form-label">Category</h3>
            <select className="inventory-card__form-dropdown" 
            name="category" 
            value={inventoryItemData.category||""}
            onChange={handleChange}>
              <option value="Please select">Please select</option>
              {categoryTypes?.map((type,idx)=>(
                <option key={idx} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className='inventory-card__form-availability'>
            <h2 className="inventory-card__form-details-title">Item Availability</h2>
            <h3 className="inventory-card__form-label">Status</h3>
            <div className='inventory-card__form-radios'>

            <label className={`inventory-card__form-radio ${inStock ? "inventory-card__form-radio--selected" : ""}`}>
            <input 
            name="status" 
            type="radio" 
            value="In Stock" 
            checked={inventoryItemData.status === "In Stock"}
            onChange={handleChange}/>
            <span className='inventory-card__form-radio__circle'></span>
            In stock
            </label>

            <label className={`inventory-card__form-radio ${inStock ? "" : "inventory-card__form-radio--selected"}`} >
            <input
            name="status" 
            type="radio" 
            value="Out of Stock" 
            checked={inventoryItemData.status === "Out of Stock"}
            onChange={handleChange}/>
            <span className='inventory-card__form-radio__circle'></span>
            Out of stock
            </label>

            </div>
            {inStock && <span>
            <h3 className="inventory-card__form-label">Quantity</h3>
            <input
              className="inventory-card__form-input"
              type="number"
              placeholder="1"
              min="1"
              name="quantity"
              value={inventoryItemData.quantity||0}
              onChange={handleChange}
            /></span>}
            <FormError isValid={formErrors.quantity.isValid} errorMessage={formErrors.quantity.errorMessage} />

            <h3 className="inventory-card__form-label">Warehouse</h3>
            <select className='inventory-card__form-dropdown' 
            name="warehouse_id"
            value={inventoryItemData.warehouse_id||""}
            onChange={handleChange}>
              <option value="Please select">Please select</option>
              {warehouseTypes?.map((type,idx)=>(
                <option key={idx} value={type.match(warehouseIdRegex)[1]}>{type.match(warehouseNameRegex)[1]}</option>
              ))}
            </select>
          </div>
        </div>
        {createInventoryPage && <div className='inventory-card__form-buttons'>
          <button className='inventory-card__form-buttons-cancel' onClick={handlePageChange} >Cancel</button>
          <button className='inventory-card__form-buttons-add' type="submit">+ Add Item</button>
          </div>}
          {!createInventoryPage && <div className='inventory-card__form-buttons'>
          <button className='inventory-card__form-buttons-cancel' onClick={handlePageChange} >Cancel</button>
          <button className='inventory-card__form-buttons-save' type="submit">Save</button>
          </div>}
      
      </form>
    </div>
  )
}

export default InventoryCard