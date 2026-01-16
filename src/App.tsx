import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from './utils/constants';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import ProductsPage from './pages/products/ProductsPage';
import CategoriesPage from './pages/categories/CategoriesPage';
import SalesPage from './pages/sales/SalesPage';
import InventoryPage from './pages/inventory/InventoryPage';
import StockPage from './pages/stock/StockPage';
import StoreServicesPage from './pages/storeServices/StoreServicesPage';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.DASHBOARD} replace />} />
        <Route element={<Layout />}>
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTES.PRODUCTS} element={<ProductsPage />} />
          <Route path={ROUTES.CATEGORIES} element={<CategoriesPage />} />
          <Route path={ROUTES.SALES} element={<SalesPage />} />
          <Route path={ROUTES.INVENTORY} element={<InventoryPage />} />
          <Route path={ROUTES.STOCK} element={<StockPage />} />
          <Route path={ROUTES.STORE_SERVICES} element={<StoreServicesPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
