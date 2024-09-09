import React, { useEffect, useState } from "react";
import "./Warehouses.scss";
import EditIcon from "../../assets/icons/edit-24px.svg";
import { ReactSVG } from "react-svg";
import ChevronIcon from "../../assets/icons/chevron_right-24px.svg";
import SortIcon from "../../assets/icons/sort-24px.svg";
import { useNavigate } from "react-router-dom";
import { Api } from "../../utils/utils";
import DeleteModal from "../../components/Warehouse/WarehouseDeleteModal/DeleteModal";

function Warehouses() {
  const api = new Api();
  const navigate = useNavigate();
  const [warehouses, setWarehouses] = useState([]);
  const [renderWarehouses, setRenderWarehouses] = useState([]);
  const [ascendingOrder, setAscendingOrder] = useState({
    warehouse_name: true,
    address: true,
    contact_name: true,
    contact_email: true,
  });

  useEffect(() => {
    document.title = "InStock - Warehouses";
    const getAllWarehouses = async () => {
      const data = await api.getAllWarehouses();
      setWarehouses(data);
      setRenderWarehouses(data);
    };

    getAllWarehouses();
  }, []);

  const editWarehouse = (warehouseId) => {
    navigate(`/warehouses/${warehouseId}/edit`);
  };

  const addWarehouse = () => {
    navigate(`/warehouses/add`);
  };

  const goToDetail = (warehouseId) => {
    navigate(`/warehouses/${warehouseId}`);
  };

  // Added this function to update the list of warehouses without having to re-render the page.
  //// Had to pass this function as prop to the delete modal:
  function updateWarehouseList(warehouseId) {
    setWarehouses(warehouses.filter((wh) => wh.id !== warehouseId));
    setRenderWarehouses(renderWarehouses.filter((wh) => wh.id !== warehouseId));
  }

  const handleSearch = (event) => {
    event.preventDefault();
    const keyword = event.target.value;
    const searchResult = warehouses.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(keyword.toLowerCase())
      )
    );
    setRenderWarehouses(searchResult);
  };

  const handleSort = async (event, columnName) => {
    event.preventDefault();
    setAscendingOrder((preState) => ({
      ...preState,
      [columnName]: !preState[columnName],
    }));
    const order = ascendingOrder[columnName] ? "asc" : "desc";
    const queryString =
      "?" + "sort_by=" + columnName + "&" + "order_by=" + order;
    const response = await api.getAllWarehouses(queryString);
    setWarehouses(response);
    setRenderWarehouses(response);
  };

  return (
    <div className="warehouses-container">
      <div className="warehouses">
        <header className="warehouses__title">
          <h1 className="warehouses__title-heading">Warehouses</h1>
          <div className="warehouses__title options">
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
            <button className="options__add-btn" onClick={addWarehouse}>
              + Add New Warehouse
            </button>
          </div>
        </header>

        <div className="warehouses__list-headers">
          <h3>
            WAREHOUSE
            <ReactSVG
              src={SortIcon}
              onClick={(event) => handleSort(event, "warehouse_name")}
            />
          </h3>
          <h3>
            ADDRESS
            <ReactSVG
              src={SortIcon}
              onClick={(event) => handleSort(event, "address")}
            />
          </h3>
          <h3>
            CONTACT NAME
            <ReactSVG
              src={SortIcon}
              onClick={(event) => handleSort(event, "contact_name")}
            />
          </h3>
          <h3>
            CONTACT INFORMATION
            <ReactSVG
              src={SortIcon}
              onClick={(event) => handleSort(event, "contact_email")}
            />
          </h3>
          <h3>ACTIONS</h3>
        </div>
        {renderWarehouses?.map((w, index) => {
          return (
            <div key={index} className="warehouses__list-item warehouse-item">
              <h3
                className="warehouse-item__title"
                data-label="WAREHOUSE"
                onClick={() => goToDetail(w.id)}
              >
                <span className="warehouse-item__title-name">
                  {w.warehouse_name}
                </span>
                <ReactSVG src={ChevronIcon} />
              </h3>
              <h3 className="warehouse-item__address" data-label="ADDRESS">
                <span>{w.address},&nbsp;</span>
                <span>
                  {w.city},&nbsp;{w.country}
                </span>
              </h3>
              <h3 className="warehouse-item__name" data-label="CONTACT NAME">
                {w.contact_name}
              </h3>
              <h3
                className="warehouse-item__information"
                data-label="CONTACT INFORMATION"
              >
                <span>{w.contact_phone}</span>
                <span>{w.contact_email}</span>
              </h3>
              <h3 className="warehouse-item__actions" data-label="ACTIONS">
                <DeleteModal
                  warehouseName={w.warehouse_name}
                  warehouseId={w.id}
                  updateWarehouseList={updateWarehouseList}
                />
                <ReactSVG src={EditIcon} onClick={() => editWarehouse(w.id)} />
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Warehouses;
