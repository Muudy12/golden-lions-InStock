import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ArrowBackIcon from "../../../assets/icons/arrow_back-24px.svg";
import './EditInventory.scss'

function EditInventory({ id, warehouse_id, item_name, description, category, status, quantity }) {
  const [inStock, setInStock] = useState(status);
  const [inventoryItem, setInventoryItem] = useState(null);
  const [itemName, setItemName] = useState(item_name);
  const {inventoryId} = useParams();
  const formRef = useRef();

  const [formErrors, setFormErrors] = useState({
    warehouse_id: warehouse_id,
    item_name: true,
    description: true,
    category: true,
    status: true,
    quantity: true
  });

  // TODO: add form validation cannot submit blank info

  //TODO: API call will need to load the data from the database OR is it better to have props passed down from parent component?
  // useEffect(() => {
  //   const getOneInventory = async => {
  //     try{
  //       getAllInventories()
  //     }catch{

  //     }
  //   }
  // }
  // )


  const fromValidation = (event) => {
    console.log('TODO: need to add form validation here can this be from the add item')
  }

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
            value="Television"
            onChange={(event) => setItemName(event.target.value)} />

            <h3 className="form__label">Description</h3>
            <textarea className="form__textarea" placeholder='This 50", 4K LED TV provides a crystal-clear picture and vivid colors.' name="item_name" />

            <h3 className="form__label">Category</h3>
            <select className="form__select" type="text" name="item_name" >
              {/* TODO: I think this could be a map function that produces all the electronics */}
              <option defaultValue="" disabled>Please select</option>
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
            <input className="form__input form__input--quantity" type="text" placeholder="500" name="item_name" />

            <h3 className="form__label">Warehouse</h3>
            <select className="form__select" type="text" name="warehouse_id">
               {/* TODO: I think this could be a map function that produces all the warehouses */}
              <option defaultValue="" disabled>Please select</option>
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
        <button className="edit-inventory__cancel-btn">Cancel</button>
        <button className="edit-inventory__save-btn">Save</button>
      </div>
    </div>
  )
}

export default EditInventory
