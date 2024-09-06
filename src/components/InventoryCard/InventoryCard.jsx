import { React, useState } from 'react';
import { ReactSVG } from "react-svg";
import { Api } from "../../utils/utils.js"

import './InventoryCard.scss'
import ArrowBackIcon from "../../assets/icons/arrow_back-24px.svg"

function InventoryCard({cardTitle, inventoryItem}) {

  const api  = new Api();
  const [createInventoryPage, setCreateInventoryPage] = useState(true);
  const [inventoryItemData, setInventoryItemData] = useState({
    item_name: inventoryItem?.item_name || '',
    description: inventoryItem?.description || '',
    category: inventoryItem?.category || '',
    status: inventoryItem?.status || '',
    quantity: inventoryItem?.quantity || null,
    warehouse_id: inventoryItem?.warehouse_id || null});

  if (inventoryItem){
    setCreateInventoryPage(false);
  }

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setInventoryItemData((prevData) => ({
      ...prevData,
      [name]: name ==='quantity'|| name ==='warehouse_id' ? parseInt(value, 10):value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let response;
    if (createInventoryPage){
      response = api.createInventoryItem(inventoryItemData);
    }
    else{
      //response = api.editInentory
      console.log(response);
    }
  };


  return (
    <div className='inventory-card'>
      <div className="inventory-card__header">
        <ReactSVG className="inventory-card__header-icon" src={ArrowBackIcon} />
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
              required
            />
            <h3 className="inventory-card__form-label">Description</h3>
            <input
              className="inventory-card__form-input"
              type="text"
              placeholder="Please enter a brief item description..."
              name="description"
              value={inventoryItemData.description}
              onChange={handleChange}
              required
            />
            <h3 className="inventory-card__form-label">Category</h3>
            <select className="inventory-card__form-dropdown" 
            name="category" 
            value={inventoryItemData.category}
            onChange={handleChange}>
              <option value="">Please select</option>
              <option value="gear">Gear</option>
              <option value="apparel">Apparel</option>
            </select>
          </div>
          <div className='inventory-card__form-availability'>
            <h2 className="inventory-card__form-details-title">Item Availability</h2>
            <h3 className="inventory-card__form-label">Category</h3>
            <div className='inventory-card__form-radios'>
            <h4>
            <input className="inventory-card__form-radio" 
            name="status" 
            type="radio" 
            value="In Stock" 
            checked={inventoryItemData.status === "In Stock"}
            onChange={handleChange}/>
            In stock
            </h4>
            <h4>
            <input className="inventory-card__form-radio" 
            name="status" 
            type="radio" 
            value="Out of Stock" 
            checked={inventoryItemData.status === "Out of Stock"}
            onChange={handleChange}/>
            Out of stock
            </h4>
            </div>
            <h3 className="inventory-card__form-label">Quantity</h3>
            <input
              className="inventory-card__form-input"
              type="number"
              placeholder="1"
              name="quantity"
              value={inventoryItemData.quantity}
              onChange={handleChange}
              required
            />
            <h3 className="inventory-card__form-label">Warehouse</h3>
            <select className='inventory-card__form-dropdown' 
            name="warehouse_id"
            value={inventoryItemData.warehouse_id}
            onChange={handleChange}>
              <option value="">Please select</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
        </div>
        {createInventoryPage && <div className='inventory-card__form-buttons'>
          <button className='inventory-card__form-buttons-cancel'>Cancel</button>
          <button className='inventory-card__form-buttons-add' type="submit">+ Add Item</button>
          </div>}
          {!createInventoryPage && <div className='inventory-card__form-buttons'>
          <button className='inventory-card__form-buttons-cancel'>Cancel</button>
          <button className='inventory-card__form-buttons-save' type="submit">Save</button>
          </div>}
      
      </form>
    </div>
  )
}

export default InventoryCard