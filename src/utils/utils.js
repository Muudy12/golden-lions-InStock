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
      const response = await axios.delete();
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
      const response = await axios.get(`${baseUrl}/warehouses/${warehouseId}/inventories`);
      return response.data;
    } catch (err) {
      console.log(`Failed to get all inventories with warehouse id: ${warehouseId}.`);
    }
  }

}


export { Api, baseUrl };
