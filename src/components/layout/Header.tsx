import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { ROUTES } from '../../utils/constants';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <Link to={ROUTES.DASHBOARD} className="logo">
            <BookOpen size={24} />
            <h1>Librería Coquito</h1>
          </Link>
        </div>
        
        <nav className="header-nav">
          <ul className="nav-list">
            <li>
              <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
            </li>
            <li>
              <Link to={ROUTES.PRODUCTS}>Productos</Link>
            </li>
            <li>
              <Link to={ROUTES.CATEGORIES}>Categorías</Link>
            </li>
            <li>
              <Link to={ROUTES.SALES}>Ventas</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
