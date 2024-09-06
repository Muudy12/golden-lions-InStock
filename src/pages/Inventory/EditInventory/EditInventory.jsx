import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Api } from '../../../utils/utils.js'
import ArrowBackIcon from "../../../assets/icons/arrow_back-24px.svg";
import './EditInventory.scss'

function EditInventory({ id, warehouse_id, item_name, description, category, status, quantity }) {
  const api = new Api();

  const { warehouseId, inventoryId } = useParams();
  console.log(warehouseId)
  console.log(inventoryId)
  const [inStock, setInStock] = useState(false);
  const formRef = useRef();

  const [formData, setFormData] = useState({
    item_name: '',
    description: '',
    category: '',
    status: '',
    quantity: '',
    warehouse_id: ''
  });


  // TODO: add form validation cannot submit blank info

  //TODO: API call will need to load the data from the database OR is it better to have props passed down from parent component?

  const getCurrentItem = async () => {
    try {
      const data = await api.getInventoryItemDetails(warehouseId, inventoryId);

      setFormData({
        item_name: data.item_name,
        description: data.description,
        category: data.category,
        status: data.status,
        quantity: data.quantity,
        warehouse_id: data.warehouse_id
      })
      setInStock(data.status === 'In Stock')
    } catch (err) {
      console.error("Error getting current item", err)
    }
  }
    useEffect(() => {
      getCurrentItem
    }, [warehouseId, inventoryId]
  )

  const fromValidation = (event) => {
    console.log('TODO: need to add form validation here can this be from the add item')
  }

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

  }


  return (
    <div className="edit-inventory">
      <header className="edit-inventory__title">
        <img src={ArrowBackIcon} />
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
            <textarea className="form__textarea" placeholder='This 50", 4K LED TV provides a crystal-clear picture and vivid colors.' name="item_name" />

            <h3 className="form__label">Category</h3>
            <select className="form__select" type="text" name="item_name" >
              {/* TODO: I think this could be a map function that produces all the electronics */}
              <option defaultValue={formData.category} >{formData.category}</option>
              <option value='Electronics'>Electronics</option>
              <option value='Accessories'>Accessories</option>
              <option value='Apparel'>Apparel</option>
              <option value='Gear'>Gear</option>
              <option value='Health'>Health</option>
            </select>
          </section>

          <aside className="form__aside">
            <h2 className="form__title">Item Availability</h2>
            <h3 className="form__label">Status</h3>
            <input className="form__radio-btn" type="radio" name="status" value='In Stock' />
            <label htmlFor='In Stock' className="form__stock-label">In Stock</label>
            <input className="form__radio-btn" type="radio" name="status" value='Out of Stock' />
            <label htmlFor='In Stock' className="form__stock-label">Out of Stock</label>

            <h3 className="form__label">Quantity</h3>
            <input className="form__input form__input--quantity" type="text" placeholder="500" name="item_name" value={formData.quantity} onChange={handleInputChange} />

            <h3 className="form__label">Warehouse</h3>
            <select className="form__select" type="text" name="warehouse_id">
              {/* TODO: I think this could be a map function that produces all the warehouses */}
              <option defaultValue="" >{formData.warehouse_id}</option>
              <option value="2">Washington</option>
              <option value="1">Manhattan</option>
              <option value="3">Jersey</option>
              <option value="4">SF</option>
              <option value="5">Santa Monica</option>
              <option value="6">Seattle</option>
              <option value="7">Miami</option>
              <option value="8">Boston</option>
            </select>
          </aside>

        </div>
      </form>
      <div className="edit-inventory__bottom">
        {/* TODO: add LINK for cancel and save */}
        <button className="edit-inventory__cancel-btn">Cancel</button>
        <button className="edit-inventory__save-btn">Save</button>
      </div>
    </div>
  )
}

export default EditInventory
