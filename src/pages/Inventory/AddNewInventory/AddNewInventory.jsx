import React from 'react'
import InventoryCard from '../../../components/InventoryCard/InventoryCard.jsx'
import './AddNewInventory.scss'

function AddNewInventory() {
  document.title = "Instock - Add Warehouse"
  return (
    <div>
      <InventoryCard cardTitle={"Add New Inventory Item"}/>
    </div>
  )
}

export default AddNewInventory
