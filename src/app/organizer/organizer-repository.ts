import { BASE_URL, CLIENTS_PATH, ORGANIZERS_PATH } from "../constants";

import { Organizer } from "./organizer";

class OrganizerRepository {
  static async create({ clientId, name }: Organizer): Promise<Organizer> {
    try {
      const response = await fetch(
        `${BASE_URL}/${CLIENTS_PATH}/${clientId}/${ORGANIZERS_PATH}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify([{ clientId, name }]),
        }
      );

      const organizers: Organizer[] = await response.json();

      return organizers[0];
    } catch (error: any) {
      console.log("ERROR");
      console.log(error.message);
      return Promise.reject(error.message);
    }
  }

  static async getAll(clientId: string): Promise<Organizer[]> {
    try {
      const response = await fetch(
        `${BASE_URL}/${CLIENTS_PATH}/${clientId}/${ORGANIZERS_PATH}`,
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

export { OrganizerRepository };
