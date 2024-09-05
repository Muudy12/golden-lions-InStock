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
}

export { Api, baseUrl };
