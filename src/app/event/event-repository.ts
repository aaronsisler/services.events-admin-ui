import { BASE_URL, CLIENTS_PATH, EVENTS_PATH } from "../constants";
import { Event } from "./event";

class EventRepository {
  static async create({ clientId, ...event }: Event): Promise<Event> {
    try {
      const response = await fetch(
        `${BASE_URL}/${CLIENTS_PATH}/${clientId}/${EVENTS_PATH}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify([{ ...event }]),
        }
      );

      const events: Event[] = await response.json();

      return events[0];
    } catch (error: any) {
      console.log("ERROR");
      console.log(error.message);
      return Promise.reject(error.message);
    }
  }

  static async getAll(clientId: string): Promise<Event[]> {
    try {
      const response = await fetch(
        `${BASE_URL}/${CLIENTS_PATH}/${clientId}/${EVENTS_PATH}`,
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

export { EventRepository };
