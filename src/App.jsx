import "./App.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Warehouses from "./pages/Warehouses/Warehouses";
import AddNewWarehouse from "./pages/Warehouses/AddNewWarehouse/AddNewWarehouse";
import EditWarehouse from "./pages/Warehouses/EditWarehouse/EditWarehouse";
import WarehouseDetails from "./pages/Warehouses/WarehouseDetails/WarehouseDetails";
import Inventory from "./pages/Inventory/Inventory";
import InventoryDetails from "./pages/Inventory/InventoryDetails/InventoryDetails";
import EditInventory from "./pages/Inventory/EditInventory/EditInventory";
import AddNewInventory from "./pages/Inventory/AddNewInventory/AddNewInventory";
import "./App.scss";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <>
    <div className="full-page">
      <BrowserRouter>
      <div className="full-page__content">
        <Header />
        <Routes>
          <Route path='/' element={<Warehouses />} />
          <Route path='/warehouses' element={<Navigate to="/" />} />
          <Route path='/warehouses/:warehouseId' element={<WarehouseDetails />} />
          <Route path='/warehouses/:warehouseId/:inventoryId' element={<InventoryDetails />} />
          <Route path='/warehouses/:warehouseId/edit' element={<EditWarehouse />} />
          <Route path='/warehouses/add' element={ <AddNewWarehouse /> } />

          <Route path='/inventory/' element={<Inventory />} />
          <Route path='/inventory/:inventoryId' element={<InventoryDetails />} />
          <Route path='/inventory/:inventoryId/edit' element={<EditInventory />} />
          <Route path='/inventory/add' element={<AddNewInventory/>} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
      <div className="full-page__footer">
        <Footer />
      </div>
      </BrowserRouter>
    </div>
    </>
  );
}

export default App;
