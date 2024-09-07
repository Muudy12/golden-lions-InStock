import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Api } from '../../../utils/utils.js'
import ArrowBackIcon from "../../../assets/icons/arrow_back-24px.svg";
import ArrowDownIcon from "../../../assets/icons/arrow_drop_down-24px.svg";
import './EditInventory.scss'
import { ReactSVG } from "react-svg";

function EditInventory({ id, warehouse_id, item_name, description, category, status, quantity }) {
  const api = new Api();
  const navigate = useNavigate();
  const { warehouseId, inventoryId } = useParams();
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

  // TODO: add form validation cannot submit blank info

  const getWarehouses = async () => {
    const data = await api.getAllWarehouses();
    const uniqueWarehouses = data.filter((value, index, self) =>
      index === self.findIndex((warehouse) => warehouse.id === value.id));
    console.log(uniqueWarehouses)
    setAllWarehouses(uniqueWarehouses)
  }

  const getCurrentItem = async () => {
    try {
      const data = await api.getInventoryItemDetails(warehouseId, inventoryId);

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
  }, [warehouseId, inventoryId]
  )

  const formValidation = (event) => {
    console.log('TODO: need to add form validation here can this be from the add item')
  }

  const getUniqueCategories = (currentCategory) => (allCategories.filter(category => category !== currentCategory))

  const getUniqueWarehouses = (currentWarehouse) => (allWarehouses.filter(warehouse => warehouse.id !== currentWarehouse))

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const handleStatusChange = (event) => {
    const status = event.target.value;
    setFormData({
      ...formData,
      status,
    });
    setInStock(status === 'In Stock')
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.editInventory(inventoryId, formData)
    } catch (error) {
      console.error('Error updating inventory item', error)
    }
  };

  const handleCancel = () => navigate(`/warehouses/${warehouseId}`);

  return (
    <div className="edit-inventory">
      <header className="edit-inventory__title">
        <img className="edit-inventory__arrow-icon" src={ArrowBackIcon} onClick={() => navigate(-1)} />
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

            <h3 className="form__label">Description</h3>
            <textarea
              className="form__textarea"
              placeholder='This 50", 4K LED TV provides a crystal-clear picture and vivid colors.'
              value={formData.description}
              onChange={handleInputChange}
              name="description" />

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
                name="status"
                id="in-stock"
                value='In Stock'
                checked={formData.status === 'In Stock'}
                onChange={handleStatusChange}
              />
              <span className="form__radio-circle"></span>
              In Stock
            </label>

            <label htmlFor='out-of-stock' className="form__status">
              <input className="form__radio-btn"
                type="radio"
                name="status"
                id="out-of-stock"
                value='Out of Stock'
                checked={formData.status === 'Out of Stock'}
                onChange={handleStatusChange}
              />
              <span className="form__radio-circle"></span>
              Out of Stock</label>
            {inStock &&
              <>
                <h3 className="form__label">Quantity</h3>
                <input className="form__input form__input--quantity" type="text" placeholder="500" name="quantity" value={formData.quantity} onChange={handleInputChange} />
              </>}

            <h3 className="form__label">Warehouse</h3>
            <div className="form__custom-select">
              <select className="form__select" type="text" name="warehouse_id" defaultValue={formData.warehouse_id}>
                {allWarehouses.map((warehouse) => (
                  <option key={warehouse.id} value={warehouse.id}>{warehouse.warehouse_name}</option>
                ))}
              </select>
            </div>

          </aside>

        </div>
      </form>
      <div className="edit-inventory__bottom">
        <button className="edit-inventory__cancel-btn" onClick={handleCancel}>Cancel</button>
        <button className="edit-inventory__save-btn" onClick={handleSubmit}>Save</button>
      </div>
    </div>
  )
}

export default EditInventory
