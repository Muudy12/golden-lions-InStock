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
  const [onInventoryPage, setOnInventoryPage] = useState(warehouseId===undefined);
  const [inventoryList, setInventoryList] = useState([]);
  const [renderInventoryList, setRenderInventoryList] = useState([]);
  const [ascendingOrder, setAscendingOrder] = useState({
    item_name: true,
    category: true,
    status: true,
    quantity: true,
    warehouse_name: true,
  });

  const addInventory = () => {
    navigate("/inventory/add");
  };

  const goToDetail = (inventoryId) => {
    sessionStorage.setItem("previousUrl", window.location.pathname);
    navigate(`/inventory/${inventoryId}`);
  };

  useEffect(() => {
    document.title = "InStock - Inventory";
    const getInventoryList = async () => {
      let response;
      if (onInventoryPage) {
        response = await api.getAllInventories();       
      } else {
        response = await api.getInventoriesGivenWarehouseId(warehouseId);
      }
      setInventoryList(response);
      setRenderInventoryList(response);
    };

    getInventoryList();
  }, []);

  // Function to update list in client side without re-rending the page or component to avoid infinite loopings:
  // This function is passed as props to delete modal:
  function updateInventoryList(invId) {
    setInventoryList(inventoryList.filter((inv) => inv.id !== invId));
    setRenderInventoryList(
      renderInventoryList.filter((inv) => inv.id !== invId)
    );
  }

  const handleSearch = (event) => {
    event.preventDefault();
    const keyword = event.target.value;
    const searchResult = inventoryList.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(keyword.toLowerCase())
      )
    );
    setRenderInventoryList(searchResult);
  };

  const sortOnWarehouseDetailsPage = (colName, order) => {
    const sortedList = inventoryList.sort((a,b)=> {
      let result;
      if (typeof a[colName] === 'string'){
        result = a[colName].localeCompare(b[colName]);
      }else{
        result = a[colName]-b[colName]
      }
      return order==="asc"?result: -result;
    })
      
    setRenderInventoryList(sortedList);
  }

  const handleSort = async (event, columnName) => {
    event.preventDefault();
    setAscendingOrder((preState)=> ({
      ...preState, 
      [columnName]: !preState[columnName]
    }))
    const order = ascendingOrder[columnName]? "asc":"desc";

    if (onInventoryPage){
      const queryString = "?"+"sort_by="+columnName+"&"+"order_by="+order;
      const response = await api.getAllInventories(queryString);
      setInventoryList(response);
      setRenderInventoryList(response);
    }else {
      sortOnWarehouseDetailsPage(columnName, order);
    }
    
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
                  onChange={handleSearch}
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
            <ReactSVG
              src={SortIcon}
              onClick={(event) => handleSort(event, "item_name")}
            />
          </h3>
          <h3>
            CATEGORY
            <ReactSVG
              src={SortIcon}
              onClick={(event) => handleSort(event, "category")}
            />
          </h3>
          <h3>
            STATUS
            <ReactSVG
              src={SortIcon}
              onClick={(event) => handleSort(event, "status")}
            />
          </h3>
          <h3>
            QTY
            <ReactSVG
              src={SortIcon}
              onClick={(event) => handleSort(event, "quantity")}
            />
          </h3>
          {onInventoryPage && <h3>
            WAREHOUSE
            <ReactSVG src={SortIcon} onClick={(event)=>handleSort(event, "warehouse_name")}/>
          </h3>} 
          <h3>ACTIONS</h3>
        </div>

        {renderInventoryList?.map((inventoryItem, index) => {
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
                  {inventoryItem.status.toUpperCase()}
                </div>
              </h3>
              <h3 className="inventory-item__qty" data-label="QTY">
                {inventoryItem.quantity}
              </h3>
              {onInventoryPage && <h3
                className="inventory-item__warehouse_id"
                data-label="WAREHOUSE"
              >
                {inventoryItem.warehouse_name}
              </h3>}
              <h3 className="inventory-item__actions" data-label="ACTIONS">
                <DeleteInventory
                  inventoryId={inventoryItem.id}
                  inventoryName={inventoryItem.item_name}
                  updateInventoryList={updateInventoryList}
                />
                <ReactSVG
                  src={EditIcon}
                  onClick={() =>
                    navigate(`/inventory/${inventoryItem.id}/edit`, {
                      state: { from: location.pathname },
                    })
                  }
                />
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Inventory;
