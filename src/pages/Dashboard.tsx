import { Package, DollarSign, Tags, TrendingDown } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p className="dashboard-subtitle">
          Bienvenido a Librería Coquito - Sistema de Gestión
        </p>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Package size={32} />
          </div>
          <div className="stat-content">
            <h3 className="stat-label">Total Productos</h3>
            <p className="stat-value">-</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <DollarSign size={32} />
          </div>
          <div className="stat-content">
            <h3 className="stat-label">Ventas del Mes</h3>
            <p className="stat-value">-</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <Tags size={32} />
          </div>
          <div className="stat-content">
            <h3 className="stat-label">Categorías</h3>
            <p className="stat-value">-</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <TrendingDown size={32} />
          </div>
          <div className="stat-content">
            <h3 className="stat-label">Stock Bajo</h3>
            <p className="stat-value">-</p>
          </div>
        </div>
      </div>
      
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>Productos Más Vendidos</h2>
          <div className="card-content">
            <p className="placeholder-text">Los datos se cargarán próximamente...</p>
          </div>
        </div>
        
        <div className="dashboard-card">
          <h2>Ventas Recientes</h2>
          <div className="card-content">
            <p className="placeholder-text">Los datos se cargarán próximamente...</p>
          </div>
        </div>
        
        <div className="dashboard-card">
          <h2>Alertas de Inventario</h2>
          <div className="card-content">
            <p className="placeholder-text">Los datos se cargarán próximamente...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
