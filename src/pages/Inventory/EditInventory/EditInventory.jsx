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
            <select className="form__select" type="text" placeholder="Television" name="item_name" >
              <option value='Electronics'>Electronics</option>
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
            <select className="form__select" type="text" name="item_name">
              <option>Washington</option>
            </select>
          </aside>

        </div>
      </form>
      <div className="edit-inventory__bottom">
        <button className="edit-inventory__cancel-btn">Cancel</button>
        <button className="edit-inventory__cancel-btn">Save</button>
      </div>
    </div>
  )
}

export default EditInventory
