import logo from '../../assets/logos/InStock-Logo_1x.png';
import { Link, useLocation  } from 'react-router-dom';

import "./Header.scss"

function Header() {

  const location = useLocation();

  return (
    <section className='header'>
      <Link className='header-link' to="/"><img className='header-logo' src={logo} alt="In Stock Logo" /></Link>
      <section className='header-links'>
        <h3><Link className={`header-links__item ${location.pathname.includes('warehouses')||location.pathname === '/'?'active-link':''}`} to='/warehouses'>Warehouses</Link></h3>
        <h3><Link className={`header-links__item ${location.pathname.includes('inventories')?'active-link':''}`} to='/inventories'>Inventory</Link></h3>
      </section>
    </section>
  )
}

export default Header