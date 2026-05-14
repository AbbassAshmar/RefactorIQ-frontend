import apiClient from "./client";
import authApi from "./endpoints/auth";
import githubApi from "./endpoints/github";
import projectsApi from "./endpoints/projects";
import usersApi from "./endpoints/users";

export { apiClient, authApi, githubApi, projectsApi, usersApi };

const api = {
  client: apiClient,
  auth: authApi,
  github: githubApi,
  projects: projectsApi,
  users: usersApi,
};

export default api;
