import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import { useState } from "react";
import DeleteInventory from "./components/Modals/DeleteModal";

function App() {
  const [deleteInv, setDeleteInv] = useState(false);
  const [warehouseId, setWarehouseId] = useState("");
  const [inventoryId, setInventoryId] = useState("");
  const [isWarehouse, setIsWarehouse] = useState("");

  function closeModal() {
    setDeleteInv(false);
  }

  function openModal(isWarehouse, warehouseId, inventoryId) {
    setIsWarehouse(isWarehouse);
    setWarehouseId(warehouseId);
    setInventoryId(inventoryId ? inventoryId : "");
    setDeleteInv(true);
  }

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Warehouses />} />
          <Route path="/warehouses" element={<Warehouses />} />
          <Route
            path="/warehouses/:warehouseId"
            element={<WarehouseDetails />}
          />
          <Route
            path="/warehouses/:warehouseId/edit"
            element={<EditWarehouse />}
          />
          <Route path="/warehouses/add" element={<AddNewWarehouse />} />

          <Route
            path="/inventories/"
            element={<Inventory openModal={openModal} />}
          />
          <Route
            path="/inventories/:inventoryId"
            element={<InventoryDetails />}
          />
          <Route
            path="/inventories/:inventoryId/edit"
            element={<EditInventory />}
          />
          <Route path="/inventories/add" element={<AddNewInventory />} />
        </Routes>
        <Footer />
        {deleteInv && (
          <DeleteInventory
            closeModal={closeModal}
            isWarehouse={isWarehouse}
            warehouseId={warehouseId}
            inventoryId={inventoryId}
          />
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
