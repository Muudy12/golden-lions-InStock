import "./DeleteModal.scss";
import { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import CloseIcon from "../../../assets/icons/close-24px.svg";
import { Api } from "../../../utils/utils";
import ReactModal from "react-modal";
import DeleteIcon from "../../../assets/icons/delete_outline-24px.svg";

ReactModal.setAppElement("#root");

function DeleteInventory({ warehouseId, inventoryId }) {
  const [inventoryName, setInventoryName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const api = new Api();

  useEffect(() => {
    const getInventoryName = async () => {
      const name = "Television";
      setInventoryName(name);
    };
    getInventoryName();
  }, [isOpen]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  function deleteInventory(inventoryId) {
    const deleteItem = async () => {
      const response = await api.deleteInventoryById(inventoryId);
    };

    alert(
      `Inventory Delete! warehouse id: ${warehouseId}; inventory id: ${inventoryId}`
    );
    closeModal();
  }

  return (
    <>
      <ReactSVG src={DeleteIcon} onClick={() => openModal()} />
      <ReactModal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Delete Inventory Modal"
        className="delete-inventory"
        overlayClassName="delete-inventory__overlay"
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={true}
      >
        <div className="delete-inventory__modal modal">
          <ReactSVG
            src={CloseIcon}
            className="modal__close"
            onClick={() => closeModal()}
          />
          <h1 className="modal__title">
            Delete {inventoryName} inventory item?
          </h1>
          <p className="modal__text">
            Please confirm that you'd like to delete {inventoryName} from the
            inventory list. <span>You won't be able to undo this action.</span>
          </p>
          <div className="modal__buttons button">
            <button className="button__cancel btn" onClick={() => closeModal()}>
              Cancel
            </button>
            <button
              className="button__delete btn"
              onClick={() => deleteInventory(inventoryId)}
            >
              Delete
            </button>
          </div>
        </div>
      </ReactModal>
    </>
  );
}

export default DeleteInventory;
