import { BASE_URL, CLIENTS_PATH, LOCATIONS_PATH } from "../constants";

import { Location } from "./location";

class LocationRepository {
  static async create({ clientId, name }: Location): Promise<Location> {
    try {
      const response = await fetch(
        `${BASE_URL}/${CLIENTS_PATH}/${clientId}/${LOCATIONS_PATH}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify([{ clientId, name }]),
        }
      );

      const locations: Location[] = await response.json();

      return locations[0];
    } catch (error: any) {
      console.log("ERROR");
      console.log(error.message);
      return Promise.reject(error.message);
    }
  }

  static async getAll(clientId: string): Promise<Location[]> {
    try {
      const response = await fetch(
        `${BASE_URL}/${CLIENTS_PATH}/${clientId}/${LOCATIONS_PATH}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

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

export { LocationRepository };
