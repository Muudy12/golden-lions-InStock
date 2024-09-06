import { React, useState, useEffect } from "react";
import { ReactSVG } from "react-svg";
import { Link, useNavigate  } from 'react-router-dom';
import "./Inventory.scss";
import { Api } from "./../../utils/utils.js";
import EditIcon from "../../assets/icons/edit-24px.svg";
import ChevronIcon from "../../assets/icons/chevron_right-24px.svg";
import SortIcon from "../../assets/icons/sort-24px.svg";
import DeleteInventory from "./Modals/DeleteModal.jsx";

function Inventory({ warehouseId }) {
  const api = new Api();
  const navigate = useNavigate();
  const [inventoryList, setInventoryList] = useState([]);

  const addInventory = ()=>{
    navigate("/inventory/add");
  }

  const goToDetail = (inventoryId) => {
    navigate(`/inventory/${inventoryId}`);
  };

  useEffect(() => {
    const getInventoryList = async () => {
      let response;
      console.log("test ", warehouseId, { warehouseId });
      if (warehouseId !== undefined) {
        response = await api.getInventoriesGivenWarehouseId(warehouseId);
      } else {
        response = await api.getAllInventories();
      }
      setInventoryList(response);
    };
    getInventoryList();
  }, []);

  return (
    <div className="inventories">
      {!warehouseId && <header className="inventories__title">
        <h1 className="inventories__title-heading">Inventory</h1>
        <div className="inventories__title options">
          <form
            className="options__search-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Search..."
              className="options__search-form-input"
            />
          </form>
          <button className="options__add-btn" onClick={addInventory}>+ Add New Item</button>
        </div>
      </header>}

      <div className="inventories__list-headers">
        <h3>
          INVENTORY ITEM
          <ReactSVG src={SortIcon} />
        </h3>
        <h3>
          CATEGORY
          <ReactSVG src={SortIcon} />
        </h3>
        <h3>
          STATUS
          <ReactSVG src={SortIcon} />
        </h3>
        <h3>
          QTY
          <ReactSVG src={SortIcon} />
        </h3>
        <h3>
          WAREHOUSE
          <ReactSVG src={SortIcon} />
        </h3>
        <h3>ACTIONS</h3>
      </div>

      {inventoryList?.map((inventoryItem, index) => {
        return (
          <div key={index} className="inventories__list-item inventory">
            <h3 className="inventory__title" data-label="INVENTORY ITEM">            
              <span
                  className="inventories__list-item__name"
                  onClick={() => goToDetail(inventoryItem.id)}
                >
                  {inventoryItem.item_name}
                </span>
              <ReactSVG src={ChevronIcon} onClick={() => goToDetail(inventoryItem.id)} />
            </h3>
            <h3 className="inventory__category" data-label="CATEGORY">
              {inventoryItem.category}
            </h3>
            <h3 data-label="STATUS">
              <div
                className={`inventory__status ${
                  inventoryItem.status === "In Stock"
                    ? "inventory__status--green"
                    : "inventory__status--red"
                }`}
              >
                {inventoryItem.status}
              </div>
            </h3>
            <h3 className="inventory__qty" data-label="QTY">
              {inventoryItem.quantity}
            </h3>
            <h3 className="inventory__warehouse_id" data-label="WAREHOUSE">
              {inventoryItem.warehouse_name}
            </h3>
            <h3 className="inventory__actions" data-label="ACTIONS">
              <DeleteInventory
                warehouseId={inventoryItem.warehouse_id}
                inventoryId={inventoryItem.id}
              />
              <ReactSVG src={EditIcon} />
            </h3>
          </div>
        );
      })}
    </div>
  );
}

export default Inventory;
