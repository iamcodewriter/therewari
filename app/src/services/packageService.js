import http from "./httpService";
import { apiUrl } from "../config.json";
const apiEndpoint = apiUrl + "/packages";
export function getPackages() {
  return http.get(apiEndpoint);
}
export function getPackage(packageId) {
  return http.get(apiEndpoint + "/" + packageId);
}
export function deletePackage(packageId) {
  return http.delete(apiEndpoint + "/" + packageId);
}
export function savePackage(plan) {
  if (plan._id) {
    const body = { ...plan };
    delete body._id;
    return http.put(apiEndpoint + "/" + plan._id, body);
  }
  return http.post(apiEndpoint, plan);
}
