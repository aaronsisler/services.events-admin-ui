import { BASE_URL, CLIENTS_PATH } from "../constants";
import { Client } from "./client";

class ClientRepository {
  static async create(name: string): Promise<Client> {
    try {
      const response = await fetch(`${BASE_URL}/${CLIENTS_PATH}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify([{ name }]),
      });

      const clients: Client[] = await response.json();

      return clients[0];
    } catch (error: any) {
      console.log("ERROR");
      console.log(error.message);
      return Promise.reject(error.message);
    }
  }

  static async get(clientId: string): Promise<Client> {
    try {
      const response = await fetch(`${BASE_URL}/${CLIENTS_PATH}/${clientId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      return await response.json();
    } catch (error: any) {
      console.log("ERROR");
      console.log(error.message);
      return Promise.reject(error.message);
    }
  }

  static async getAll(): Promise<Client[]> {
    try {
      const response = await fetch(`${BASE_URL}/${CLIENTS_PATH}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.status == 204) {
        return [];
      }

      return await response.json();
    } catch (error: any) {
      console.log("ERROR");
      console.log(error.message);
      return Promise.reject(error.message);
    }
  }
}

export { ClientRepository };
