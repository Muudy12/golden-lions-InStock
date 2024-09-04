import React, { useEffect, useState } from "react";
import "./Warehouses.scss";
import DeleteIcon from "../../assets/icons/delete_outline-24px.svg";
import EditIcon from "../../assets/icons/edit-24px.svg";
import { ReactSVG } from "react-svg";
import ChevronIcon from "../../assets/icons/chevron_right-24px.svg";
import SortIcon from "../../assets/icons/sort-24px.svg";
import { useNavigate } from "react-router-dom";
import { Api } from "../../utils/utils";

function Warehouses() {
  const api = new Api();
  const navigate = useNavigate();
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    const getAllWarehouses = async () => {
      const data = await api.getAllWarehouses();
      setWarehouses(data);
    };

    getAllWarehouses();
  }, [warehouses]);

  const deleteWarehouse = () => {
    alert("Delete Clicked!");
  };

  const editWarehouse = (warehouseId) => {
    alert("Edit Clicked!");
    navigate(`/warehouses/${warehouseId}/edit`);
  };

  const addWarehouse = () => {
    alert("Add Warehouse Clicked!");
    navigate(`/warehouses/add`);
  };

  const goToDetail = (warehouseId) => {
    alert("Warehouse Detail Clicked!");
    navigate(`/warehouses/${warehouseId}`);
  };

  return (
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
          <ReactSVG src={SortIcon} />
        </h3>
        <h3>
          ADDRESS
          <ReactSVG src={SortIcon} />
        </h3>
        <h3>
          CONTACT NAME
          <ReactSVG src={SortIcon} />
        </h3>
        <h3>
          CONTACT INFORMATION
          <ReactSVG src={SortIcon} />
        </h3>
        <h3>ACTIONS</h3>
      </div>
      {warehouses &&
        warehouses.map((w, index) => {
          return (
            <div key={index} className="warehouses__list-item warehouse">
              <h3 className="warehouse__title" data-label="WAREHOUSE">
                <span
                  className="warehouse__title-name"
                  onClick={() => goToDetail(w.id)}
                >
                  {w.warehouse_name}
                </span>
                <ReactSVG src={ChevronIcon} onClick={() => goToDetail(w.id)} />
              </h3>
              <h3 className="warehouse__address" data-label="ADDRESS">
                {w.address}, {w.city}, {w.country}
              </h3>
              <h3 className="warehouse__name" data-label="CONTACT NAME">
                {w.contact_name}
              </h3>
              <h3
                className="warehouse__information"
                data-label="CONTACT INFORMATION"
              >
                <span>{w.contact_phone}</span>
                <span>{w.contact_email}</span>
              </h3>
              <h3 className="warehouse__actions" data-label="ACTIONS">
                <ReactSVG src={DeleteIcon} onClick={deleteWarehouse} />
                <ReactSVG src={EditIcon} onClick={() => editWarehouse(w.id)} />
              </h3>
            </div>
          );
        })}
    </div>
  );
}

export default Warehouses;
