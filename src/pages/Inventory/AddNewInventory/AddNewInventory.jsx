import React from 'react'
import InventoryCard from '../../../components/InventoryCard/InventoryCard.jsx'
import './AddNewInventory.scss'

function AddNewInventory() {
  document.title = "Instock - Add Inventory"
  return (
    <div>
      <InventoryCard cardTitle={"Add New Inventory Item"}/>
    </div>
  )
}

export default AddNewInventory
