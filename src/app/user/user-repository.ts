import { BASE_URL, USER_ID, USERS_PATH } from "../constants";

import { User } from "./user";

class UserRepository {
  static async get(): Promise<User> {
    try {
      const response = await fetch(`${BASE_URL}/${USERS_PATH}/${USER_ID}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.status == 204) {
        return Promise.reject("No user found");
      }

      return await response.json();
    } catch (error: any) {
      console.log("ERROR");
      console.log(error.message);
      return Promise.reject(error.message);
    }
  }
}

export { UserRepository };
