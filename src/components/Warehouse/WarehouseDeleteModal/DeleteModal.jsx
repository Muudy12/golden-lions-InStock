import { useState } from "react";
import { ReactSVG } from "react-svg";
import { baseUrl } from "../../../utils/utils.js";
import DeleteIcon from "../../../assets/icons/delete_outline-24px.svg";
import CloseIcon from "../../../assets/icons/close-24px.svg";
import axios from "axios";
import ReactModal from "react-modal";
import "./DeleteModal.scss";

ReactModal.setAppElement("#root");

function DeleteModal({ warehouseName, warehouseId, updateWarehouseList }) {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);

  const closeModal = () => setShowModal(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`${baseUrl}/warehouses/${warehouseId}/`);
      updateWarehouseList(warehouseId); // once api successfully deleted the item, then update the client side.
    } catch (error) {
      console.error("Error deleting warehouse", error);
    }
    setShowModal(false);
  };
  return (
    <div>
      <a className="warehouse__delete-btn" onClick={openModal}>
        <ReactSVG src={DeleteIcon} />
      </a>
      <ReactModal
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel="Delete Warehouse"
        className="delete-modal"
        overlayClassName="delete-modal__overlay"
      >
        <div className="delete-modal__top-container">
          <img
            src={CloseIcon}
            onClick={closeModal}
            className="delete-modal__close"
          />
        </div>
        <h2 className="delete-modal__title">{`Delete ${warehouseName} warehouse?`}</h2>
        <p className="delete-modal__text large">{`Please confirm that you'd like to delete the ${warehouseName} from the list of warehouses. You won't be able to undo this action?`}</p>
        <div className="delete-modal__container">
          <button className="delete-modal__cancel-btn" onClick={closeModal}>
            Cancel
          </button>

          <button className="delete-modal__delete-btn" onClick={() => handleDelete()}>
            Delete
          </button>
        </div>
      </ReactModal>
    </div>
  );
}

export default DeleteModal;
