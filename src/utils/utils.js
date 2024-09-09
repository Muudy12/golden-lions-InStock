import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

class Api {
  constructor() {
    this.baseUrl = baseUrl;
  }

  async getAllWarehouses(queryString) {
    try {
      const qs = queryString? queryString:"";
      const response = await axios.get(`${this.baseUrl}/warehouses${qs}`);
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

  async getAllInventories(queryString) {
    try {
      const qs = queryString? queryString:"";
      const response = await axios.get(`${baseUrl}/inventories${qs}`);
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

  async editOneItem() {
    try {
      const response = await axios.put(`${baseUrl}/inventories/:id`);
      return response.data;
    } catch (err) {
      console.log(`Failed to get an item.`);
    }
  }



  async getInventoryItemDetails( inventoryId) {
    try {
      const response = await axios.get(`${baseUrl}/inventories/${inventoryId}`);
      return response.data;
    } catch (err) {
      console.log(`Failed to get inventory item with id: ${inventoryId}.`);
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

  async getInventoryCategories() {
    try{
      const response = await axios.get(`${baseUrl}/inventories`);;
      const categoryList = response.data.map(category => category.category);
      const uniqueCategories = categoryList.filter((value, index, self) => self.indexOf(value) === index);
      return uniqueCategories;
    } catch (err){
      console.log('Error getting categories')
    }
  }

  async editInventory ( inventoryId, inventoryItemData) {
    try{
      const response = await axios.put(`${baseUrl}/inventories/${inventoryId}`, inventoryItemData);
      return response.data;
    } catch (err){
      console.log('Error getting categories')
    }
  }
  async updateWarehouse(warehouseId, warehouseData) {
  try {
    const response = await axios.put(`${baseUrl}/warehouses/${warehouseId}`, warehouseData);
    return response.data;
  } catch (err) {
    console.log(`Failed to update warehouse with id: ${warehouseId}`, err);
  }
}

async addWarehouse(warehouseData) {
  try {
    const response = await axios.post(`${baseUrl}/warehouses`, warehouseData);
    return response.data;
  } catch (err) {
    console.log("Failed to add the new warehouse", err);
  }
}
}


export { Api, baseUrl };
