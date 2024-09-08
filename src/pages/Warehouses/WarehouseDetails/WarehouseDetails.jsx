import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Api } from "../../../utils/utils";
import Inventory from '../../Inventory/Inventory.jsx';
import { ReactSVG } from "react-svg";
import backIcon from "../../../assets/icons/arrow_back-24px.svg";
import editIcon from "../../../assets/icons/edit-white-24px.svg";

import "./WarehouseDetails.scss";

function WarehouseDetails() {
  const params = useParams();
  const [warehouse, setWarehouse] = useState({});
  const api = new Api();

  const getWarehouse = async () => {
    try {
      const response = await api.getWarehouseById(params.warehouseId);
      setWarehouse(response);
    } catch (error) {
      console.log("Error while getting all warehouse: ", error);
    }
  };

  useEffect(() => {
    getWarehouse();
    document.title = "Warehouse - Details";
  }, [params.warehouseId]);

  return (
    <>
      <div className="warehouse-details">
        <section className="warehouse">
          <section className="warehouse__header">
            <Link to="/warehouses">
              <ReactSVG src={backIcon} />
            </Link>
            {warehouse ? (
              <h1 className="warehouse__header--title">
                {warehouse.warehouse_name}
              </h1>
            ) : (
              <p>Loading...</p>
            )}
          </section>
          <div className="warehouse__header--wrapper">
            <Link
              className="warehouse__header--wrapper-link"
              to={`/warehouses/${params.warehouseId}/edit`}
            >
              <ReactSVG
                className="warehouse__header--wrapper-editIcon"
                src={editIcon}
              />
              <span>Edit</span>
            </Link>
          </div>
        </section>
        <section className="warehouse-information">
          <div>
            <h3>WAREHOUSE ADDRESS:</h3>
            <p className="warehouse-information__address">
              <span className="warehouse-information__address--street">{warehouse.address},</span>
              <span>{warehouse.city}, {warehouse.country}</span>
            </p>
          </div>

          <section className="warehouse-information__contact">
            <div>
              <h3>CONTACT NAME:</h3>
              <p>{warehouse.contact_name}</p>
              <p>{warehouse.contact_position}</p>
            </div>

            <div>
              <h3>CONTACT INFORMATION:</h3>
              <p>{warehouse.contact_phone}</p>
              <p>{warehouse.contact_email}</p>
            </div>
          </section>
        </section>
        <Inventory warehouseId={params.warehouseId}/>
      </div>
    </>
  );
}

export default WarehouseDetails;
