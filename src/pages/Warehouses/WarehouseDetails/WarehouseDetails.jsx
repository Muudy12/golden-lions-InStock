import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ReactSVG } from "react-svg";
import backIcon from "../../../assets/icons/arrow_back-24px.svg";
import editIcon from "../../../assets/icons/edit-white-24px.svg";


import './WarehouseDetails.scss';

function WarehouseDetails() {
  const params = useParams();
  const [warehouse, setWarehouse] = useState();

  useEffect(() => {
    const data = getTestData();

    const foundWarehouse = data.find(item => item.id == params.warehouseId);
    if (foundWarehouse) {
      setWarehouse(foundWarehouse);
    }
  }, [params.warehouseId]);

  return (
    <div>
      <section className='warehouse'>
        <section className='warehouse__header'>
          <ReactSVG src={backIcon} />
          {warehouse?(<h1 className='warehouse__header--title'>{warehouse.warehouse_name}</h1>) : (<p>Loading...</p>)}
        </section>
        <div className='warehouse__header--wrapper'>
          <ReactSVG className='warehouse__header--wrapper-editIcon' src={editIcon} />
        </div>
      </section>
    </div>
  );
}

function getTestData() {
  return [
    {
      id: 1,
      warehouse_name: 'Manhattan',
      address: '503 Broadway',
      city: 'New York',
      country: 'USA',
      contact_name: 'Parmin Aujla',
      contact_position: 'Warehouse Manager',
      contact_phone: '+1 (646) 123-1234',
      contact_email: 'paujla@instock.com',
    },
    {
      id: 2,
      warehouse_name: 'Washington',
      address: '33 Pearl Street SW',
      city: 'Washington',
      country: 'USA',
      contact_name: 'Greame Lyon',
      contact_position: 'Warehouse Manager',
      contact_phone: '+1 (646) 123-1234',
      contact_email: 'glyon@instock.com',
    },
    {
      id: 3,
      warehouse_name: 'Jersey',
      address: '300 Main Street',
      city: 'New Jersey',
      country: 'USA',
      contact_name: 'Brad MacDonald',
      contact_position: 'Warehouse Manager',
      contact_phone: '+1 (646) 123-1234',
      contact_email: 'bmcdonald@instock.com',
    },
  ];
}

export default WarehouseDetails;
