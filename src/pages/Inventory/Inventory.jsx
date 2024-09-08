import { React, useState, useEffect } from "react";
import { ReactSVG } from "react-svg";
import { useNavigate, useLocation } from "react-router-dom";
import "./Inventory.scss";
import { Api } from "./../../utils/utils.js";
import EditIcon from "../../assets/icons/edit-24px.svg";
import ChevronIcon from "../../assets/icons/chevron_right-24px.svg";
import SortIcon from "../../assets/icons/sort-24px.svg";
import DeleteInventory from "../../components/Inventory/DeleteModal/DeleteModal.jsx";

function Inventory({ warehouseId }) {
  const navigate = useNavigate();
  const location = useLocation();
  const api = new Api();
  const [inventoryList, setInventoryList] = useState([]);

  const addInventory = () => {
    navigate("/inventory/add");
  };

  const goToDetail = (inventoryId) => {
    sessionStorage.setItem('previousUrl', window.location.pathname)
    navigate(`/inventory/${inventoryId}`);
  };

  useEffect(() => {
    document.title = "InStock - Inventory";
    const getInventoryList = async () => {
      let response;
      if (warehouseId !== undefined) {
        response = await api.getInventoriesGivenWarehouseId(warehouseId);
      } else {
        response = await api.getAllInventories();
      }
      setInventoryList(response);
    };
    getInventoryList();
  }, []);

  // Function to update list in client side without re-rending the page or component to avoid infinite loopings:
  // This function is passed as props to delete modal:
  function updateInventoryList(invId) {
    setInventoryList(inventoryList.filter((inv) => inv.id !== invId));
  }

  return (
    <div className="inventories-container">
      <div className="inventories">
        {!warehouseId && (
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
              <button className="options__add-btn" onClick={addInventory}>
                + Add New Item
              </button>
            </div>
          </header>
        )}

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
            <div key={index} className="inventories__list-item inventory-item">
              <h3 className="inventory-item__title" data-label="INVENTORY ITEM">
                <span
                  className="inventories__list-item__name"
                  onClick={() => goToDetail(inventoryItem.id)}
                >
                  {inventoryItem.item_name}
                </span>
                <ReactSVG
                  src={ChevronIcon}
                  onClick={() => goToDetail(inventoryItem.id)}
                />
              </h3>
              <h3 className="inventory-item__category" data-label="CATEGORY">
                {inventoryItem.category}
              </h3>
              <h3 data-label="STATUS">
                <div
                  className={`inventory-item__status ${
                    inventoryItem.status === "In Stock"
                      ? "status--green"
                      : "status--red"
                  }`}
                >
                  {inventoryItem.status}
                </div>
              </h3>
              <h3 className="inventory-item__qty" data-label="QTY">
                {inventoryItem.quantity}
              </h3>
              <h3
                className="inventory-item__warehouse_id"
                data-label="WAREHOUSE"
              >
                {inventoryItem.warehouse_name}
              </h3>
              <h3 className="inventory-item__actions" data-label="ACTIONS">
                <DeleteInventory
                  inventoryId={inventoryItem.id}
                  updateInventoryList={updateInventoryList}
                />
                <ReactSVG src={EditIcon} onClick={() => navigate(`/inventory/${inventoryItem.id}/edit`, {state: {from: location.pathname}})}/>
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Inventory;
