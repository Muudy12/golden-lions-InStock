import React, { useState } from 'react'
import ReactModal from 'react-modal'
import './DeleteModal.scss'

ReactModal.setAppElement('#root')

function DeleteModal() {
const [showModal, setShowModal] = useState(false);

const openModal = () => setShowModal(true);
const afterOpenModal = () => setShowModal(true);
const closeModal = () => setShowModal(false);

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
    </div>
  )
}

export default DeleteModal
