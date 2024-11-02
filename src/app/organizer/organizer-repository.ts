import { BASE_URL, CLIENTS_PATH, ORGANIZERS_PATH } from "../constants";

import { Organizer } from "./organizer";

class OrganizerRepository {
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
