import { useState } from 'react'
import { ReactSVG } from "react-svg";
import { baseUrl } from "../../../utils/utils.js";
import DeleteIcon from "../../../assets/icons/delete_outline-24px.svg";
import CloseIcon from "../../../assets/icons/close-24px.svg";
import axios from 'axios';
import ReactModal from 'react-modal'
import './DeleteModal.scss'
import { useParams } from 'react-router-dom';

ReactModal.setAppElement('#root')

function DeleteModal({ warehouseName }) {
  const [showModal, setShowModal] = useState(false);
  const {warehouseId} = useParams();

  const openModal = () => setShowModal(true);

  const afterOpenModal = () => {
    console.log("I don't know what to put in this but it was in the example!")
  };

  const closeModal = () => setShowModal(false);

  const handleDelete = async () => {


    try {
      console.log(`Delete button has been clicked to delete warehouseId: ${warehouseId} .`)
      await axios.delete(`${baseUrl}/warehouses/${warehouseId}/`);
    } catch (error) {
      console.error('Error deleting warehouse', error)
    }
  }
  return (
    <div>
      <a
        className='warehouse__delete-btn'
        onClick={openModal}>
        <ReactSVG src={DeleteIcon} />
      </a>
      <ReactModal
        isOpen={showModal}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel='Delete Warehouse'
      className='delete-modal'
      overlayClassName='delete-modal__overlay'
      >
        <div className='delete-modal__top-container'>
          <ReactSVG src={CloseIcon} />
        </div>
        <h2 className='delete-modal__title'>{`Delete ${warehouseName} warehouse?`}</h2>
        <p className='delete-modal__text'>{`Please confirm that you'd like to delete the ${warehouseName} from the list of warehouses. You won't be able to undo this action?`}</p>
        <div className='delete-modal__container'>
          <button
            className='delete-modal__cancel-btn'
            onClick={closeModal}>
            Cancel
          </button>

          <button
            className='delete-modal__delete-btn'
            onClick={handleDelete} >
            Delete
          </button>
        </div>
      </ReactModal>
    </div>
  )
}

export default DeleteModal
