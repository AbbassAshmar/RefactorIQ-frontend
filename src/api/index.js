import apiClient from "./client";
import authApi from "./endpoints/auth";
import usersApi from "./endpoints/users";

export { apiClient, authApi, usersApi };

const api = {
  client: apiClient,
  auth: authApi,
  users: usersApi,
};

export default api;
