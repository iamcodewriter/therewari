import http from "./httpService";
import { apiUrl } from "../config.json";
const apiEndpoint = apiUrl + "/users";

export function register(user) {
  return http.post(apiEndpoint, {
    username: user.username,
    password: user.password,
    email: user.email,
    name: user.name,
    isAdmin: user.isAdmin
  });
}

export function getUsers() {
  return http.get(apiEndpoint);
}
