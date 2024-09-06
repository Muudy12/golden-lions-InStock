import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Api } from "../../../utils/utils";
import { ReactSVG } from "react-svg";
import backIcon from "../../../assets/icons/arrow_back-24px.svg";
import editIcon from "../../../assets/icons/edit-white-24px.svg";

import "./InventoryDetails.scss";

function InventoryDetails() {
  const api = new Api();
  const [inventoryItem, setInventoryItem] = useState({});
  const params = useParams();

  const getInventoryItemDetails = async () => {
    const response = await api.getInventoryItemDetails(
      params.warehouseId,
      params.inventoryId
    );
    console.log(response);
    setInventoryItem(response);
  };

  useEffect(() => {
    getInventoryItemDetails();
  }, [params.inventoryId, params.warehouseId]);

  return (
    <>
      <div className="inventory-details">
        <section className="inventory">
          <section className="inventory__header">
            <Link to={`/warehouses/${params.warehouseId}`}>
              <ReactSVG src={backIcon} />
            </Link>
            {inventoryItem ? (
              <h1 className="inventory__header--title">
                {inventoryItem.item_name}
              </h1>
            ) : (
              <p>Loading...</p>
            )}
          </section>
          <div className="inventory__header--wrapper">
            <Link
              className="inventory__header--wrapper-link"
              to={`/warehouse/${params.warehouseId}/${params.inventoryId}/edit`}
            >
              <ReactSVG
                className="inventory__header--wrapper-editIcon"
                src={editIcon}
              />
              <span>Edit</span>
            </Link>
          </div>
        </section>

        <section className="inventory-information">
          <div className="inventory-information__overview">
            <div>
              <h3 className="label">ITEM DESCRIPTION:</h3>
              <p className="inventory-information__description">
                <span className="inventory-information__description--text">
                  {inventoryItem.description}
                </span>
              </p>
            </div>
            <div>
              <h3 className="label">CATEGORY:</h3>
              <p>{inventoryItem.category}</p>
            </div>
          </div>

          <div>
            <section className="inventory-information__status">
              <div>
                <h3 className="label">STATUS:</h3>
                <h3
                  className={`inventory__status ${
                    inventoryItem.status === "In Stock"
                      ? "inventory__status--green"
                      : "inventory__status--red"
                  }`}
                >
                  {inventoryItem.status}
                </h3>
              </div>

              <div>
                <h3 className="label">QUANTITY:</h3>
                <p>{inventoryItem.quantity}</p>
              </div>
            </section>

            <div>
              <h3 className="label">WAREHOUSE:</h3>
              <p>{inventoryItem.warehouse_name}</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default InventoryDetails;
