import React from 'react'
import InventoryCard from '../../../components/Inventory/InventoryCard/InventoryCard.jsx'

function AddNewInventory() {
  document.title = "Instock - Add Inventory"
  return (
    <div>
      <InventoryCard cardTitle={"Add New Inventory Item"}/>
    </div>
  )
}

export default AddNewInventory
