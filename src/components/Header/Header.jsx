import logo from '../../assets/logos/InStock-Logo_1x.png';
import { Link } from 'react-router-dom';

import "./Header.scss"

function Header() {
  return (
    <section className='header'>
      <img className='header-logo' src={logo} alt="In Stock Logo" />
      <section className='header-links'>
        <h3><Link className='header-links__item warehouse-link' to='/warehouses'>Warehouses</Link></h3>
        <h3><Link className='header-links__item inventory-link' to='/inventories'>Inventory</Link></h3>
      </section>
    </section>
  )
}

export default Header