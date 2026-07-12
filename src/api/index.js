<<<<<<< HEAD
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
=======
export { default as apiClient } from './client';
export { default as authApi } from './endpoints/auth';
export { default as githubApi } from './endpoints/github';
export { default as projectsApi } from './endpoints/projects';
export { default as scansApi } from './endpoints/scans';
export { default as overviewApi } from './endpoints/overview';
export { default as filesApi } from './endpoints/files';
export { default as usersApi } from './endpoints/users';
>>>>>>> 56b665b1edd597772241faf38565098c2bb85e59
