import { defineStore } from "pinia";

const initialState = {
  loggedIn: false,
  id: "",
  userName: "",
  firstName: "",
  lastName: "",
};

export const useUserStore = defineStore({
  id: "user",
  state: () => initialState,
  getters: {
    getLoggedInStatus: (state) => state.loggedIn,
    getId: (state) => state.id,
    getUserName: (state) => state.loggedIn,
    getFirstName: (state) => state.firstName,
    getLastName: (state) => state.lastName,
  },
  actions: {
    login({ id, userName, firstName, lastName }: typeof initialState) {
      this.loggedIn = true;
      this.id = id;
      this.userName = userName;
      this.firstName = firstName;
      this.lastName = lastName;
    },
  },
});
