import { React, useState, useEffect } from "react";
import { ReactSVG } from "react-svg";
import axios from "axios";

import "./Inventory.scss";
import { baseUrl } from "./../../utils/utils.js";
import DeleteIcon from "../../assets/icons/delete_outline-24px.svg";
import EditIcon from "../../assets/icons/edit-24px.svg";
import ChevronIcon from "../../assets/icons/chevron_right-24px.svg";
import SortIcon from "../../assets/icons/sort-24px.svg";

function Inventory({ openModal }) {
  const [inventoryList, setInventoryList] = useState([]);

  useEffect(() => {
    const getInventoryList = async () => {
      const response = await axios.get(`${baseUrl}/inventories`);
      setInventoryList(response.data);
    };
    getInventoryList();
  }, []);

  return (
    <div className="inventories">
      <header className="inventories__title">
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
          <button className="options__add-btn">+ Add New Item</button>
        </div>
      </header>

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
              {inventoryItem.item_name}
              <ReactSVG src={ChevronIcon} />
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
              <ReactSVG
                src={DeleteIcon}
                onClick={() =>
                  openModal(false, inventoryItem.warehouse_id, inventoryItem.id)
                }
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
