import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Tags, 
  DollarSign, 
  ClipboardList, 
  TrendingUp, 
  Wrench 
} from 'lucide-react';
import { ROUTES } from '../../utils/constants';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };
  
  const menuItems = [
    { path: ROUTES.DASHBOARD, label: 'Dashboard', Icon: LayoutDashboard },
    { path: ROUTES.PRODUCTS, label: 'Productos', Icon: Package },
    { path: ROUTES.CATEGORIES, label: 'Categorías', Icon: Tags },
    { path: ROUTES.SALES, label: 'Ventas', Icon: DollarSign },
    { path: ROUTES.INVENTORY, label: 'Inventario', Icon: ClipboardList },
    { path: ROUTES.STOCK, label: 'Stock', Icon: TrendingUp },
    { path: ROUTES.STORE_SERVICES, label: 'Servicios', Icon: Wrench },
  ];
  
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={`sidebar-link ${isActive(item.path)}`}
              >
                <span className="sidebar-icon">
                  <item.Icon size={20} />
                </span>
                <span className="sidebar-label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
