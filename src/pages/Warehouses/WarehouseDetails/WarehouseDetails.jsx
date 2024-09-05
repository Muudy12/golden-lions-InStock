import React from 'react'
import './WarehouseDetails.scss'
import { useParams } from "react-router-dom";
import Inventory from '../../Inventory/Inventory.jsx';

function WarehouseDetails() {
  const params = useParams();
  return (
    <div>
      <Inventory warehouseId={params.warehouseId}/>
    </div>
  )
}

export default WarehouseDetails
