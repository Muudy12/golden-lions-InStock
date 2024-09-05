import { ReactSVG } from "react-svg";
import ArrowBackIcon from "../../../assets/icons/arrow_back-24px.svg";
import SortIcon from "../../../assets/icons/sort-24px.svg";
import './EditInventory.scss'

function EditInventory() {
  return (
    <div className="inventory">
      <header className="inventory__title">
        <ReactSVG src={ArrowBackIcon} />
        <h1 className="inventory__title-heading">Edit Inventory Item</h1>
      </header>
      <h3>
        WAREHOUSE
        <ReactSVG src={SortIcon} />
      </h3>
    </div>
  )
}

export default EditInventory
