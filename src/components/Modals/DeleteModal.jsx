import "./DeleteModal.scss";
import { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import CloseIcon from "../../assets/icons/close-24px.svg";
import { Api } from "../../utils/utils";

function DeleteInventory({
  closeModal,
  isWarehouse,
  warehouseId,
  inventoryId,
}) {
  const [warehouse, setWarehouse] = useState(false);
  const [warehouseName, setWarehouseName] = useState("");
  const [inventoryName, setInventoryName] = useState("");
  //const api = new Api();

  useEffect(() => {
    if (isWarehouse) {
      const getWarehouseName = async () => {
        const name = "Washington";
        setWarehouseName(name);
        setWarehouse(true);
      };
      getWarehouseName();
    } else {
      const getInventoryName = async () => {
        const name = "Television";
        setInventoryName(name);
        setWarehouse(false);
      };
      getInventoryName();
    }
  }, [isWarehouse]);

  function deleteWarehouse(id) {
    alert(`Warehouse Delete! id: ${id}`);
    closeModal();
  }

  function deleteInventory(warehouseId, inventoryId) {
    alert(
      `Inventory Delete! warehouse id: ${warehouseId}; inventory id: ${inventoryId}`
    );
    closeModal();
  }

  return (
    <div className="delete">
      <div className="delete__modal modal">
        <ReactSVG
          src={CloseIcon}
          className="modal__close"
          onClick={() => closeModal()}
        />
        {warehouse && (
          <h1 className="modal__title">Delete {warehouseName} warehouse?</h1>
        )}
        {!warehouse && (
          <h1 className="modal__title">
            Delete {inventoryName} inventory item?
          </h1>
        )}
        {warehouse && (
          <p className="modal__text">
            Please confirm that you'd like to delete the {warehouseName} from
            the list of warehouses. You won't be able to undo this action.{" "}
          </p>
        )}
        {!warehouse && (
          <p className="modal__text">
            Please confirm that you'd like to delete {inventoryName} from the
            inventory list. <span>You won't be able to undo this action.</span>
          </p>
        )}
        <div className="modal__buttons button">
          <button className="button__cancel btn" onClick={() => closeModal()}>
            Cancel
          </button>
          {warehouse && (
            <button
              className="button__delete btn"
              onClick={() => deleteWarehouse(warehouseId)}
            >
              Delete
            </button>
          )}
          {!warehouse && (
            <button
              className="button__delete btn"
              onClick={() => deleteInventory(warehouseId, inventoryId)}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default DeleteInventory;
