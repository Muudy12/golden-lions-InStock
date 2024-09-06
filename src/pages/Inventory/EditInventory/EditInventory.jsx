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
          <h2 className="form__title">Item Details</h2>
          <h3 className="form__label">Item Name</h3>
          <input className="form__input" type="text" placeholder="Television" name="item_name" />

          <h3 className="form__label">Description</h3>
          <input className="form__input" type="text" placeholder="Television" name="item_name" />

          <h3 className="form__label">Category</h3>

          <h2 className="form__title">Item Availability</h2>
          <h3 className="form__label">Status</h3>

          <h3 className="form__label">Quantity</h3>

          <h3 className="form__label">Warehouse</h3>
          <select className="form__input" type="text" placeholder="Television" name="item_name">
            <option>Washington</option>
          </select>
        </div>
      </form>
    </div>
  )
}

export default EditInventory
