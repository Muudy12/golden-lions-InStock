import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

class Api {
  constructor() {
    this.baseUrl = baseUrl;
  }

  async getAllWarehouses() {
    try {
      const response = await axios.get(`${this.baseUrl}/warehouses`);
      return response.data;
    } catch (err) {
      console.log(`Failed to get all warehouses.`);
    }
  }

  async getWarehouseById(id) {
    try {
      const response = await axios.get(`${this.baseUrl}/warehouses/${id}`);
      return response.data;
    } catch (err) {
      console.log(`Failed to get warehouse with id: ${id}`);
    }
  }

  async deleteInventoryById(id) {
    try {
      const response = await axios.delete(`${this.baseUrl}/inventories/${id}`);
      return response.data;
    } catch (err) {
      console.log(`Failed to delete inventory item with id: ${id}`);
    }
  }

  async getAllInventories() {
    try {
      const response = await axios.get(`${baseUrl}/inventories`);
      return response.data;
    } catch (err) {
      console.log(`Failed to get all inventories.`);
    }
  }

  async getInventoriesGivenWarehouseId(warehouseId) {
    try {
      const response = await axios.get(
        `${baseUrl}/warehouses/${warehouseId}/inventories`
      );
      return response.data;
    } catch (err) {
      console.log(
        `Failed to get all inventories with warehouse id: ${warehouseId}.`
      );
    }
  }

  async getInventoryItemDetails(warehouseId, inventoryId) {
    try {
      const response = await axios.get(`${baseUrl}/warehouses/${warehouseId}/inventories/${inventoryId}`);
      return response.data;
    } catch (err) {
      console.log(`Failed to get inventory item with id: ${inventoryId} for warehouse with id: ${warehouseId}.`);
    }
  }

  async createInventoryItem(inventoryItemData) {
    try {
      const response = await axios.post(`${baseUrl}/inventories`, inventoryItemData);
      return response.data;
    } catch (err) {
      console.log(`Failed to create a new inventory item.`);
    }
  }

}

export { Api, baseUrl };
