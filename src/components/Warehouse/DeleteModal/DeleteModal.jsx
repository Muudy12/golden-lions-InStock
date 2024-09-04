import { useState } from 'react'
import { ReactSVG } from "react-svg";
import axios from 'axios';
import ReactModal from 'react-modal'
import DeleteModalStyles from './DeleteModal.scss'

ReactModal.setAppElement('#root')

function DeleteModal({ warehouseName }) {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);

  const afterOpenModal = () => {
    subtitle.style.color = '#f00';
  };

  const closeModal = () => setShowModal(false);

  const handleDelete = async (event) => {
    const warehouseId = event.target.id;

    try{
      await axios.delete(``);
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
      <Modal
        isOpen={showModal}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={DeleteModalStyles}
        contentLabel='Delete Warehouse'>
        <h2 className='delete-modal__title'>{`Delete ${warehouseName} warehouse?`}</h2>
        <p1 className='delete-modal__text'>{`Please confirm that you'd like to delete the ${warehouseName} from the list of warehouses. You won't be able to undo this action?`}</p1>
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
      </Modal>
    </div>
  )
}

export default DeleteModal
