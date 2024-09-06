import { ReactSVG } from "react-svg";
import ArrowBackIcon from "../../../assets/icons/arrow_back-24px.svg";
import SortIcon from "../../../assets/icons/sort-24px.svg";
import './EditInventory.scss'

function EditInventory() {




  return (
    <div className="edit-inventory">
      <header className="edit-inventory__title">
        <img src={ArrowBackIcon} />
        <h1 className="edit-inventory__title-heading">Edit Inventory Item</h1>
      </header>
      <form className="form">
        <div className="form__container">
          <section className="form__section">
            <h2 className="form__title">Item Details</h2>
            <h3 className="form__label">Item Name</h3>
            <input className="form__input" type="text" placeholder="Television" name="item_name" />

            <h3 className="form__label">Description</h3>
            <textarea className="form__textarea" placeholder='This 50", 4K LED TV provides a crystal-clear picture and vivid colors.' name="item_name" />

            <h3 className="form__label">Category</h3>
            <select className="form__select" type="text" name="item_name" >
              {/* TODO: I think this could be a map function that produces all the electronics */}
              <option value="" disabled selected>Please select</option>
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
            <label for='In Stock'>In Stock</label>
            <input className="form__radio-btn" type="radio" name="status" value='Out of Stock' />
            <label for='In Stock'>Out of Stock</label>

            <h3 className="form__label">Quantity</h3>
            <input className="form__input" type="text" placeholder="500" name="item_name" />

            <h3 className="form__label">Warehouse</h3>
            <select className="form__select" type="text" name="warehouse_id">
               {/* TODO: I think this could be a map function that produces all the warehouses */}
              <option value="" disabled selected>Please select</option>
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
