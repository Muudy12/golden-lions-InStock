import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Api } from "../../../utils/utils";

import { ReactSVG } from "react-svg";
import backIcon from "../../../assets/icons/arrow_back-24px.svg";
import editIcon from "../../../assets/icons/edit-white-24px.svg";

import './WarehouseDetails.scss';

function WarehouseDetails() {
  const params = useParams();
  const [warehouse, setWarehouses] = useState({});
  const api = new Api();

  const getWarehouse = async () => {
    try {
      const response = await api.getAllWarehouses();
      const selectedWarehouse = response.find(item => item.id == params.warehouseId)
      setWarehouses(selectedWarehouse);
    } catch(error) {
      console.log('Error while getting all warehouse: ', error);
    }
  }
  
  useEffect(() => {
    getWarehouse();
  }, [params.warehouseId]);

  return (
    <>
    <div className='warehouse-details'>
        <section className='warehouse'>
          <section className='warehouse__header'>
            <Link to='/warehouses'><ReactSVG src={backIcon} /></Link>
            {warehouse?(<h1 className='warehouse__header--title'>{warehouse.warehouse_name}</h1>) : (<p>Loading...</p>)}
          </section>
          <div className='warehouse__header--wrapper'>
            <Link to={`/warehouse/${params.warehouseId}/edit`}><ReactSVG className='warehouse__header--wrapper-editIcon' src={editIcon} /></Link>
          </div>
        </section>
        <section className='warehouse-information'>
          <div>
          <h3>WAREHOUSE ADDRESS:</h3>
          <p>{warehouse.address}, {warehouse.city}, {warehouse.country}</p>
          </div>

          <section className='warehouse-information__contact'>
            <div>
              <h3>CONTACT NAME:</h3>
              <p>{warehouse.contact_name}</p>
              <p>{warehouse.contact_position}</p>
            </div>

            <div>
              <h3>CONTACT INFORMATION:</h3>
              <p>{warehouse.contact_phone}</p>
              <p>{warehouse.contact_email}</p>
            </div>
          </section>
        </section>
      </div>
    </>
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
